'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// shadcn/ui 컴포넌트 import
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';

// 커스텀 컴포넌트들은 그대로 import (shadcn/ui로 대체할 수 없는 것들)
import LabelCheckBox, { LabelCheckBoxProps } from '@/components/molecules/Engineer/LabelCheckBox';
import ShadcnDropdown, { ShadcnDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import AButton, { AButtonProps } from '@/components/atom/Button/ShaButton';

import HolidayRegistration, {
  HolidayRegistrationProps,
} from '@/components/molecules/Engineer/ShaHolidayRegistration';
import Holiday, { HolidayProps } from '@/components/molecules/Engineer/ShaHoliday';
import ShaPayment from '@/components/molecules/Engineer/ShaPaymentDay';

// 타입 정의는 기존과 유사하게 유지
export type FormFieldType =
  | 'AButton'
  | 'Calendar'
  | 'Select'
  | 'Input'
  | 'LabelCheckBox'
  | 'HolidayRegistration'
  | 'Holiday'
  | 'ShaPayment';
export type FormFieldConfigProps = {
  formfieldtype: FormFieldType;
  prevprops?:
    | AButtonProps
    | ShadcnDropdownProps
    | LabelCheckBoxProps
    | HolidayProps
    | HolidayRegistrationProps;
};

export type FormFieldProps = {
  fields: FormFieldConfigProps[];
};

// 컴포넌트 매핑
const fieldTypeToComponentMap: Record<FormFieldType, React.ElementType> = {
  AButton,
  Calendar,
  Select,
  Input,
  ShaPayment,
  LabelCheckBox,
  Holiday,
  HolidayRegistration,
};

const ShaFormField = ({ fields }: FormFieldProps) => {
  return (
    <div className={cn('flex items-center gap-2')}>
      {fields.map((field, index) => {
        const Component = fieldTypeToComponentMap[field.formfieldtype];

        return Component ? <Component key={index} {...field.prevprops} /> : null;
      })}
    </div>
  );
};

export default ShaFormField;
