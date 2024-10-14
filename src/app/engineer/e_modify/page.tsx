'use client';

import TwoButtons from '@/components/molecules/Button/TwoButton';

import InfoForm from '@/components/molecules/Form/InfoForm';
import { PaymentInfo } from '@/constants/PaymentInfo';
import CenteredLayout from '@/styles/layout/CenterLayout';
import { Box } from '@mui/material';

const Page = () => {
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
    </CenteredLayout>
  );
};

export default Page;
