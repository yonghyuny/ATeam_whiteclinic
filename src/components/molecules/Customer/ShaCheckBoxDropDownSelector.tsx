'use client';

import React from 'react';
import { productCategories } from '@/constants/productCategory';
import ShaOneCheckbox, { ShaOneCheckboxProps } from '../checkbox/ShaOneCheckBox';
import ShaDropdown, { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import ShaTextarea from '@/components/atom/Input/ShaTextArea';

export type ShaCheckboxDropdownSelectorProps = {
  onecheckboxprops: ShaOneCheckboxProps;
  dropdownprops?: Omit<ShaDropdownProps, 'options'>;
  customInputValue?: string;
  onProductChange?: (value: string) => void;
};

const ShaCheckboxDropdownSelector = ({
  onecheckboxprops,
  dropdownprops,
  customInputValue,
  onProductChange,
}: ShaCheckboxDropdownSelectorProps) => {
  const { value: selectedCategory, onChange: handleCheckboxChange, checkboxes } = onecheckboxprops;

  const {
    value: selectedDropdownValue,
    onChange: handleDropdownChange,
    label,
  } = dropdownprops || {};

  // 카테고리에 따른 드롭다운 옵션 생성
  const categoryData = selectedCategory
    ? productCategories[selectedCategory as keyof typeof productCategories]
    : null;

  const dropdownOptions = categoryData
    ? categoryData.categories.map((product) => ({
        value: product.category,
        text: product.category,
      }))
    : [];

  // 추가 입력이 필요한 옵션인지 확인
  const needsCustomInput = selectedDropdownValue === '스탠드' || selectedDropdownValue === '투인원';

  return (
    <div className="flex items-center gap-4">
      <ShaOneCheckbox
        checkboxes={checkboxes}
        value={selectedCategory}
        onChange={handleCheckboxChange}
      />

      {selectedCategory && (
        <ShaDropdown
          key={selectedCategory}
          label={label}
          value={selectedDropdownValue}
          options={dropdownOptions}
          width="large"
          onChange={handleDropdownChange}
        />
      )}

      {needsCustomInput && (
        <ShaTextarea
          key={selectedDropdownValue}
          placeholder="세부 사항 입력"
          value={customInputValue}
          onChange={onProductChange}
          size="medium"
          rows={2}
          className="min-h-[60px]"
        />
      )}
    </div>
  );
};

export default ShaCheckboxDropdownSelector;
