import { getRandomInteger } from '@/shared/functions';
import { Box, BoxProps } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import classes from './SpinWheel.module.scss';

const getRandomDegreeByIndex = (index: number, dataLength: number) => {
  // mutliple the dataSize bcos first half and last half will be index 0
  const _pieDegree = 360 / dataLength;
  const _firstPieLineDegree = _pieDegree / 2;
  const _minGapWithPieLine = 5;

  const _minDegree = index * _pieDegree + _minGapWithPieLine;
  const _maxDegree = (index + 1) * _pieDegree - _minGapWithPieLine;

  const _randomDegree = getRandomInteger(_minDegree, _maxDegree);

  // reverse the degree bcos when the wheel rotate clockwise, the items at behind will come first
  const _reversedRandomDegree = 360 - _randomDegree;

  // minus 360 if the degree is more than 360
  const _reversedRandomDegreeWithFirstPieLineDegree =
    (_reversedRandomDegree + _firstPieLineDegree) % 360;

  return _reversedRandomDegreeWithFirstPieLineDegree;
};

export type SpinWheelProps = PropsWithChildren<{
  diameter?: number;
  spinSeconds?: number;
  totalSpinsPerRound?: number;
  onSpin?: () => void;
  onFinished?: (currentRound: number) => void;
  winIndex?: number;
  spinButtonProps: BoxProps<'button'>;
}>;

const SpinWheel = ({
  diameter = 500,
  spinSeconds = 10,
  totalSpinsPerRound = 10,
  children,
  onSpin,
  onFinished,
  winIndex = 0,
  spinButtonProps
}: SpinWheelProps) => {
  const dataLength = React.Children.toArray(children).length;
  const radius = diameter / 2;
  const pieDegree = 360 / dataLength;
  // tan 𝜃 = opposite / adjacent
  const angle = pieDegree / 2;
  const radian = (angle * Math.PI) / 180;
  const opposite = Math.tan(radian) * radius;
  const width = opposite * 2;

  const [roundCount, setRoundCount] = useState(0);

  const rotateDegree = useMemo(
    () =>
      roundCount &&
      totalSpinsPerRound * 360 * roundCount +
        getRandomDegreeByIndex(winIndex, dataLength),
    [roundCount, totalSpinsPerRound, winIndex, dataLength]
  );

  const wheelContainerSx: SxProps = useMemo(() => {
    let newSxProps: SxProps = {
      transitionDuration: `${spinSeconds}s`,
      [`> div`]: {
        width: `${width}px`,
        marginLeft: `${-(width / 2)}px`
      }
    };
    Array.from(new Array(dataLength)).forEach((_, i) => {
      if (i === 0) {
        newSxProps = {
          ...newSxProps,
          [`& > div:nth-of-type(${i + 1})`]: {
            marginLeft: 0
          }
        };
      } else {
        newSxProps = {
          ...newSxProps,
          [`& > div:nth-of-type(${i + 1})`]: {
            transform: `rotate(${(360 / dataLength) * i}deg)`
          }
        };
      }
    });
    return newSxProps;
  }, [dataLength, spinSeconds, width]);

  const _onSpin = () => {
    onSpin?.();
    setRoundCount((prev) => prev + 1);
  };

  // call onFinished after the spin animation
  useEffect(() => {
    let spinEndTimeout: NodeJS.Timeout;
    if (rotateDegree && onFinished) {
      spinEndTimeout = setTimeout(() => {
        onFinished(roundCount);
      }, spinSeconds * 1000);
    }
    return () => {
      spinEndTimeout && clearTimeout(spinEndTimeout);
    };
  }, [rotateDegree, spinSeconds]);

  return (
    <Box
      sx={{
        width: diameter,
        height: diameter,
        position: 'relative',
        margin: 'auto'
      }}
    >
      <Box
        className={classes.wheel_container}
        sx={wheelContainerSx}
        style={{
          transform: `rotate(${rotateDegree}deg)`
        }}
      >
        {children}
      </Box>
      <Box
        component="button"
        className={classes.spin_button}
        sx={{
          bgcolor: 'common.white',
          '&:after': {
            bgcolor: 'common.white'
          }
        }}
        onClick={_onSpin}
        {...spinButtonProps}
      >
        Spin
      </Box>
    </Box>
  );
};

export default SpinWheel;
