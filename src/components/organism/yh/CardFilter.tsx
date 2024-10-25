'use client';

import React from 'react';
import ShaInput from '@/components/atom/Input/ShaInput';
import ACard from '@/components/molecules/Card/ACard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkerProps } from '@/constants/Workers';

type FilterProps = {
  data: [string, WorkerProps][];
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (item: WorkerProps) => void;
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
      {' '}
      {/* min-h-0 추가 및 flex-1 추가 */}
      <div className="p-4 flex-shrink-0">
        {' '}
        {/* flex-shrink-0 추가 */}
        <ShaInput
          placeholder="이름, 주소 또는 전화번호로 검색"
          value={filter}
          onChange={handleInputChange}
          size="medium"
        />
      </div>
      <ScrollArea className="flex-1 min-h-0">
        {' '}
        {/* min-h-0 추가 */}
        <div className="flex flex-col space-y-4 px-4">
          {data.map(([key, worker]) => (
            <ACard
              key={key}
              name={worker.name}
              tel={worker.tel}
              address={worker.address}
              onClick={() => onItemClick(worker)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardFilter;
