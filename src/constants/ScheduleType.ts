export type EngineerFormValues = {
  phoneNumber: string;
  residenceArea: string;
  Items: string[];
  ItemsSpecialNotes: string;
  specialNotes: string;
  allowanceRate: string;
  paymentDay: string;
  holidayRegistration: Date[];
  regularHoliday: string[];
};

export type Engineer = EngineerFormValues & {
  engineerId: number;
  engineerName: string;
};

export type CustomerInfoValues = {
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: string;
  payment: number;
};

// Order 타입 정의
export type Order = CustomerInfoValues & {
  orderId: number;
  startTime: string;
  endTime: string;
  engineerId: number;
};
