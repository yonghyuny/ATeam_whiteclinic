import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import { Box } from '@mui/material';

type TwoButtonsProps = {
  leftButton: AButtonProps;
  rightButton: AButtonProps;
  onClose?: () => void;
  onAdd?: () => void;
};

const ModalTwoButtons = ({ leftButton, rightButton, onClose, onAdd }: TwoButtonsProps) => {
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
      <AButton {...leftButton} onClick={onClose} />
      <AButton {...rightButton} onClick={onAdd} />
    </Box>
  );
};

export default ModalTwoButtons;
