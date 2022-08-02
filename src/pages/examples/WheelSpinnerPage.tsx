import SpinWheel from '@/components/ui/spin-wheel/SpinWheel';
import AppContainer from '@/layout/AppContainer';
import { getRandomInteger } from '@/shared/functions';
import { styles } from '@/styles/styles';
import { Person } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { Reducer, useReducer, useState } from 'react';

const bgColor = ['#ff1d1d', '#ffeaca'];
const dataLength = 12;

type SpinState = {
  disabled: boolean;
  winIndex: number;
};

const initialSpinState = {
  disabled: false,
  winIndex: 0
};

const spinReducer: Reducer<
  SpinState,
  {
    type: 'spin' | 'spinStop';
    payload?: {
      winIndex?: number;
    };
  }
> = (state, action) => {
  switch (action.type) {
    case 'spin': {
      return {
        ...state,
        winIndex: action.payload?.winIndex || 0,
        disabled: true
      };
    }
    case 'spinStop': {
      return {
        ...state,
        disabled: false
      };
    }
    default:
      return state;
  }
};

const WheelSpinnerPage = () => {
  const [spinState, dispatch] = useReducer(spinReducer, initialSpinState);
  const [data, setData] = useState(Array.from(new Array(dataLength)));
  const [selected, setSelected] = useState<number[]>([]);

  const onSpin = () => {
    const randomIndex = getRandomInteger(0, dataLength - 1);
    console.log(randomIndex);
    dispatch({
      type: 'spin',
      payload: {
        winIndex: randomIndex
      }
    });
  };

  const onFinished = (round: number) => {
    setSelected((prev) => [...prev, spinState.winIndex]);
    if (round < 3) {
      // enable button after spin
      dispatch({
        type: 'spinStop'
      });
    }
  };

  return (
    <AppContainer>
      <SpinWheel
        onSpin={onSpin}
        onFinished={onFinished}
        winIndex={spinState.winIndex}
        spinButtonProps={{
          disabled: spinState.disabled
        }}
      >
        {data.map((_, i) => (
          <Box key={i} sx={{ bgcolor: 'white' }}>
            <Box
              sx={{
                bgcolor: selected.includes(i)
                  ? 'grey.500'
                  : bgColor[i % bgColor.length],
                color: (theme) =>
                  theme.palette.getContrastText(bgColor[i % bgColor.length]),
                clipPath: 'polygon(98% 0, 50% 100%, 2% 0)',
                width: 1,
                height: 1
              }}
            >
              <Box
                sx={{
                  transform: 'rotate(180deg)',
                  writingMode: 'vertical-rl',
                  pt: 15,
                  pb: 4,
                  width: 1,
                  height: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  gap: 2
                }}
              >
                <Typography variant="body1" sx={{ ...styles.text.truncate }}>
                  Member {i + 1}
                </Typography>
                <Person
                  sx={{
                    transform: 'rotate(180deg)',
                    fontSize: 48
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </SpinWheel>
    </AppContainer>
  );
};

export default WheelSpinnerPage;
