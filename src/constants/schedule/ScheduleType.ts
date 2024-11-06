import { SalesFormData } from '@/components/organism/Customer/ShaSalesInfo';

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
  customerName: string;
  phoneNumber: string;
  address: string;
  customerUniqueDetails: string;
  document: string;
  published: boolean;
  payment: string;
};

// 스케쥴용 Order 타입 정의
export type Order = CustomerInfoValues & {
  customerId: number;
  orderId: number;
  startTime: Date;
  endTime: Date;
  engineerId: number;
  finalPrice: number;
  itemCount: number;
  product: string;
  specialNotes?: string;
  orderUniqueDetails?: string;
};

export type SalesType = SalesFormData & {
  orderId: number;
};
