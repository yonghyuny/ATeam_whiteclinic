'use client';

import { ButtonStyle } from '@/styles/ButtonStyle';
import { Button } from '@mui/material';

export type AButtonProps = {
  variant?: 'text' | 'contained' | 'outlined';
  text:
    | '등록중지'
    | '취소'
    | '등록'
    | '수정'
    | '아니오'
    | '추가등록'
    | '급여사항확인'
    | '휴무등록'
    | '추가등록';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: keyof typeof ButtonStyle.size;
  color?: keyof typeof ButtonStyle.color;
  sx?: object;
  disabled?: boolean;
};

const AButton = ({
  variant,
  text,
  onClick,
  color = 'default',
  size = 'medium',
  sx,
  disabled = false,
}: AButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        ...ButtonStyle.size[size],
        ...ButtonStyle.color[color],
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default AButton;
