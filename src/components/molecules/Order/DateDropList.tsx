import AFixedInput from '@/components/atom/Input/FixedInput/AFixedInput';
import { Box } from '@mui/material';
import AMonthSelector from '../Select/delete/AMonthSelector';
import ADatesSelector from '../Select/delete/ADateSelector';

const DateDropList = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 57,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderBottom: '1px solid #7F7F7F',
      }}
    >
      <AFixedInput placeholder="년(4자)" width={140} />
      <AMonthSelector />
      <ADatesSelector />
    </Box>
  );
};

export default DateDropList;
