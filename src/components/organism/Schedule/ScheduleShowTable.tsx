import { WorkerInfo, WorkerProps } from '@/constants/Workers';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import CardFilter from '../yh/CardFilter';
import dayjs, { Dayjs } from 'dayjs';
import { formatDate } from '@/util/dateUtil';
import ADatePicker from '@/components/atom/Calendar/ADatePicker';
import ScheduleInfo from './ScheduleInfo';
import { sizes } from '@/styles/sizes';
import CenteredLayout from '@/styles/layout/CenterLayout';

//스케쥴 확인 페이지 - 나중에 컴포넌트 분리 예정

//schedule/s_list/page.tsx의 스타일 가져옴
const dateDisplayStyle = {
  width: '100%',
  minHeight: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#1565C0',
  fontSize: sizes.fontSize.large,
  fontWeight: 800,
};

const ScheduleShowTable = () => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerProps | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filter, setFilter] = useState('');

  const handleCardClick = (worker: WorkerProps) => {
    setSelectedWorker(worker);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue ? newValue.toDate() : null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const displayDate = selectedDate ? formatDate(selectedDate) : '';
  const displayDayOfWeek = selectedDate
    ? selectedDate.toLocaleDateString('ko-KR', { weekday: 'long' })
    : '';

  const filteredWorkers = Object.entries(WorkerInfo).filter(
    ([_, worker]) =>
      worker.name.toLowerCase().includes(filter.toLowerCase()) || worker.available.includes(filter)
  );

  const cardFilterProps = {
    data: filteredWorkers,
    filter: filter,
    onFilterChange: handleFilterChange,
    onItemClick: handleCardClick,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '500px',
            height: '100%',
            overflowY: 'auto',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
            <ADatePicker
              label="날짜 선택"
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={handleDateChange}
            />
          </Box>
          <CardFilter {...cardFilterProps} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            gap: 2,
            p: 1,
            overflowY: 'scroll',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '80%',
            }}
          >
            <Box sx={dateDisplayStyle}>
              {displayDate} {displayDayOfWeek}
            </Box>
            {selectedWorker && (
              <ScheduleInfo selectedDate={selectedDate} engineerName={selectedWorker.name} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleShowTable;
