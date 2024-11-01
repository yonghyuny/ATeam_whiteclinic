import React, { useState, useEffect } from 'react';
import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import ShaEngineerList from './ShaEngineerList';
import ShaScheduleTimeline from './ShaScheduleTimeline';
import { getEngineersByDate, getOrdersByEngineerAndDate } from '@/util/ScheduleShowUtil';
import { Engineer, Order } from '@/constants/schedule/ScheduleType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShaButton from '@/components/atom/Button/ShaButton';
import { useRouter } from 'next/navigation';

//리팩토링, 최적화 안함. 추후 작업예정
const ShaScheduleShowTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [engineerList, setEngineerList] = useState<Engineer[]>([]);
  const [selectedEngineer, setSelectedEngineer] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  // 날짜 변경 시, 해당 날짜에 맞는 기사 리스트를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        const engineers = await getEngineersByDate(selectedDate);
        setEngineerList(engineers);
        setSelectedEngineer(null);
        setScheduleData([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  // 기사 선택 시, 해당 기사의 스케줄을 가져옴
  useEffect(() => {
    const fetchEngineerData = async () => {
      if (selectedEngineer && selectedDate) {
        const schedule = await getOrdersByEngineerAndDate(selectedEngineer, selectedDate);
        setScheduleData(schedule);
      }
    };
    fetchEngineerData();
  }, [selectedEngineer, selectedDate]);

  const selectedEngineerName =
    engineerList.find((engineer) => engineer.engineerId === selectedEngineer)?.engineerName ||
    '기사를 선택하세요';

  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleRowEdit = (order: Order) => {
    const queryString = new URLSearchParams({
      selectTime: order.startTime, // 시작 시간
      selectCustomerId: order.customerId.toString(), // 고객 ID 왜 오류나냐 미친것
      selectOrderId: order.orderId.toString(), // 주문 ID
      engineerId: order.engineerId.toString(), // 기사 ID
    }).toString();

    router.push(`/customers/c_modify?${queryString}`);
  };
  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-12 px-4 gap-12">
      <div className="flex flex-col gap-2">
        <ShaDateSchedulePicker value={selectedDate} onChange={setSelectedDate} />
        <ShaEngineerList
          engineerList={engineerList}
          onClick={(engineerId) => setSelectedEngineer(engineerId)}
        />
      </div>

      <div className="min-w-[1200px]">
        <Card className="w-full shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold">{selectedEngineerName}</CardTitle>
            <div className="flex flex-row gap-1">
              <ShaButton onClick={handleEditMode} size="sm" text="수정" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            <ShaScheduleTimeline
              scheduleData={scheduleData}
              onEditOrder={handleRowEdit}
              isEditing={isEditing}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShaScheduleShowTable;
