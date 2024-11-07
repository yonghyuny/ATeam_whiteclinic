'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AEditOrderInfo from '@/components/organism/Schedule/AEditOrderInfo';

const ScheduleModifyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  }, [searchParams]);

  return (
    <AEditOrderInfo
      selectTime={selectTime}
      selectCustomerId={Number(selectCustomerId)}
      selectOrderId={Number(selectOrderId)}
      engineerId={Number(engineerId)}
    />
  );
};

export default ScheduleModifyContent;
