'use client';

import * as React from 'react';
import { User, Phone, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/styles/colors';

interface ACardProps {
  name: string;
  tel: string;
  address: string;
  available?: string;
  remark?: string;
  onClick: () => void;
}

// 공통 스타일 정의
const styles = {
  icon: 'h-4 w-4 text-gray-600 group-hover:text-[var(--hover-color)] transition-colors',
  container: 'flex items-center gap-3 ml-2.5',
  text: 'text-sm',
};

const ACard: React.FC<ACardProps> = ({ name, tel, address, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="w-[300px] bg-white rounded-lg hover:bg-[var(--hover-bg)] group hover:text-[var(--hover-color)] hover:cursor-pointer transition-colors"
      style={
        {
          '--hover-bg': colors.background.drawer,
          '--hover-color': colors.text.title,
        } as React.CSSProperties
      }
    >
      <CardContent className="p-4 flex flex-col gap-1">
        <div className={styles.container}>
          <User className={styles.icon} />
          <span className={styles.text}>이름: </span>
          <span className={styles.text}>{name}</span>
        </div>

        <div className={styles.container}>
          <Phone className={styles.icon} />
          <span className={styles.text}>번호: </span>
          <span className={styles.text}>{tel}</span>
        </div>

        <div className={styles.container}>
          <Home className={styles.icon} />
          <span className={styles.text}>주소: </span>
          <span className={styles.text}>{address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ACard;
