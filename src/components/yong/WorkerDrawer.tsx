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
import { EngineerWithDetails, WorkerDrawerProps } from '@/constants/yh/EngineerTypeData';
import CardFilter from '../organism/yh/CardFilter';

const WorkerDrawer = ({
  engineers = [],
  onEngineerSelect,
  open,
  onOpenChange,
}: WorkerDrawerProps) => {
  const [filter, setFilter] = React.useState('');

  const filteredEngineers = React.useMemo(() => {
    return engineers
      .map(
        (engineer, index) =>
          [
            `engineer${index}`,
            {
              engineer_id: engineer.engineer_id,
              name: engineer.name,
              phone_number: engineer.phone_number,
              location: engineer.location,
              remark: engineer.remark,
              skills: engineer.skills,
              commission_rate: engineer.commission_rate,
            } as EngineerWithDetails,
          ] as [string, EngineerWithDetails]
      )
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

  const handleEngineerSelect = (engineerDetails: EngineerWithDetails) => {
    // EngineerWithDetails를 Engineer로 변환
    const selectedEngineer = engineers.find(
      (eng) => eng.engineer_id === engineerDetails.engineer_id
    );
    if (selectedEngineer) {
      onEngineerSelect(selectedEngineer);
    }
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
