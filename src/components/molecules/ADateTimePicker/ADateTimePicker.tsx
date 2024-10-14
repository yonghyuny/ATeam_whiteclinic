'use client';

import * as React from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { Box } from '@mui/material';

export type ADateTimePickerProps = {
  dateLabel?: string;
  timeLabel?: string;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  dateFormat?: string;
  timeFormat?: string;
  size?: 'small' | 'medium';
};

const ADateTimePicker = ({
  dateLabel = '날짜',
  timeLabel = '시간',
  value,
  onChange,
  dateFormat = 'YYYY년 MM월 DD일',
  timeFormat = 'HH:mm',
  size = 'small',
}: ADateTimePickerProps) => {
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate && onChange) {
      const newDateTime = value
        ? value
            .set('year', newDate.year())
            .set('month', newDate.month())
            .set('date', newDate.date())
        : newDate;
      onChange(newDateTime);
    }
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    if (newTime && onChange) {
      const newDateTime = value
        ? value.set('hour', newTime.hour()).set('minute', newTime.minute())
        : newTime;
      onChange(newDateTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box display="flex" gap={2}>
        <DatePicker
          label={dateLabel}
          value={value}
          onChange={handleDateChange}
          format={dateFormat}
          slotProps={{
            textField: {
              size: size,
            },
          }}
        />
        <TimePicker
          label={timeLabel}
          value={value}
          onChange={handleTimeChange}
          format={timeFormat}
          slotProps={{
            textField: {
              size: size,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ADateTimePicker;
