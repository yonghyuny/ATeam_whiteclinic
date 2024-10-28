import { TableCell, TableRow } from '@/components/ui/table';
import { Order } from '@/constants/ScheduleType';
import { timeSlots } from '@/constants/timeSlots';
import React from 'react';

const ShaGenerateTableRows: React.FC<{ scheduleData: Order[] }> = ({ scheduleData }) => {
  const slotTimes = timeSlots.map((_, index) => {
    const slotStartTime = new Date(`2024-10-23T${index + 8}:00:00`).getTime();
    const slotEndTime = new Date(`2024-10-23T${index + 9}:00:00`).getTime();
    return { slotStartTime, slotEndTime };
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
            <TableCell className="sticky left-0 bg-gray-50">{slot}</TableCell>
            {slotOrders.length > 0 ? (
              slotOrders.map((order) => (
                <React.Fragment key={order.orderId}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.document}</TableCell>
                  <TableCell>[order.itemCount]</TableCell>
                  <TableCell>{order.finalPrice}</TableCell>
                  <TableCell>{order.uniqueDetails}</TableCell>
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
