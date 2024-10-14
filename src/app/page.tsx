'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import ACalendar from '@/components/atom/Calendar/ACalendar';
import TestBtn from '@/components/atom/Button/TestBtn';

const Home = () => {
  return (
    <>
      <ACalendar></ACalendar>
      <TestBtn></TestBtn>
    </>
  );
};

export default Home;
