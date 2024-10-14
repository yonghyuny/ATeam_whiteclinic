import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SideNav from './ui/SideNav';

const drawerWidth = 240;
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'White Clinic',
  description: 'White Clinic Management Program',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              boxShadow: 'none',
              bgcolor: '#F4F7FA',
            }}
          ></AppBar>
          <SideNav />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: '#F4F7FA',
              p: 0,
            }}
          >
            <Toolbar />
            <Box
              sx={{
                flexGrow: 1,
                overflowY: { md: 'auto' },
                height: '93.2vh',
                bgcolor: '#F4F7FA',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
};

export default RootLayout;
