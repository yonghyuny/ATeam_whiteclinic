import { Box, Modal } from '@mui/material';
import ModalContent, { ModalContentProps } from './ModalContent';
import ModalTwoButtons from '../Button/ModalTwoButton';

export type SalesModalProps = {
  open: boolean;
  handleClose: () => void;
  modalcontentprops: ModalContentProps;
};

const SalesModal = ({ open, handleClose, modalcontentprops }: SalesModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '5px',
        }}
      >
        <ModalContent {...modalcontentprops} />
        <ModalTwoButtons
          leftButton={{ text: '취소', size: 'full' }}
          rightButton={{ text: '등록', color: 'primary', size: 'full' }}
        />
      </Box>
    </Modal>
  );
};

export default SalesModal;
