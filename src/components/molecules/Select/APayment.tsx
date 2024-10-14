'use client';

import React from 'react';
import ADropdown, { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { Payment } from '@/constants/Payment';

export type SelectProps = {
  adropdownprops?: Omit<ADropdownProps, 'options'>;
};

const APayment = ({ adropdownprops }: SelectProps) => {
  const payOptions = Payment.map((pay) => ({ text: pay, value: pay }));

  return <ADropdown {...adropdownprops} options={payOptions} />;
};

export default APayment;
