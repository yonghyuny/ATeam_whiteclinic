'use client';

import React, { useState, useEffect } from 'react';
import { WorkerInfo, WorkerProps } from '@/constants/Workers';
import AFooter from '@/components/molecules/datagrid/AFooter';
import { getFooterData } from '@/constants/yh/WorkerFooterData';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import ACalendar from '@/components/atom/Calendar/ACalendar';
import styled from '@emotion/styled';

// 스타일드 컴포넌트 유지
const StyledCalendarContainer = styled.div`
  .rbc-calendar {
    max-width: 1400px !important;
    margin: 0 auto;
    height: 700px !important;
    width: 100% !important;
  }
  .rbc-event {
    background-color: #3174ad !important;
    padding: 4px !important;
    font-size: 0.9em !important;
  }
  .rbc-event-content {
    text-align: center;
  }
  .rbc-row-segment {
    padding: 2px 4px !important;
  }
  .rbc-toolbar {
    margin-bottom: 20px;
  }
  .rbc-toolbar button {
    color: #333;
  }
  .rbc-active {
    background-color: #3174ad !important;
    color: white !important;
  }
  .rbc-today {
    background-color: #f0f7ff;
  }
`;

const Page = () => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerProps | null>(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (selectedWorker) {
      const newEvents = selectedWorker.datePay.map((dp) => {
        const dateStr = dp.date;
        const month = parseInt(dateStr.match(/(\d+)월/)![1]) - 1;
        const day = parseInt(dateStr.match(/(\d+)일/)![1]);
        const date = new Date(2024, month, day);

        const pay = parseInt(dp.pay.replace('원', ''));

        return {
          title: `${pay.toLocaleString()}원`,
          start: date,
          end: date,
          allDay: true,
          pay: pay,
        };
      });
      setEvents(newEvents);
    }
  }, [selectedWorker]);

  const handleWorkerSelect = (worker: WorkerProps) => {
    setSelectedWorker(worker);
    setOpen(false);
  };

  const handleEventAdd = (event: any) => {
    console.log('New event:', event);
  };

  const handleEventSelect = (event: any) => {
    console.log('Selected event:', event);
  };

  return (
    <div className="p-3 h-screen w-full">
      <div className="mb-3">
        <WorkerDrawer
          WorkerInfo={WorkerInfo}
          onWorkerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>

      {selectedWorker && (
        <div className="w-full h-screen flex flex-col gap-5">
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            {selectedWorker.name}님의 근무 일정
          </h2>

          {/* Calendar Container */}
          <StyledCalendarContainer className="flex-grow min-h-[700px] mb-3">
            <ACalendar
              events={events}
              onEventAdd={handleEventAdd}
              onEventSelect={handleEventSelect}
            />
          </StyledCalendarContainer>

          {/* Footer Container */}
          <div className="w-full max-w-[1400px] mx-auto mt-auto">
            <AFooter data={getFooterData(selectedWorker)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
