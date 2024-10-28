'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '../Form/ShaInfoForm';
import { EngineerFormData, EngineerFormValues } from '@/constants/ShaEngineerForm';
import ShaTwoButton from '../Button/ShaTwoButton';

type RegisterProps = {
  onRegister?: () => void;
};

const ShaRegister = ({ onRegister }: RegisterProps) => {
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

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

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
    setIsSubmitAttempted(false);
  };

  const handleFieldChange = (fieldName: keyof EngineerFormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

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

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      console.log('등록된 데이터:', formValues);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">기사 정보 등록</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={EngineerFormData(
              formValues,
              handleFieldChange,
              isSubmitAttempted
            )}
          />
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: resetFormValues,
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '등록',
              onClick: handleSubmit,
              disabled: !isFormValid(),
              size: 'lg',
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShaRegister;
