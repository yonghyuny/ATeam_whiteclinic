'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import InfoForm from '@/components/molecules/Form/InfoForm';
import TwoButtons from '@/components/molecules/Button/TwoButton';
import { CustomerInfoFormData } from '@/constants/customerInfoFormData';
import { Dayjs } from 'dayjs';

export type CustomerInfoValues = {
  reservationDateTime: Dayjs | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: string;
  payment: string;
};

type CustomerInfoProps = {
  onRegister: () => void;
};

const CustomerInfo = ({ onRegister }: CustomerInfoProps) => {
  const [formValues, setFormValues] = useState<CustomerInfoValues>({
    reservationDateTime: null,
    name: '',
    phoneNumber: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: '',
    payment: '',
  });

  const [resetCounter, setResetCounter] = useState(0);

  const resetFormValues = () => {
    setFormValues({
      reservationDateTime: null,
      name: '',
      phoneNumber: '',
      address: '',
      uniqueDetails: '',
      document: '',
      published: '',
      payment: '',
    });
    setResetCounter((prev) => prev + 1);
  };

  const handleFieldChange = (fieldName: keyof CustomerInfoValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // 필수 입력 항목이 모두 채워져 있는지 확인하는 함수
  const isFormValid = () => {
    const requiredFields: (keyof CustomerInfoValues)[] = [
      'reservationDateTime',
      'name',
      'phoneNumber',
      'address',
      'document',
      'payment',
    ];
    // 날짜가 존재하는지, 그리고 다른 필수 필드가 모두 채워져 있는지 확인
    return requiredFields.every((field) => formValues[field] !== '' && formValues[field] !== null);
  };

  // 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    console.log('등록된 데이터:', formValues);

    // 등록 버튼 클릭 시 세척품목쪽 활성화인데 아직 구현 안 함
    onRegister();
  };

  return (
    <Box>
      <InfoForm
        key={resetCounter}
        titledformcontrolprops={CustomerInfoFormData(formValues, handleFieldChange)}
      />
      <TwoButtons
        leftButton={{ text: '취소', size: 'full', onClick: resetFormValues }}
        rightButton={{
          text: '등록',
          color: 'primary',
          size: 'full',
          onClick: handleSubmit,
          disabled: !isFormValid(),
        }}
      />
    </Box>
  );
};

export default CustomerInfo;
