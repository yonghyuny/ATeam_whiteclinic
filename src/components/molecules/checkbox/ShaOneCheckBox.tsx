'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type CheckboxItemProps = {
  text?: string;
  // 다른 체크박스 관련 props를 여기에 추가할 수 있습니다
};

export type ShaOneCheckboxProps = {
  checkboxes: { [key: string]: CheckboxItemProps };
  onChange: (selectedKey: string) => void;
  value: string;
  className?: string;
};

const ShaOneCheckbox = ({ checkboxes, onChange, value, className }: ShaOneCheckboxProps) => {
  const handleCheckboxChange = (key: string) => {
    const isCurrentlySelected = value === key;
    const checkboxText = checkboxes[key].text || 'Unknown';
    const statusText = !isCurrentlySelected ? '체크됨' : '해제됨';

    console.log(`${checkboxText} ${statusText}`);

    // 현재 선택된 항목을 다시 클릭하면 선택 해제
    onChange(isCurrentlySelected ? '' : key);
  };

  return (
    <div className={cn('flex gap-4', className)}>
      {Object.entries(checkboxes).map(([key, checkboxProps]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            checked={value === key}
            onCheckedChange={() => handleCheckboxChange(key)}
          />
          {checkboxProps.text && (
            <Label
              htmlFor={key}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {checkboxProps.text}
            </Label>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShaOneCheckbox;
