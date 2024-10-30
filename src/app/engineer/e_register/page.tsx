'use client';

import ShaRegister from '@/components/molecules/Engineer/ShaRegister';
import { Box, Container } from '@mui/material';
import React from 'react';

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* <Register /> */}
      <ShaRegister></ShaRegister>
    </Box>
  );
}
