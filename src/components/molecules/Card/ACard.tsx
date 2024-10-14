import { Box, CardContent } from '@mui/material';
import AText from '../../atom/Text/AText';
import { colors } from '@/styles/colors';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';

type ACardProps = {
  name: string;
  tel: string;
  address: string;
  available?: string;
  remark?: string;
  onClick: () => void;
};

const ACard = ({ name, tel, address, onClick }: ACardProps) => {
  return (
    <>
      <CardContent
        onClick={onClick}
        sx={{
          // border: '1px solid black',
          width: '300px',
          height: 'auto',
          backgroundColor: 'white',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          gap: 1,
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: colors.test.third,
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, ml: '10px' }}>
          <PersonIcon fontSize="small" sx={{ color: colors.text.primary }} />
          <AText text={'이름: '} color="third" />
          <AText text={name} color="fourth" />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, ml: '10px' }}>
          <PhoneAndroidIcon fontSize="small" sx={{ color: colors.text.primary }} />
          <AText text={'번호: '} color="second" />
          <AText text={tel} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, ml: '10px' }}>
          <HomeIcon fontSize="small" sx={{ color: colors.text.primary }} />
          <AText text={'주소: '} color="first" />
          <AText text={address} />
        </Box>
      </CardContent>
    </>
  );
};

export default ACard;
