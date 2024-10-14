'use client';

import ADropdown from '@/components/atom/DropdownBox/ADropdown';
import { Days } from '@/constants/Days';
import { SelectChangeEvent } from '@mui/material';

type ADaySelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
};
const ADaySelector = ({ value, onChange }: ADaySelectorProps) => {
  const DayOptions = Days.map((day) => ({ text: day, value: day }));

  const handleChange = (event: SelectChangeEvent<string>) => {
    // onChange(event.target.value as string);
    if (onChange) {
      onChange(event.target.value as string); // onChange가 있을 때만 실행
    }
  };

  return <ADropdown label="요일" value={value} onChange={handleChange} options={DayOptions} />;
};

export default ADaySelector;
