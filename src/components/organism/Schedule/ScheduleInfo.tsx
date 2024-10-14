import { timeSlots } from '@/constants/timeSlots';
import { Box } from '@mui/material';
import DateInfo from '../../molecules/Schedule/DateInfo';
import { sizes } from '@/styles/sizes';

type ScheduleInfoProps = {
  selectedDate: Date | null;
  engineerName?: string;
};

const ScheduleInfo = ({ selectedDate, engineerName }: ScheduleInfoProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#1565C0',
          color: 'white',
          fontSize: sizes.fontSize.xlarge,
          fontWeight: 800,
          borderRadius: sizes.borderRadius.xs,
        }}
      >
        {engineerName} 기사
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {timeSlots.map((slot, index) => (
          <DateInfo key={index} time={slot} timeslotschedule={'일정 입력'} />
        ))}
      </Box>
    </Box>
  );
};

export default ScheduleInfo;
