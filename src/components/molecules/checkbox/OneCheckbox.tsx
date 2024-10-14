'use client';

import ACheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';
import { Box } from '@mui/material';
import React from 'react';

export type OneCheckboxProps = {
  checkboxes: { [key: string | number]: CheckboxProps };
  onChange: (selectedKey: string) => void; // 필수
  value: string; // 필수
};

const OneCheckbox = ({ checkboxes, onChange, value }: OneCheckboxProps) => {
  const handleCheckboxChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const checkboxText = checkboxes[key].textprops?.text || 'Unknown';
    const statusText = isChecked ? '체크됨' : '해제됨';

    console.log(`${checkboxText} ${statusText}`);

    onChange(isChecked ? key : '');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {Object.entries(checkboxes).map(([key, checkboxProps]) => (
        <ACheckbox
          key={key}
          isChecked={value === key}
          onChange={handleCheckboxChange(key)}
          textprops={checkboxProps.textprops}
        />
      ))}
    </Box>
  );
};

export default OneCheckbox;
