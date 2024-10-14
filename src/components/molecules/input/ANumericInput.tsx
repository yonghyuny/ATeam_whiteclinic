'use client';

import * as React from 'react';
import { FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { AVariableInputProps } from '@/components/atom/Input/VariableInput/AVariableInput';

export type ANumericInputProps = {
  avariableinputprops?: Omit<AVariableInputProps, 'type' | 'value' | 'onValueChange'> & {
    value?: string;
    onValueChange?: (value: string) => void;
    isInvisible?: boolean;
    disabled?: boolean;
  };
  type?: 'number';
  min?: number;
  max?: number;
};

const ANumericInput = ({
  avariableinputprops,
  type = 'number',
  min = 0,
  max,
}: ANumericInputProps) => {
  const [isDisabled, setIsDisabled] = React.useState(avariableinputprops?.disabled || false);
  const [inputWidth, setInputWidth] = React.useState('32px');
  const value = avariableinputprops?.value || '';

  React.useEffect(() => {
    const calculateWidth = () => {
      const padding = 1;
      const scrollWidth = String(value).length * 20;
      const newWidth = Math.max(32, scrollWidth + padding);
      setInputWidth(`${newWidth}px`);
    };

    calculateWidth();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.replace(/^0+/, '');
    }

    if (newValue === '') {
      if (avariableinputprops?.onValueChange) {
        avariableinputprops.onValueChange('0');
      }
      return;
    }

    const numericValue = Number(newValue);
    if (
      !isNaN(numericValue) &&
      (min === undefined || numericValue >= min) &&
      (max === undefined || numericValue <= max)
    ) {
      if (avariableinputprops?.onValueChange) {
        avariableinputprops.onValueChange(numericValue.toString());
      }
    }
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <FormControl sx={{ m: 1, width: inputWidth }} variant="outlined" size="small">
      <OutlinedInput
        type={type}
        value={value}
        sx={{ minWidth: '150px' }}
        onChange={handleChange}
        placeholder=""
        disabled={isDisabled || avariableinputprops?.disabled}
        inputProps={{
          min,
          max,
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle modify text" edge="end" onClick={toggleDisabled}>
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ANumericInput;
