import useDp from '@/hooks/useDp';
import { Add, Remove } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  IconButtonProps,
  InputBase,
  InputBaseProps,
  Paper,
  PaperProps
} from '@mui/material';
import React, { useImperativeHandle } from 'react';

export type AppNumberRangeInputProps = PaperProps & {
  value: string | number;
  onChange: (...args: any[]) => void;
  range?: number;
  onMinus: (x: string) => void;
  onAdd: (x: string) => void;
  min?: number;
  max?: number;
  canInput?: boolean;
  rangeArray?: number[];
  disabled?: boolean;
  InputBaseProps?: InputBaseProps;
  dp?: number;
  MinusButtonProps?: IconButtonProps;
  AddButtonProps?: IconButtonProps;
  divider?: boolean;
};

const AppNumberRangeInput = ({
  range = 1,
  canInput = true,
  divider = true,
  dp = 0,
  InputBaseProps,
  MinusButtonProps,
  AddButtonProps,
  value,
  onChange,
  onMinus,
  onAdd,
  min,
  max,
  rangeArray,
  disabled,
  ...props
}: AppNumberRangeInputProps) => {
  const inputRef = useDp(dp);

  // combine inputRef and the forwardRef
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    InputBaseProps?.inputRef || null,
    () => inputRef.current || null
  );

  // change value to number type
  const _value =
    typeof value === 'string' ? parseFloat(value) || 0 : value || 0;

  const handleMinus = () => {
    let newValue: number;
    if (rangeArray) {
      const selectedIndex = rangeArray.findIndex(
        (rangeValue) => rangeValue === _value
      );
      // if previous value is available
      if (selectedIndex - 1 >= 0) {
        newValue = rangeArray[selectedIndex - 1];
      } else {
        newValue = _value;
      }
    } else {
      newValue = _value - range;
    }

    onMinus((min !== undefined && min > newValue ? min : newValue).toString());
  };

  const handleAdd = () => {
    let newValue: number;
    if (rangeArray) {
      const selectedIndex = rangeArray.findIndex(
        (rangeValue) => rangeValue === _value
      );
      // if next value is available
      if (selectedIndex + 1 < rangeArray.length) {
        newValue = rangeArray[selectedIndex + 1];
      } else {
        newValue = _value;
      }
    } else {
      newValue = _value + range;
    }

    onAdd((max !== undefined && max < newValue ? max : newValue).toString());
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      {...props}
      sx={{ display: 'flex', ...props?.sx }}
    >
      <IconButton
        onClick={handleMinus}
        disabled={disabled}
        {...MinusButtonProps}
      >
        <Remove />
      </IconButton>
      {divider && <Divider orientation="vertical" flexItem />}
      <InputBase
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        readOnly={!canInput}
        {...InputBaseProps}
        sx={{
          px: 4,
          width: 100,
          ...InputBaseProps?.sx
        }}
        inputProps={{
          ...InputBaseProps?.inputProps,
          sx: {
            textAlign: 'center',
            ...InputBaseProps?.inputProps?.sx
          }
        }}
      />
      {divider && <Divider orientation="vertical" flexItem />}
      <IconButton onClick={handleAdd} disabled={disabled} {...AddButtonProps}>
        <Add />
      </IconButton>
    </Paper>
  );
};

export default AppNumberRangeInput;
