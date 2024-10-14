import React, { useState } from 'react';
import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import { Box } from '@mui/material';
import SalesModal from './SalesModal';

type TwoButtonsProps = {
  leftButton: AButtonProps;
  rightButton: AButtonProps;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
};

const ModalButton = ({ leftButton, rightButton, onLeftButtonClick, onRightButtonClick }: TwoButtonsProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 취소 버튼 클릭 핸들러
  const handleLeftButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (leftButton.onClick) {
      leftButton.onClick(e);
    }
    if (onLeftButtonClick) {
      onLeftButtonClick();
    }
  };

  // 등록 버튼 클릭 핸들러
  const handleRightButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rightButton.onClick) {
      rightButton.onClick(e);
    }
    if (onRightButtonClick) {
      onRightButtonClick();
    }
    handleOpen();
  };

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
      <AButton {...leftButton} onClick={handleLeftButtonClick} />
      <AButton {...rightButton} onClick={handleRightButtonClick} />
      <SalesModal
        open={open}
        handleClose={handleClose}
        modalcontentprops={{
          textprops: {
            text: '세척품목을 추가 등록하시겠습니까?',
            size: 'large',
          },
        }}
      />
    </Box>
  );
};

export default ModalButton;
