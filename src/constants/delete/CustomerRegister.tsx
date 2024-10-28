'use client';

import { Box } from '@mui/material';
import CustomerInfo from './CustomerInfo';
import SalesInfo from './SalesInfo';
import { useState } from 'react';

const CustomerRegister = () => {
  const [isSalesInfoActive, setIsSalesInfoActive] = useState(false);

  const handleCustomerRegister = () => {
    setIsSalesInfoActive(true);
  };

  return (
    <Box sx={{ display: 'flex', gap: '100px' }}>
      <CustomerInfo onRegister={handleCustomerRegister} />
      <SalesInfo />
    </Box>
  );
};

export default CustomerRegister;
