'use client';

import React from 'react';
import ShaText from '@/components/atom/Text/ShaText';
import { FooterProps } from '@/constants/yh/EngineerTypeData';
import ShaInput from '@/components/atom/Input/ShaInput';

const AFooter: React.FC<FooterProps> = ({ data, isEditing }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="text-gray-600">
            <ShaText text={item.label} size="medium" />
          </div>
          <div className="mt-1">
            {item.renderValue ? (
              item.renderValue(item.value)
            ) : isEditing && item.isEditable ? (
              <ShaInput value={item.value.toString()} onChange={item.onValueChange} size="medium" />
            ) : (
              <ShaText text={item.value.toString()} size="medium" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AFooter;
