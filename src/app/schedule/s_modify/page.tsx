'use client';

import { useEffect, useState } from 'react';
import AEditOrderInfo from '@/components/organism/Schedule/AEditOrderInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import CenteredLayout from '@/styles/layout/CenterLayout';

//customers/c_modify/page.tsx
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기

  // 상태 관리
  const [selectTime, setSelectTime] = useState<Date | null>(null);
  const [selectCustomerId, setSelectCustomerId] = useState<string | null>(null);
  const [selectOrderId, setSelectOrderId] = useState<string | null>(null);
  const [engineerId, setEngineerId] = useState<string | null>(null);

  useEffect(() => {
    const selectTimeParam = searchParams.get('selectTime');
    const selectCustomerIdParam = searchParams.get('selectCustomerId');
    const selectOrderIdParam = searchParams.get('selectOrderId');
    const engineerIdParam = searchParams.get('engineerId');

    if (selectTimeParam) {
      setSelectTime(new Date(selectTimeParam));
    }
    if (selectCustomerIdParam) {
      setSelectCustomerId(selectCustomerIdParam);
    }
    if (selectOrderIdParam) {
      setSelectOrderId(selectOrderIdParam);
    }
    if (engineerIdParam) {
      setEngineerId(engineerIdParam);
    }
  }, [searchParams]); // searchParams가 변경될 때마다 effect 실행

  return (
    <CenteredLayout>
      <AEditOrderInfo
        selectTime={selectTime}
        selectCustomerId={Number(selectCustomerId)}
        selectOrderId={Number(selectOrderId)}
        engineerId={Number(engineerId)}
      />
    </CenteredLayout>
  );
};

export default Page;
