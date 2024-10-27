'use client';

import { Button } from '@/components/ui/button';

export type ShaButtonProps = {
  variant?: 'default' | 'secondary' | 'outline';
  text:
    | '등록중지'
    | '취소'
    | '등록'
    | '수정'
    | '아니오'
    | '추가등록'
    | '급여사항확인'
    | '휴무등록'
    | '추가등록'
    | '전달';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'full';
  disabled?: boolean;
};

const ShaButton = ({ variant, text, onClick, size, disabled = false }: ShaButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} size={size} disabled={disabled}>
      {text}
    </Button>
  );
};

export default ShaButton;
