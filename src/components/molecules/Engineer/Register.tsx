'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import InfoForm from '@/components/molecules/Form/InfoForm';
import TwoButtons from '@/components/molecules/Button/TwoButton';
import { EngineerFormData, EngineerFormValues } from '@/constants/EnginnerFormData';
import CenteredLayout from '@/styles/layout/CenterLayout';

type RegisterProps = {
  onRegister?: () => void;
};

const Register = ({ onRegister }: RegisterProps) => {
  const [formValues, setFormValues] = useState<EngineerFormValues>({
    name: '',
    phoneNumber: '',
    residenceArea: '',
    Items: [],
    ItemsSpecialNotes: '',
    specialNotes: '',
    allowanceRate: '',
    paymentDay: '',
    holidayRegistration: [],
    regularHoliday: [],
  });

  const resetFormValues = () => {
    setFormValues({
      name: '',
      phoneNumber: '',
      residenceArea: '',
      Items: [],
      ItemsSpecialNotes: '',
      specialNotes: '',
      allowanceRate: '',
      paymentDay: '',
      holidayRegistration: [],
      regularHoliday: [],
    });
  };

  const handleFieldChange = (fieldName: keyof EngineerFormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // 필수 입력 항목이 모두 채워져 있는지 확인하는 함수
  const isFormValid = () => {
    const requiredFields: (keyof EngineerFormValues)[] = [
      'name',
      'phoneNumber',
      'residenceArea',
      'allowanceRate',
      'paymentDay',
    ];
    return requiredFields.every((field) => formValues[field] !== '');
  };

  // 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    console.log('등록된 데이터:', formValues);
  };

  return (
    <CenteredLayout>
      <Box>
        <InfoForm titledformcontrolprops={EngineerFormData(formValues, handleFieldChange)} />
        <TwoButtons
          leftButton={{ text: '취소', color: 'default', size: 'large', onClick: resetFormValues }}
          rightButton={{
            text: '등록',
            color: 'primary',
            size: 'large',
            onClick: handleSubmit,
            disabled: !isFormValid(),
          }}
        />
      </Box>
    </CenteredLayout>
  );
};

export default Register;
