import { Box } from '@mui/material';
import { ReactNode } from 'react';

type ALayoutProps = {
  children: ReactNode;
};

const ALayout = ({ children }: ALayoutProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
      {children}
    </Box>
  );
};

export default ALayout;
