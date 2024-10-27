import { Engineer, Order } from '@/constants/ScheduleType';

// 특정 날짜에 맞는 기사를 반환하는 함수
export const getEngineersByDate = (date: Date): Engineer[] => {
  // 더미 데이터, 추후 api로 변경
  const engineers: Engineer[] = [
    {
      engineerId: 1,
      engineerName: '홍길동',
      phoneNumber: '010-1234-5678',
      residenceArea: '서울',
      Items: ['냉장고', '세탁기'],
      ItemsSpecialNotes: '설치 높이 주의 필요',
      specialNotes: '특별한 주의사항 없음',
      allowanceRate: '1000',
      paymentDay: '매주 금요일',
      holidayRegistration: [new Date('2024-10-24')],
      regularHoliday: ['일요일'],
    },
    {
      engineerId: 2,
      engineerName: '김철수',
      phoneNumber: '010-2345-6789',
      residenceArea: '인천',
      Items: ['에어컨', '스탠드'],
      ItemsSpecialNotes: '연아 2구',
      specialNotes: '오후 근무 선호',
      allowanceRate: '1500',
      paymentDay: '매주 월요일',
      holidayRegistration: [new Date('2024-10-25')],
      regularHoliday: ['토요일'],
    },
    {
      engineerId: 3,
      engineerName: '이영희',
      phoneNumber: '010-3456-7890',
      residenceArea: '부산',
      Items: ['텔레비전', '노트북'],
      ItemsSpecialNotes: '물에 민감함',
      specialNotes: '아침 근무 선호',
      allowanceRate: '1200',
      paymentDay: '매주 수요일',
      holidayRegistration: [new Date('2024-10-26')],
      regularHoliday: ['금요일'],
    },
  ];

  const selectedDay = date.toLocaleString('ko-KR', { weekday: 'long' }); // 요일 추출 ('Monday', 'Tuesday', etc.)

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
export const getOrdersByEngineerAndDate = (engineerId: number, date: Date): Order[] => {
  // 더미 데이터
  const orders: Order[] = [
    {
      orderId: 1,
      reservationDateTime: new Date('2024-10-23T09:00:00'),
      name: '김민수',
      phoneNumber: '010-9999-1111',
      address: '서울 강남구',
      uniqueDetails: '고층, 엘리베이터 필요',
      document: '주문서_123.pdf',
      published: 'Yes',
      payment: 50000,
      startTime: '2024-10-23T10:00:00',
      endTime: '2024-10-23T11:00:00',
      engineerId: 1,
    },
    {
      orderId: 2,
      reservationDateTime: new Date('2024-10-23T12:00:00'),
      name: '박지훈',
      phoneNumber: '010-8888-2222',
      address: '인천 남동구',
      uniqueDetails: '주차 허가 필요',
      document: '주문서_124.pdf',
      published: 'Yes',
      payment: 75000,
      startTime: '2024-10-23T13:00:00',
      endTime: '2024-10-23T13:30:00',
      engineerId: 2,
    },
    {
      orderId: 3,
      reservationDateTime: new Date('2024-10-23T15:00:00'),
      name: '최수정',
      phoneNumber: '010-7777-3333',
      address: '부산 해운대구',
      uniqueDetails: '좁은 골목, 차량 접근 어려움',
      document: '주문서_125.pdf',
      published: 'Yes',
      payment: 60000,
      startTime: '2024-10-23T16:00:00',
      endTime: '2024-10-23T17:00:00',
      engineerId: 3,
    },
  ];

  return orders.filter((order) => {
    const orderDate = new Date(order.startTime).toDateString();
    return order.engineerId === engineerId && orderDate === date.toDateString();
  });
};
