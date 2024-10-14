'use client';

import React from 'react';
import { Box } from '@mui/material';
import ANumericInput, { ANumericInputProps } from '../input/ANumericInput';
import ACheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';

export type DiscountCheckboxProps = {
  checkboxprops?: CheckboxProps;
  anumericInputprops?: ANumericInputProps;
};

const DiscountCheckbox = ({ checkboxprops, anumericInputprops }: DiscountCheckboxProps) => {
  const { isChecked, onChange, textprops } = checkboxprops || {};

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <ACheckbox isChecked={isChecked} onChange={onChange} textprops={textprops} />
      <ANumericInput {...anumericInputprops} />
    </Box>
  );
};

export default DiscountCheckbox;
