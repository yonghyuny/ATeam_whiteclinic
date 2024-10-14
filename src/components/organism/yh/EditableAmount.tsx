import React, { useState, useEffect } from 'react';
import { Box, Input } from '@mui/material';
import AText from '@/components/atom/Text/AText';

type EditableAmountProps = {
  initialAmount: number;
  onAmountChange: (newAmount: number) => void;
};

const EditableAmount: React.FC<EditableAmountProps> = ({ initialAmount, onAmountChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value, 10);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onAmountChange(amount);
  };

  return (
    <Box onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <Input
          value={amount}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          type="number"
          sx={{ width: '100%' }}
        />
      ) : (
        <AText text={`${amount}원`} />
      )}
    </Box>
  );
};

export default EditableAmount;
