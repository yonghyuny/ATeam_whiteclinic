'use client';

import React from 'react';
import ShaRegister from '@/components/molecules/Engineer/ShaRegister';

const Page = () => {
  const Style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <div style={Style}>
      {/* <Register /> <= 이거 지워도 되는부분인지????*/}
      <ShaRegister />
    </div>
  );
};
export default Page;
