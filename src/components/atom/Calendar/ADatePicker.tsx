'use client';
import * as React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

export type ADatePickerProps = {
  label?: string;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  format?: string;
  size?: 'small' | 'medium';
};

const ADatePicker = ({
  label,
  value,
  onChange,
  format = 'YYYY년 MM월 DD일',
  size = 'small',
}: ADatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format={format}
        slotProps={{
          textField: {
            size: size,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default ADatePicker;
