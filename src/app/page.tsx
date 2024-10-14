'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import ACalendar from '@/components/atom/Calendar/ACalendar';
import TestButton from '@/components/atom/Button/TestButton';

const Home = () => {
  return (
    <>
      <ACalendar></ACalendar>
      <TestButton />
    </>
  );
};

export default Home;
