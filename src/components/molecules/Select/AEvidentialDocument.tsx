'use client';

import React from 'react';
import ADropdown, { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { Document } from '@/constants/Document';
import { SelectProps } from './APayment';

const AEvidentialDocument = ({ adropdownprops }: SelectProps) => {
  const documentOptions = Document.map((doc) => ({ text: doc, value: doc }));

  return <ADropdown {...adropdownprops} options={documentOptions} />;
};

export default AEvidentialDocument;
