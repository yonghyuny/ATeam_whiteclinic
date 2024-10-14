import React from 'react';
import { Box } from '@mui/material';
import AText from '@/components/atom/Text/AText';

type TableRowProps = {
  label: string;
  value: string | React.ReactNode;
  borderBottom?: boolean;
};

const TableRow = ({ label, value, borderBottom = true }: TableRowProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: borderBottom ? '1px solid #7F7F7F' : 'none',
      }}
    >
      <Box
        sx={{
          width: 110,
          height: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#F2F2F2',
          borderRight: '1px solid #7F7F7F',
        }}
      >
        <AText text={label} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '250px',
          paddingLeft: '10px',
        }}
      >
        {typeof value === 'string' ? <AText text={value} /> : value}
      </Box>
    </Box>
  );
};

export default TableRow;
