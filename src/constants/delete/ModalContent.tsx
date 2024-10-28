import { Box } from '@mui/material';
import AText, { TextProps } from '@/components/atom/Text/AText';

export type ModalContentProps = {
  textprops?: TextProps;
};

const ModalContent = ({ textprops }: ModalContentProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: '30px',
          paddingX: '20px',
        }}
      >
        <AText {...textprops} />
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}></Box>
    </Box>
  );
};

export default ModalContent;
