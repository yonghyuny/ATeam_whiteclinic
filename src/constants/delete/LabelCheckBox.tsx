'use client';

import React from 'react';
import { Box, Grid } from '@mui/material';
import { EngineerWashingMachineCategory } from '@/constants/Engineer';
import ACheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';
import { TextProps } from '@/components/atom/Text/AText';

export type LabelCheckBoxProps = {
  checkBoxProps?: Omit<CheckboxProps, 'isCheck' | 'onChange' | 'textprops'>;
  textProps: TextProps;
  selectedItems: string[];
  onItemsChange: (newItems: string[]) => void;
};

const LabelCheckBox: React.FC<LabelCheckBoxProps> = ({
  checkBoxProps,
  textProps,
  selectedItems,
  onItemsChange,
}) => {
  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = event.target.checked
      ? [...selectedItems, key]
      : selectedItems.filter((k) => k !== key);

    onItemsChange(newItems);

    if (newItems.length > 0) {
      console.log(`선택된 항목: ${newItems.join(', ')}`);
    } else {
      console.log('선택된 항목이 없습니다.');
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '80%', alignItems: 'center' }}>
      <Grid container spacing={0}>
        {EngineerWashingMachineCategory.map((v) => (
          <Grid item xs={2} key={v} padding={'5px'}>
            <ACheckbox
              isChecked={selectedItems.includes(v)}
              onChange={handleChange(v)}
              textprops={{ text: v, ...textProps }}
              {...checkBoxProps}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LabelCheckBox;
