export type Engineer = {
  id: number;
  engineer_id: number;
  name: string;
  phone_number: string;
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

export type EngineerPay = {
  id: number;
  engineerId: number;
  date: string;
  daily_amount: number;
};

export type EngineerPayDay = {
  id: number;
  engineerId: number;
  weekdays: string;
  is_pay: boolean;
};

export type EngineerCommissionRate = {
  id: number;
  engineerId: number;
  rateId: number;
};

export type ApiResponse = {
  engineer: {
    id: number;
    name: string;
    phoneNumber: string;
    location: string;
    remark: string;
  }[];
  engineerPay: EngineerPay[];
  engineerPayDay: EngineerPayDay[];
  EngineerCommissionRates: EngineerCommissionRate[];
};

export type FooterItem = {
  label: string;
  value: string | number | boolean;
  renderValue?: (value: string | number | boolean) => React.ReactNode;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
};

export type AFooterProps = {
  data: FooterItem[];
  isEditing: boolean;
};

export type EngineerWithDetails = {
  engineer_id: number;
  name: string;
  phone_number: string;
  location: string;
  remark: string;
  skills: string[];
  commission_rate: number;
  regular_engineer_id?: number;
};

export type FilterProps = {
  data: [string, EngineerWithDetails][];
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (item: [string, EngineerWithDetails]) => void;
};