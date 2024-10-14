import { Box, Typography } from '@mui/material';
import { CShowEngineerInfoProps, styledEngBoxDetail } from '../ts/BEditScheduleDef';

//선택한 기사의 상세 정보를 가져와 보여주는 컴포넌트
const CShowEngineerInfo = ({ engineer }: CShowEngineerInfoProps) => {
  if (!engineer) {
    return <div></div>;
  }
  const engineerDetails = [
    { label: '이름', value: engineer.engineerName },
    { label: '연락처', value: engineer.engineerContact },
    { label: '주소', value: engineer.engineerAddress },
    { label: '가능 작업', value: engineer.engineerAbleItem },
    { label: '경력', value: engineer.engineerSignificant },
  ];
  return (
    <Box sx={{ ...styledEngBoxDetail }}>
      {engineerDetails.map((detail, index) => (
        <Typography key={index} variant="subtitle1" component="span">
          {detail.label}: {detail.value}
        </Typography>
      ))}
    </Box>
  );
};

export default CShowEngineerInfo;
