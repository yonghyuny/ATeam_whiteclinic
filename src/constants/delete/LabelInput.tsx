'use client';

import React from 'react';
import { Box } from '@mui/material';
import AText, { TextProps } from '@/components/atom/Text/AText';
import AVariableInput, {
  AVariableInputProps,
} from '@/components/atom/Input/VariableInput/AVariableInput';

type LabelInputProps = {
  label: string;
  textProps?: Omit<TextProps, 'text'>;
  inputProps: AVariableInputProps;
};

const LabelInput = ({ label, textProps, inputProps }: LabelInputProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Box
        sx={{
          width: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#F2F2F2',
          borderRight: '1px solid #ccc',
          padding: '8px',
        }}
      >
        <AText text={label} {...textProps} />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
        }}
      >
        <AVariableInput {...inputProps} />
      </Box>
    </Box>
  );
};

export default LabelInput;
