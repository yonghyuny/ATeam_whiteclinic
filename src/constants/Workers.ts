type Engineer = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark: string;
  skills: string[];
  commission_rate: number;
  payday: string;
  is_paid: boolean;
  daily_earnings: {
    date: string;
    daily_amount: number;
  }[];
};

export type WorkerType = {
  [key: number]: WorkerProps;
};

type DatePay = {
  date: string;
  pay: string;
};

export type WorkerProps = {
  name: string;
  tel: string;
  address: string;
  available: string[];
  datePay: DatePay[];
  percent: string;
  payday: string;
  ispaid: boolean;
};
