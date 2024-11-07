import { Suspense } from 'react';
import CenteredLayout from '@/styles/layout/CenterLayout';
import ScheduleModifyContent from '@/components/organism/Schedule/ScheduleModifyContent';

const Page = () => {
  return (
    <CenteredLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduleModifyContent />
      </Suspense>
    </CenteredLayout>
  );
};

export default Page;
