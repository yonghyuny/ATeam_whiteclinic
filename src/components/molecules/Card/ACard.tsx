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

const ACard: React.FC<ACardProps> = ({ name, tel, address, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="w-[300px] bg-white rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--hover-color)] hover:cursor-pointer transition-colors"
      style={
        {
          '--hover-bg': colors.background.drawer,
          '--hover-color': colors.text.title,
        } as React.CSSProperties
      }
    >
      <CardContent className="p-4 flex flex-col gap-1">
        <div className="flex items-center gap-3 ml-2.5">
          <User className="h-4 w-4 text-gray-600" />
          <span className="text-sm">이름: </span>
          <span className="text-sm">{name}</span>
        </div>

        <div className="flex items-center gap-3 ml-2.5">
          <Phone className="h-4 w-4 text-gray-600" />
          <span className="text-sm">번호: </span>
          <span className="text-sm">{tel}</span>
        </div>

        <div className="flex items-center gap-3 ml-2.5">
          <Home className="h-4 w-4 text-gray-600" />
          <span className="text-sm">주소: </span>
          <span className="text-sm">{address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ACard;
