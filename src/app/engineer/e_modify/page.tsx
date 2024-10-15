'use client';

import TwoButtons from '@/components/molecules/Button/TwoButton';
import Holiday from '@/components/molecules/Engineer/ShaHoliday';

import InfoForm from '@/components/molecules/Form/InfoForm';
import { PaymentInfo } from '@/constants/PaymentInfo';
import CenteredLayout from '@/styles/layout/CenterLayout';
import { Box } from '@mui/material';
import { useState } from 'react';

const Page = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  return (
    <CenteredLayout>
      <Box>
        {/* <InfoForm titledformcontrolprops={PaymentInfo} />
        <TwoButtons
          leftButton={{ text: '취소', size: 'full' }}
          rightButton={{ text: '등록', color: 'primary', size: 'full' }}
        /> */}
        수정 페이지
      </Box>
      <Holiday selectedDays={selectedDays} onDaysChange={setSelectedDays} />{' '}
    </CenteredLayout>
  );
};

export default Page;
