import { dummyEngineers, dummyOrders } from '@/constants/schedule/scheduleDummy';
import { Engineer, Order } from '@/constants/schedule/ScheduleType';

// 특정 날짜에 맞는 기사를 반환하는 함수
export const getEngineersByDate = async (date: Date): Promise<Engineer[]> => {
  const selectedDay = date.toLocaleString('ko-KR', { weekday: 'long' }); // 요일 추출 ('Monday', 'Tuesday', etc.)
  //  const response = await fetch('/api/engineers'); // API 엔드포인트로 변경
  //const engineers: Engineer[] = await response.json();

  const engineers = dummyEngineers;

  return engineers.filter((engineer) => {
    const isHoliday = engineer.holidayRegistration.some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );

    const isRegularHoliday = engineer.regularHoliday.includes(selectedDay);

    // 휴무일이 아닌 기사만 반환
    return !isHoliday && !isRegularHoliday;
  });
};

// 특정 기사와 날짜에 맞는 스케줄을 반환하는 함수
export const getOrdersByEngineerAndDate = async (
  engineerId: number,
  date: Date
): Promise<Order[]> => {
  // const response = await fetch(`/api/orders?engineerId=${engineerId}&date=${date.toISOString()}`);
  //const orders: Order[] = await response.json();
  const orders = dummyOrders;
  return orders.filter((order) => {
    const orderDate = new Date(order.startTime).toDateString();
    return order.engineerId === engineerId && orderDate === date.toDateString();
  });
};
