import { Engineer, Order } from '@/constants/schedule/ScheduleType';

// 특정 날짜에 맞는 기사를 반환하는 함수
export const getEngineersByDate = async (date: Date): Promise<Engineer[]> => {
  // const engineers: Engineer[] = [
  //   {
  //     engineerId: 1,
  //     engineerName: '홍길동',
  //     phoneNumber: '010-1234-5678',
  //     residenceArea: '서울',
  //     Items: ['냉장고', '세탁기'],
  //     ItemsSpecialNotes: '설치 높이 주의 필요',
  //     specialNotes: '특별한 주의사항 없음',
  //     allowanceRate: '1000',
  //     paymentDay: '매주 금요일',
  //     holidayRegistration: [new Date('2024-10-24')],
  //     regularHoliday: ['일요일'],
  //   },
  //   {
  //     engineerId: 2,
  //     engineerName: '김철수',
  //     phoneNumber: '010-2345-6789',
  //     residenceArea: '인천',
  //     Items: ['에어컨', '스탠드'],
  //     ItemsSpecialNotes: '연아 2구',
  //     specialNotes: '오후 근무 선호',
  //     allowanceRate: '1500',
  //     paymentDay: '매주 월요일',
  //     holidayRegistration: [new Date('2024-10-25')],
  //     regularHoliday: ['토요일'],
  //   },
  //   {
  //     engineerId: 3,
  //     engineerName: '이영희',
  //     phoneNumber: '010-3456-7890',
  //     residenceArea: '부산',
  //     Items: ['텔레비전', '노트북'],
  //     ItemsSpecialNotes: '물에 민감함',
  //     specialNotes: '아침 근무 선호',
  //     allowanceRate: '1200',
  //     paymentDay: '매주 수요일',
  //     holidayRegistration: [new Date('2024-10-26')],
  //     regularHoliday: ['금요일'],
  //   },
  // ];

  const selectedDay = date.toLocaleString('ko-KR', { weekday: 'long' }); // 요일 추출 ('Monday', 'Tuesday', etc.)
  const response = await fetch('/api/engineers'); // API 엔드포인트로 변경
  const engineers: Engineer[] = await response.json();

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
  const response = await fetch(`/api/orders?engineerId=${engineerId}&date=${date.toISOString()}`);
  const orders: Order[] = await response.json();

  return orders.filter((order) => {
    const orderDate = new Date(order.startTime).toDateString();
    return order.engineerId === engineerId && orderDate === date.toDateString();
  });
};
