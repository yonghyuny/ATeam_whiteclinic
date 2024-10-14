'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { WorkerInfo, WorkerProps } from '@/constants/Workers';
import CenteredLayout from '@/styles/layout/CenterLayout';
import AButton from '@/components/atom/Button/AButton';
import ADataGrid from '@/components/molecules/datagrid/ADataGrid';
import { getFooterData } from '@/constants/yh/WorkerFooterData';
import AFooter from '@/components/molecules/datagrid/AFooter';
import { workerColumns } from '@/constants/yh/ColumnData';
import CardFilter from '@/components/organism/yh/CardFilter';
import { YStyle } from '@/styles/yh';
import { sizes } from '@/styles/sizes';

const Page = () => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerProps | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  const handleCardClick = (worker: WorkerProps) => {
    setSelectedWorker(worker);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (selectedWorker && selectedWorker.datePay) {
      const newRows = selectedWorker.datePay.map((dp, index) => ({
        id: index,
        date: dp.date,
        pay: parseInt(dp.pay),
      }));
      setRows(newRows);
    }
  }, [selectedWorker]);

  const filteredWorkers = Object.entries(WorkerInfo).filter(
    ([_, worker]) =>
      worker.name.toLowerCase().includes(filter.toLowerCase()) || worker.available.includes(filter)
  );

  const submit = () => {
    console.log('제출');
  };

  const workerDataProps = {
    rows,
    columns: workerColumns,
    title: `${selectedWorker?.name}의 정보`,
    height: 'auto',
    width: '100%',
  };

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
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
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
            width: '400px',
            height: '100%',
            overflowY: 'auto',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardFilter {...cardFilterProps} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          {selectedWorker && (
            <Box
              sx={{
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <ADataGrid {...workerDataProps} />
              <AFooter data={getFooterData(selectedWorker)} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
