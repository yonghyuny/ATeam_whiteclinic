'use client';

import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, SelectChangeEvent } from '@mui/material';
import ADropdown from '@/components/atom/DropdownBox/ADropdown';
import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import { Days } from '@/constants/Days';

export type HolidayProps = {
  selectedDays: string[];
  onDaysChange: (newDays: string[]) => void;
};

const Holiday: React.FC<HolidayProps> = ({ selectedDays, onDaysChange }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');

  const DayOptions = Days.map((day) => ({ text: day, value: day }));

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    setSelectedDay(event.target.value as string);
  };

  const handleRegister: AButtonProps['onClick'] = () => {
    if (selectedDay) {
      const isDuplicate = selectedDays.includes(selectedDay);
      if (isDuplicate) {
        alert('이미 등록된 요일입니다.');
        return;
      }

      const newDays = [...selectedDays, selectedDay];
      // Days 배열의 순서대로 정렬
      newDays.sort((a, b) => Days.indexOf(a) - Days.indexOf(b));
      onDaysChange(newDays);
      setSelectedDay('');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ADropdown
          label="요일"
          value={selectedDay}
          onChange={handleDayChange}
          options={DayOptions}
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

      <Box sx={{ maxHeight: 100, overflow: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <List dense>
          {selectedDays.map((day, index) => (
            <ListItem key={index}>
              <ListItemText primary={day} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Holiday;
