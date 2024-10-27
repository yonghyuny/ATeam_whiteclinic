// 스케쥴 등록에 사용할 Order와 Engineer에 대한 더미 데이터
export const orderData = [
  {
    id: 'order1',
    details: 'Order 1: Installation at Client A',
    startTime: new Date('2024-10-23T09:00:00').toISOString(), // ISO 문자열로 변환
    endTime: new Date('2024-10-23T11:00:00').toISOString(), // ISO 문자열로 변환
    engineerId: null,
    reservationDateTime: new Date('2024-10-23').toISOString(), // ISO 문자열로 변환
    name: 'Client A',
    phoneNumber: '010-1234-5678',
    address: '123 Client A St.',
    uniqueDetails: 'First installation at Client A.',
    document: 'Document 1',
    published: '2024-10-01',
    payment: 'Credit Card',
  },
  {
    id: 'order2',
    details: 'Order 2: Maintenance at Client B',
    startTime: new Date('2024-10-23T13:00:00').toISOString(), // ISO 문자열로 변환
    endTime: new Date('2024-10-23T15:00:00').toISOString(), // ISO 문자열로 변환
    engineerId: null,
    reservationDateTime: new Date('2024-10-23').toISOString(), // ISO 문자열로 변환
    name: 'Client B',
    phoneNumber: '010-2345-6789',
    address: '456 Client B Ave.',
    uniqueDetails: 'Regular maintenance service for Client B.',
    document: 'Document 2',
    published: '2024-10-02',
    payment: 'Cash',
  },
  {
    id: 'order3',
    details: 'Order 3: Repair at Client C',
    startTime: new Date('2024-10-23T10:00:00').toISOString(), // ISO 문자열로 변환
    endTime: new Date('2024-10-23T12:00:00').toISOString(), // ISO 문자열로 변환
    engineerId: 'eng1',
    reservationDateTime: new Date('2024-10-23').toISOString(), // ISO 문자열로 변환
    name: 'Client C',
    phoneNumber: '010-3456-7890',
    address: '789 Client C Rd.',
    uniqueDetails: 'Repair service needed at Client C.',
    document: 'Document 3',
    published: '2024-10-03',
    payment: 'Bank Transfer',
  },
];

export const engineerData = [
  {
    id: 'eng1',
    name: 'Engineer A',
    phoneNumber: '010-1111-2222',
    residenceArea: 'Area A',
    Items: ['Tool 1', 'Tool 2'],
    ItemsSpecialNotes: 'Handle with care.',
    specialNotes: 'Expert in electrical repairs.',
    allowanceRate: '20%',
    paymentDay: 'End of month',
    holidayRegistration: [new Date('2024-10-01').toISOString()], // ISO 문자열로 변환
    regularHoliday: ['Sunday'],
    isHoliday: false,
    availability: true,
    orders: [
      {
        id: 'order3',
        startTime: new Date('2024-10-23T10:00:00').toISOString(), // ISO 문자열로 변환
        endTime: new Date('2024-10-23T12:00:00').toISOString(), // ISO 문자열로 변환
      },
    ],
  },
  {
    id: 'eng2',
    name: 'Engineer B',
    phoneNumber: '010-2222-3333',
    residenceArea: 'Area B',
    Items: ['Tool 3'],
    ItemsSpecialNotes: 'N/A',
    specialNotes: 'Available for mechanical repairs.',
    allowanceRate: '15%',
    paymentDay: 'Weekly',
    holidayRegistration: [],
    regularHoliday: ['Saturday'],
    isHoliday: false,
    availability: true,
    orders: [],
  },
  {
    id: 'eng3',
    name: 'Engineer C',
    phoneNumber: '010-3333-4444',
    residenceArea: 'Area C',
    Items: [],
    ItemsSpecialNotes: 'N/A',
    specialNotes: 'On leave for the week.',
    allowanceRate: '10%',
    paymentDay: 'Bi-weekly',
    holidayRegistration: [new Date('2024-10-01').toISOString()], // ISO 문자열로 변환
    regularHoliday: ['Monday'],
    isHoliday: true,
    availability: false,
    orders: [],
  },
];
