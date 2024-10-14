import AText from '@/components/atom/Text/AText';
import APercent from '@/components/molecules/Select/APercent';
import { Box } from '@mui/material';
import { Component, ReactNode } from 'react';

type LabelDropdownBoxProps = {
  text: string;
  children?: ReactNode;
};

const LabelBox = ({ text, children }: LabelDropdownBoxProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 110,
            height: 56,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#F2F2F2',
            borderRight: '1px solid #7F7F7F',
            borderBottom: '1px solid #7F7F7F',
          }}
        >
          <AText text={text} />
        </Box>
        <Box
          sx={{
            width: '392px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #7F7F7F',
            p: 1,
            gap: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LabelBox;
