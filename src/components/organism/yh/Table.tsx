import React from 'react';
import { Box } from '@mui/material';
import TableRow from './TableRow';
import ACheckbox from '@/components/atom/CheckBox/ACheckbox';
import EditableAmount from './EditableAmount';

type TableProps = {
  wage: { date: string; amount: number }[];
  totalWage: number;
  wageRate: string;
  wageAmount: number;
  paymentDay: string;
  onWageAmountChange: (newAmount: number) => void;
};

const Table = ({
  wage,
  totalWage,
  wageRate,
  wageAmount,
  paymentDay,
  onWageAmountChange,
}: TableProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        {wage.map((item, index) => (
          <TableRow key={index} label={item.date} value={`${item.amount}원`} />
        ))}
      </Box>
      <Box>
        <TableRow label="합계 수당" value={`${totalWage}원`} />
        <TableRow label="수당률" value={wageRate} />
        <TableRow
          label="수당금액"
          value={<EditableAmount initialAmount={wageAmount} onAmountChange={onWageAmountChange} />}
        />
        <TableRow label="지급요일" value={paymentDay} />
        <TableRow label="지급여부" value={<ACheckbox textprops={{ text: '지급완료' }} />} />
      </Box>
    </Box>
  );
};

export default Table;
