'use client';

import ADropdown from '@/components/atom/DropdownBox/ADropdown';
import { PaymentOption } from '@/constants/Payment';


const PaymentSelector = () => {
  const clickhandle = () => {
    console.log('click');
  };

  return <ADropdown label="선택" options={PaymentOption} onChange={clickhandle} />;
};

export default PaymentSelector;
