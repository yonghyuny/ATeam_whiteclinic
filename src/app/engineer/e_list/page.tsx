'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WorkerInfo, WorkerProps } from '@/constants/Workers';

import AFooter from '@/components/molecules/datagrid/AFooter';
import { getFooterData } from '@/constants/yh/WorkerFooterData';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import ACalendar from '@/components/atom/Calendar/ACalendar';

const StyledCalendarContainer = styled(Box)({
  '& .rbc-calendar': {
    maxWidth: '1400px !important',
    margin: '0 auto',
  },
  '& .rbc-event': {
    backgroundColor: '#3174ad !important',
    padding: '4px !important',
    fontSize: '0.9em !important',
  },
  '& .rbc-event-content': {
    textAlign: 'center',
  },
  '& .rbc-row-segment': {
    padding: '2px 4px !important',
  },
  '& .rbc-toolbar': {
    marginBottom: '20px',
  },
  '& .rbc-toolbar button': {
    color: '#333',
  },
  '& .rbc-active': {
    backgroundColor: '#3174ad !important',
    color: 'white !important',
  },
  '& .rbc-today': {
    backgroundColor: '#f0f7ff',
  },
});

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
    <Box sx={{ p: 3, height: '100vh', width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <WorkerDrawer
          WorkerInfo={WorkerInfo}
          onWorkerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </Box>

      {selectedWorker && (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px', // 달력과 Footer 사이 간격
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {selectedWorker.name}님의 근무 일정
          </Typography>

          {/* Calendar Container */}
          <StyledCalendarContainer
            sx={{
              flexGrow: 1,
              minHeight: '600px', // 달력 높이 조정
              mb: 3,
            }}
          >
            <ACalendar
              events={events}
              onEventAdd={handleEventAdd}
              onEventSelect={handleEventSelect}
            />
          </StyledCalendarContainer>

          {/* Footer Container */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '1400px', // 달력 너비와 맞춤
              margin: '0 auto',
              mt: 'auto', // 하단에 붙임
            }}
          >
            <AFooter data={getFooterData(selectedWorker)} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Page;
