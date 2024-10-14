import { Box } from '@mui/material';
import CTimePicker from './CTmePicker';
import { Dayjs } from 'dayjs';

export type CtimeSelectProps = {
  handleStart: (time: Dayjs | null) => void;
  handleEnd: (time: Dayjs | null) => void;
  startValue: Dayjs | null;
  endValue: Dayjs | null;
};

//시작 시간과 종료 시간을 사용자로부터 받아오는 컴포넌트

const CTimeSelect = ({ handleStart, handleEnd, startValue, endValue }: CtimeSelectProps) => {
  console.log('시작시간: ', startValue?.format('HH:mm'), '종료 시간: ', endValue?.format('HH:mm'));
  return (
    <Box>
      <CTimePicker label="시작 시간" handleChange={handleStart} value={startValue} />
      <CTimePicker label="종료 시간" handleChange={handleEnd} value={endValue} />
    </Box>
  );
};
export default CTimeSelect;
