'use client';

import React from 'react';
import { Payment } from '@/constants/Payment';
import ShadcnDropdown, { ShadcnDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';

export type SelectProps = {
  ShadcnDropdownProps?: Omit<ShadcnDropdownProps, 'options'>;
};

const ShaPayment = ({ ShadcnDropdownProps }: SelectProps) => {
  const payOptions = Payment.map((pay) => ({ text: pay, value: pay }));

  return <ShadcnDropdown {...ShadcnDropdownProps} options={payOptions} />;
};

export default ShaPayment;
