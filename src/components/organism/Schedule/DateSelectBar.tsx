import { useState } from 'react';
import { MonthsPlan } from '@/constants/MonthsPlan';
import { formatDate, getMonthlyDates } from '@/util/dateUtil';
import { Box, SelectChangeEvent } from '@mui/material';
import ADropdown from '@/components/atom/DropdownBox/ADropdown';

type DateSelectBarProps = {
  onSelectDate: (date: Date) => void;
};

const DateSelectBar = ({ onSelectDate }: DateSelectBarProps) => {
  const [month, setMonth] = useState<string>('');

  const MonthsPlanOption = MonthsPlan.map((month) => ({ text: month, value: month }));

  // 선택된 월에 해당하는 날짜 배열을 생성
  const monthIndex = month ? parseInt(month) - 1 : null;
  const dates = monthIndex !== null ? getMonthlyDates(2024)[monthIndex] : [];

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonth(event.target.value);
  };

  const handleSelectDay = (day: Date) => {
    onSelectDate(day);
  };
  return (
    <Box
      className="scroll-container"
      sx={{
        width: '160px',
        height: '100%',
        borderRight: '1px solid #888888',
        bgcolor: '#3F4D67',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <ADropdown
        label=""
        options={MonthsPlanOption}
        width="medium"
        color="white"
        onChange={handleMonthChange}
      />
      {dates.map(({ day }) => (
        <Box
          key={day.toString()}
          sx={{
            width: '150px',
            height: '40px',
            border: '1px solid white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            ':hover': { cursor: 'pointer' },
          }}
          onClick={() => handleSelectDay(day)}
        >
          {formatDate(day)}
        </Box>
      ))}
    </Box>
  );
};

export default DateSelectBar;
