'use client';

import React from 'react';
import ShaText from '@/components/atom/Text/ShaText';

export type FooterItem = {
  label: string;
  value: string | number | boolean;
  renderValue?: (value: string | number | boolean) => React.ReactNode;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
};

type AFooterProps = {
  data: FooterItem[];
  isEditing: boolean;
};

const AFooter = ({ data, isEditing }: AFooterProps) => {
  return (
    <div className="p-4 flex flex-col gap-3 bg-[#f5f5f5] rounded-lg shadow-md">
      <ShaText text="요약 정보" size="large" />
      <div className="border-b border-gray-200" />
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <ShaText text={`${item.label}:`} size="medium" color="primary" />
          {isEditing && item.isEditable ? (
            <input
              type="number"
              className="p-2 border rounded-md w-[200px]"
              value={String(item.value).replace(/[^0-9]/g, '')}
              onChange={(e) => item.onValueChange?.(e.target.value)}
            />
          ) : item.renderValue ? (
            <div className="flex items-center">{item.renderValue(item.value)}</div>
          ) : (
            <ShaText text={item.value} size="medium" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AFooter;
