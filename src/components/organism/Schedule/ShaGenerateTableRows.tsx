import ShaButton from '@/components/atom/Button/ShaButton';
import { TableCell, TableRow } from '@/components/ui/table';
import { Order } from '@/constants/schedule/ScheduleType';
import { timeSlots } from '@/constants/schedule/timeSlots';
import React from 'react';

//스케쥴 ROW 테이블 설정
type ShaGenerateTableRowsProps = {
  scheduleData: Order[];
  onEditOrder: (order: Order) => void;
  isEditing: boolean;
  selectedDate: Date;
};

const ShaGenerateTableRows = ({
  scheduleData,
  onEditOrder,
  isEditing,
  selectedDate,
}: ShaGenerateTableRowsProps) => {
  const slotTimes = timeSlots.map((slot, index) => {
    const startTime = new Date(selectedDate); // 선택한 날짜를 기준으로 시작 시간 생성
    const endTime = new Date(selectedDate); // 선택한 날짜를 기준으로 종료 시간 생성

    // 각 슬롯에 맞게 시간 설정
    if (index === 0) {
      // 8시 이전
      startTime.setHours(0, 0, 0, 0); // 시작 시간을 자정으로 설정
      endTime.setHours(8, 0, 0, 0); // 종료 시간을 8시로 설정
    } else if (index === timeSlots.length - 1) {
      // 19시 이후
      startTime.setHours(19, 0, 0, 0); // 시작 시간을 19시로 설정
      endTime.setHours(23, 59, 59, 999); // 종료 시간을 자정으로 설정
    } else {
      const [startHour, endHour] = slot.split(' ~ ').map((time) => {
        const [hour] = time.split(':');
        return parseInt(hour, 10);
      });
      startTime.setHours(startHour, 0, 0, 0); // 시작 시간을 설정
      endTime.setHours(endHour, 0, 0, 0); // 종료 시간을 설정
    }

    return { slotStartTime: startTime.getTime(), slotEndTime: endTime.getTime() };
  });

  return (
    <>
      {timeSlots.map((slot, index) => {
        const { slotStartTime, slotEndTime } = slotTimes[index];

        const slotOrders = scheduleData.filter((order) => {
          const orderStart = new Date(order.startTime).getTime();
          const orderEnd = new Date(order.endTime).getTime();
          return orderStart >= slotStartTime && orderEnd <= slotEndTime;
        });

        return (
          <TableRow key={slot}>
            <TableCell className="sticky left-0 bg-gray-50 w-44">{slot}</TableCell>
            {slotOrders.length > 0 ? (
              slotOrders.map((order) => (
                <React.Fragment key={order.orderId}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.itemCount}</TableCell>
                  <TableCell>{order.finalPrice}</TableCell>
                  <TableCell>{order.customerUniqueDetails}</TableCell>
                  {isEditing && (
                    <TableCell>
                      <ShaButton onClick={() => onEditOrder(order)} size="sm" text="수정" />
                    </TableCell>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableCell colSpan={7}> </TableCell>
            )}
          </TableRow>
        );
      })}
    </>
  );
};

export default ShaGenerateTableRows;
