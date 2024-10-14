import React from 'react';
import { Box, Divider } from '@mui/material';

import { sizes } from '@/styles/sizes';
import AText from '@/components/atom/Text/AText';

export type FooterItem = {
  label: string;
  value: string | number | boolean;
  renderValue?: (value: string | number | boolean) => React.ReactNode;
};

type AFooterProps = {
  data: FooterItem[];
};

const AFooter = ({ data }: AFooterProps) => {
  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <AText text="요약 정보" size="large" />
      <Divider />
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <AText text={`${item.label}:`} size="medium" color="primary" />
          <AText
            text={item.renderValue ? item.renderValue(item.value) : item.value}
            size="medium"
          />
        </Box>
      ))}
    </Box>
  );
};

export default AFooter;
