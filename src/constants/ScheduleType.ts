import { productCategories } from './productCategory';

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
  finalPrice: number;
  itemCount: number;
  product: string;
};

type ProductCategoryKey = keyof typeof productCategories;

export type SalesFormData = {
  selectedCategory: ProductCategoryKey | '';
  selectedDropdownValue: string;
  itemCount: number;
  discountAmount: number;
  finalPrice: number;
  uniqueDetails: string;
  customProduct: string;
  isDiscountApplied: boolean;
  isFinalPriceManual: boolean;
};
