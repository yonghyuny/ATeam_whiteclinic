import { Box } from '@mui/material';
import { ReactNode } from 'react';

type CenterLayoutProps = {
  children: ReactNode;
};

const CenteredLayout = ({ children }: CenterLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredLayout;
