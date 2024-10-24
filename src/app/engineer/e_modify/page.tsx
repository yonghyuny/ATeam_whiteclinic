'use client';

import ShaDateTimePicker from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import Holiday from '@/components/molecules/Engineer/ShaHoliday';
import ShaLabelCheckBox from '@/components/molecules/Engineer/ShaLabelCheckBox';
import CenteredLayout from '@/styles/layout/CenterLayout';
import { Box } from '@mui/material';
import { useState } from 'react';

const Page = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
      <Holiday selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      <ShaLabelCheckBox
        selectedItems={selectedItems}
        onItemsChange={setSelectedItems}
      ></ShaLabelCheckBox>
      <ShaDateTimePicker></ShaDateTimePicker>
    </CenteredLayout>
  );
};

export default Page;
