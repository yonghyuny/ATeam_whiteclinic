'use client';

import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ADatePicker, { ADatePickerProps } from '@/components/atom/Calendar/ADatePicker';
import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import { Box, List, ListItem, ListItemText } from '@mui/material';

export type HolidayRegistrationProps = {
  registeredHolidays: Dayjs[];
  onHolidaysChange: (newHolidays: Dayjs[]) => void;
};

const HolidayRegistration: React.FC<HolidayRegistrationProps> = ({
  registeredHolidays,
  onHolidaysChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange: ADatePickerProps['onChange'] = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleRegister: AButtonProps['onClick'] = () => {
    if (selectedDate) {
      const isDuplicate = registeredHolidays.some((date) => date.isSame(selectedDate, 'day'));
      if (isDuplicate) {
        alert('이미 등록된 날짜입니다.');
        return;
      }

      const newHolidays = [...registeredHolidays, selectedDate];
      newHolidays.sort((a, b) => a.valueOf() - b.valueOf());
      onHolidaysChange(newHolidays);
      setSelectedDate(null);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ADatePicker
          label="선택"
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY년 MM월 DD일"
          size="small"
        />
        <Box sx={{ mx: 2 }}>
          <AButton
            text="등록"
            onClick={handleRegister}
            color="primary"
            size="small"
            variant="contained"
          />
        </Box>
      </Box>

      <Box sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <List dense>
          {registeredHolidays.map((holiday, index) => (
            <ListItem key={index}>
              <ListItemText primary={holiday.format('YYYY년 MM월 DD일')} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HolidayRegistration;
