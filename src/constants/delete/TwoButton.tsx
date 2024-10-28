import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import { Box } from '@mui/material';

type TwoButtonsProps = {
  leftButton: AButtonProps;
  rightButton: AButtonProps;
};

const TwoButtons = ({ leftButton, rightButton }: TwoButtonsProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AButton {...leftButton} />
      <AButton {...rightButton} />
    </Box>
  );
};

export default TwoButtons;
