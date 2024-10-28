'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { AlignJustify } from 'lucide-react';
import CardFilter from '../organism/yh/CardFilter';

type Engineer = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  skills: string[];
  commission_rate: number;
  payday: string;
  is_paid: boolean;
  daily_earnings: Array<{
    date: string;
    daily_amount: number;
  }>;
};

type WorkerDrawerProps = {
  engineers: Engineer[]; // 객체 대신 배열로 변경
  onEngineerSelect: (engineer: Engineer) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const WorkerDrawer = ({
  engineers = [], // 기본값을 빈 배열로 설정
  onEngineerSelect,
  open,
  onOpenChange,
}: WorkerDrawerProps) => {
  const [filter, setFilter] = React.useState('');

  const filteredEngineers = React.useMemo(() => {
    return engineers
      .map((engineer, index) => [`engineer${index}`, engineer] as [string, Engineer])
      .filter(
        ([_, engineer]) =>
          engineer.name.toLowerCase().includes(filter.toLowerCase()) ||
          engineer.location.toLowerCase().includes(filter.toLowerCase()) ||
          engineer.phone_number.includes(filter)
      );
  }, [engineers, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleEngineerSelect = (engineer: Engineer) => {
    onEngineerSelect(engineer);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] h-full">
        <div className="m- w-full h-full flex flex-col items-center">
          <DrawerHeader>
            <div className="flex justify-end">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <DrawerTitle>기사 목록</DrawerTitle>
            <DrawerDescription>기사를 선택하여 일정을 확인하세요.</DrawerDescription>
          </DrawerHeader>

          <CardFilter
            data={filteredEngineers}
            filter={filter}
            onFilterChange={handleFilterChange}
            onItemClick={([_, engineer]) => handleEngineerSelect(engineer)}
          />

          <DrawerFooter>{/* 공란으로 둘것 */}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkerDrawer;
