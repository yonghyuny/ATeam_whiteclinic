'use client';

import React from 'react';
import ShaInput from '@/components/atom/Input/ShaInput';
import ACard from '@/components/molecules/Card/ACard';
import { ScrollArea } from '@/components/ui/scroll-area';

type Engineer = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark: string;
  skills: string[];
  commission_rate: number;
  payday: string;
  is_paid: boolean;
  daily_earnings: {
    date: string;
    daily_amount: number;
  }[];
};

type FilterProps = {
  data: [string, Engineer][];
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (item: [string, Engineer]) => void;
};

const CardFilter = ({ data, filter, onFilterChange, onItemClick }: FilterProps) => {
  const handleInputChange = (value: string) => {
    const simulatedEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>;

    onFilterChange(simulatedEvent);
  };

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="p-4 flex-shrink-0">
        <ShaInput
          placeholder="이름, 주소 또는 전화번호로 검색"
          value={filter}
          onChange={handleInputChange}
          size="medium"
        />
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col space-y-4 px-4">
          {data.map((entry) => (
            <ACard
              key={entry[0]}
              name={entry[1].name}
              tel={entry[1].phoneNumber}
              address={entry[1].location}
              onClick={() => onItemClick(entry)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardFilter;
