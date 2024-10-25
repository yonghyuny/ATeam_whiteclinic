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
import { WorkerProps, WorkerType } from '@/constants/Workers';
import { AlignJustify } from 'lucide-react';
import CardFilter from '../organism/yh/CardFilter';

interface WorkerDrawerProps {
  WorkerInfo: WorkerType;
  onWorkerSelect: (worker: WorkerProps) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkerDrawer: React.FC<WorkerDrawerProps> = ({
  WorkerInfo,
  onWorkerSelect,
  open,
  onOpenChange,
}) => {
  const [filter, setFilter] = React.useState('');

  const filteredWorkers = React.useMemo(() => {
    return Object.entries(WorkerInfo).filter(
      ([_, worker]) =>
        worker.name.toLowerCase().includes(filter.toLowerCase()) ||
        worker.address.toLowerCase().includes(filter.toLowerCase()) ||
        worker.tel.includes(filter)
    );
  }, [WorkerInfo, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleWorkerSelect = (worker: WorkerProps) => {
    onWorkerSelect(worker);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignJustify /> {/* 아이콘임 */}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] h-full">
        {/* 혹시 검색창 옮길시 left-[xxxpx로 설정하기] */}
        <div className="m- w-full h-full flex flex-col items-center">
          <DrawerHeader>
            <div className="flex justify-end">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div> 
           <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription> 
          </DrawerHeader>

          <CardFilter
            data={filteredWorkers}
            filter={filter}
            onFilterChange={handleFilterChange}
            onItemClick={handleWorkerSelect}
          />

          <DrawerFooter>{/* 공란으로 둘것 */}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkerDrawer;
