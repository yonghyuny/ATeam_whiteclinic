import * as React from 'react';
import AFixedInput from '@/components/atom/Input/FixedInput/AFixedInput';
import { TimeSlot } from '@/constants/timeSlots';
import { Box } from '@mui/material';
import { sizes } from '@/styles/sizes';
import AText from '@/components/atom/Text/AText';

type DateInfoProps = {
  time?: TimeSlot;
  timeslotschedule?: string;
};

const DateInfo = ({ time, timeslotschedule }: DateInfoProps) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    console.log(inputValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: '140px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          py: 1,
          bgcolor: 'white',
          borderRadius: sizes.borderRadius.xs,
        }}
      >
        {time}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: sizes.borderRadius.xs,
        }}
      >
        {/* {timeslotschedule} */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* <AFixedInput value={inputValue} onChange={handleInputChange} sx={{ width: `100%` }} /> */}
          <AText text="입력" />
        </Box>
      </Box>
    </Box>
  );
};

export default DateInfo;
