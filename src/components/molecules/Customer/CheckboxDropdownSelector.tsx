'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import OneCheckbox, { OneCheckboxProps } from '../checkbox/OneCheckbox';
import ADropdown, { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { productCategories } from '@/constants/productCategory';
import AVariableInput from '@/components/atom/Input/VariableInput/AVariableInput';
import AFixedInput from '@/components/atom/Input/FixedInput/AFixedInput';

export type CheckboxDropdownSelectorProps = {
  onecheckboxprops: OneCheckboxProps;
  dropdownprops?: ADropdownProps;
  customInputValue?: string;
  onProductChange?: (value: string) => void;
};

const CheckboxDropdownSelector = ({
  onecheckboxprops,
  dropdownprops,
  customInputValue,
  onProductChange,
}: CheckboxDropdownSelectorProps) => {
  const { value: selectedCategory, onChange: handleCheckboxChange, checkboxes } = onecheckboxprops;
  const {
    value: selectedDropdownValue,
    onChange: handleDropdownChange,
    label,
  } = dropdownprops || {};

  const categoryData = selectedCategory
    ? productCategories[selectedCategory as keyof typeof productCategories]
    : null;

  const dropdownOptions: ADropdownProps['options'] = categoryData
    ? categoryData.categories.map((product) => ({
        value: product.category,
        text: product.category,
      }))
    : [];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <OneCheckbox
        checkboxes={checkboxes}
        value={selectedCategory}
        onChange={handleCheckboxChange}
      />

      <ADropdown
        key={selectedCategory}
        label={label}
        value={selectedDropdownValue}
        options={dropdownOptions}
        width="xlarge"
        onChange={handleDropdownChange}
      />

      {(selectedDropdownValue === '스탠드' || selectedDropdownValue === '투인원') && (
        <AFixedInput
          key={selectedDropdownValue}
          placeholder="세부 사항 입력"
          isInvisible={false}
          isMultiline={true}
          value={customInputValue || ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onProductChange) {
              onProductChange(event.target.value);
            }
          }}
        />
      )}
    </Box>
  );
};

export default CheckboxDropdownSelector;
