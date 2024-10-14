import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';

type CTimePickerProps = {
  label: string;
  handleChange: (time: Dayjs | null) => void;
  value: Dayjs | null;
};
const CTimePicker = ({ label = '시간 선택', handleChange, value }: CTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label={label} onChange={handleChange} format="HH:mm" value={value} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CTimePicker;
