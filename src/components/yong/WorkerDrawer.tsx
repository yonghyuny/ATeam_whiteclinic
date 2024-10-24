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
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkerProps, WorkerType } from '@/constants/Workers';
import { AlignJustify } from 'lucide-react';

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
          {/* 기사님 목록 아이콘 */}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[400px] h-full left-[240px]">
        <div className="mx-auto w-full h-full flex flex-col">
          <DrawerHeader>
            <div className="flex justify-between items-start">
              <div>
                <DrawerTitle>기사님 선택</DrawerTitle>
                <DrawerDescription>
                  기사님을 선택하여 상세 정보를 확인하실 수 있습니다.
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="이름, 주소, 전화번호 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {filteredWorkers.map(([key, worker]) => (
                <Card
                  key={key}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleWorkerSelect(worker)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium">{worker.name}</div>
                      <div className="text-sm text-gray-500">
                        <div>전화: {worker.tel}</div>
                        <div>주소: {worker.address}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
