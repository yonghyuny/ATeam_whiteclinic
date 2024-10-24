'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkerProps, WorkerType } from '@/constants/Workers';
import { AlignJustify } from 'lucide-react';
import ShaInput from '@/components/atom/Input/ShaInput';
import ACard from '../molecules/Card/ACard';

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
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredWorkers = React.useMemo(() => {
    return Object.entries(WorkerInfo).filter(
      ([_, worker]) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.tel.includes(searchTerm)
    );
  }, [WorkerInfo, searchTerm]);

  const handleWorkerSelect = (worker: WorkerProps) => {
    onWorkerSelect(worker);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[350px] h-full left-[250px]">
        <div className="mx-auto w-full h-full flex flex-col">
          <DrawerHeader>
            <div className="flex justify-between items-start">
              {/* <div> */}
              {/* <DrawerTitle>제목 필요할시 작성</DrawerTitle> */}
              {/* <DrawerDescription>혹시 설명 필요할시 작성</DrawerDescription> */}
              {/* </div> */}
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Search className="w-4 h-4 text-gray-400" />
              <ShaInput
                placeholder="이름, 주소, 전화번호 검색..."
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                className="flex-1"
                size="medium"
              />
            </div>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {filteredWorkers.map(([key, worker]) => (
                <ACard
                  key={key}
                  name={worker.name}
                  tel={worker.tel}
                  address={worker.address}
                  onClick={() => handleWorkerSelect(worker)}
                />
              ))}
            </div>
          </ScrollArea>

          <DrawerFooter>{/* 공란으로 둘것 */}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkerDrawer;
