import React, { useState, useEffect } from 'react';
import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import ShaEngineerList from './ShaEngineerList';
import ShaScheduleTimeline from './ShaScheduleTimeline';
import { getEngineersByDate, getOrdersByEngineerAndDate } from '@/util/ScheduleShowUtil';
import { Engineer, Order } from '@/constants/ScheduleType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShaButton from '@/components/atom/Button/ShaButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mkConfig, generateCsv, download } from 'export-to-csv';

//리팩토링, 최적화 안함. 추후 작업예정
const ShaScheduleShowTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [engineerList, setEngineerList] = useState<Engineer[]>([]);
  const [selectedEngineer, setSelectedEngineer] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<Order[]>([]);

  const router = useRouter();

  // 날짜 변경 시, 해당 날짜에 맞는 기사 리스트를 가져옴
  useEffect(() => {
    if (selectedDate) {
      const engineers = getEngineersByDate(selectedDate);
      setEngineerList(engineers);
      setSelectedEngineer(null);
      setScheduleData([]);
    }
  }, [selectedDate]);

  // 기사 선택 시, 해당 기사의 스케줄을 가져옴
  useEffect(() => {
    if (selectedEngineer && selectedDate) {
      const schedule = getOrdersByEngineerAndDate(selectedEngineer, selectedDate);
      setScheduleData(schedule);
    }
  }, [selectedEngineer, selectedDate]);

  const selectedEngineerName =
    engineerList.find((engineer) => engineer.engineerId === selectedEngineer)?.engineerName ||
    '기사를 선택하세요';

  const handleEditBtnClick = () => {
    router.push('/customers/c_modify');
  };

  const exportToCsv = () => {
    const csvOptions = mkConfig({
      filename: `${selectedDate?.toLocaleDateString('ko-KR')}_${selectedEngineerName}_스케쥴`,
      fieldSeparator: ',',
      quoteStrings: true,
      decimalSeparator: '.',
      showTitle: true,
      useBom: true,
      columnHeaders: [
        { key: 'orderId', displayLabel: '주문번호' },
        { key: 'reservationDateTime', displayLabel: '예약 날짜' },
        { key: 'name', displayLabel: '이름' },
        { key: 'phoneNumber', displayLabel: '전화번호' },
        { key: 'address', displayLabel: '주소' },
        { key: 'product', displayLabel: '세척 물품' },
        { key: 'itemCount', displayLabel: '세척대수' },
        { key: 'uniqueDetails', displayLabel: '특이사항' },
        { key: 'finalPrice', displayLabel: '비용' },
        { key: 'startTime', displayLabel: '예약 시간' },
      ],
    });

    const data = scheduleData.map((order) => ({
      orderId: order.orderId,
      reservationDateTime: order.reservationDateTime
        ? order.reservationDateTime.toLocaleString()
        : '예약 날짜',
      name: order.name,
      phoneNumber: order.phoneNumber,
      address: order.address,
      product: order.product,
      itemCount: order.itemCount,
      uniqueDetails: order.uniqueDetails,
      finalPrice: order.finalPrice,
      startTime: new Date(order.startTime).toLocaleString(),
    }));

    const csvOutput = generateCsv(csvOptions)(data);
    download(csvOptions)(csvOutput);
  };

  const handleExportBtnClick = () => {
    exportToCsv();
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

      <div className="min-w-[880px]">
        <Card className="w-full max-w-5xl shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold">{selectedEngineerName}</CardTitle>
            <div className="flex flex-row gap-1">
              <ShaButton onClick={handleExportBtnClick} size="sm" text="전달" variant="outline" />
              <ShaButton onClick={handleEditBtnClick} size="sm" text="수정" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            <ShaScheduleTimeline scheduleData={scheduleData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShaScheduleShowTable;
