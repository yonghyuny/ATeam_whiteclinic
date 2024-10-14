import * as React from 'react';
import { Box, Modal } from '@mui/material';
import { ModalMuiStyle } from '@/styles/mui';
import ModalTwoInputBox, {
  ModalTwoInputBoxProps,
} from '@/components/molecules/Modal/ModalTwoInputBox';

export type ARegisterModalProp = {
  open: boolean;
  handleClose: () => void;
  modaltwoinputboxprops: ModalTwoInputBoxProps;
};

const ARegisterModal = ({ open, handleClose, modaltwoinputboxprops }: ARegisterModalProp) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalMuiStyle }}>
        <ModalTwoInputBox {...modaltwoinputboxprops} />
      </Box>
    </Modal>
  );
};

export default ARegisterModal;
