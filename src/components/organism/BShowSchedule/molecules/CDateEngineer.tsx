import { Box } from '@mui/material';
import 'dayjs/locale/ko';
import { engineerInfo, StyledScheduleTimeline } from '../ts/BEditScheduleDef';

type CDateEngineerProps = {
  selectDate: string;
  selectDay: string;
  engineer?: engineerInfo[];
  onEngineerClick: (engineer: engineerInfo) => void;
};

//선택한 날짜에 가능한 기사를 보여주는 컴포넌트
const CDateEngineer = ({
  selectDate,
  selectDay,
  engineer,
  onEngineerClick,
}: CDateEngineerProps) => {
  console.log('기사 정보', selectDate, selectDay, engineer);
  if (!engineer) {
    return <div></div>;
  }

  //선택한 요일이 일하는 날인 기사 필터링
  const filterWorkDay = (engineer: engineerInfo) => {
    engineer.engineerWorkDay
      ?.split(',')
      .filter((v) => v === selectDay)
      .join();
  };

  //선택한 날이 비정기휴무가 아닌 기사 필터링
  const filterEngineer = engineer.filter(
    (engineer) => engineer.engineerClosedDate !== selectDate && filterWorkDay
  );

  return (
    <Box sx={{ width: '100%', ...StyledScheduleTimeline }}>
      {filterEngineer.map((order) => (
        <Box key={order.engineerName} onClick={() => onEngineerClick(order)}>
          {order.engineerName}
        </Box>
      ))}
    </Box>
  );
};

export default CDateEngineer;
