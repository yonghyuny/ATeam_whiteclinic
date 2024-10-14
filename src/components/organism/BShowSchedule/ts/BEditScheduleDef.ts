import dayjs, { Dayjs } from 'dayjs';

//--------------------------------타입 지정-------------------------------

//-------버튼------
export const sizes = {
  fontSize: {
    small: '12px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
  },
  padding: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  margin: {
    small: '2px',
    medium: '4px',
    large: '6px',
    xlarge: '8px',
  },
  gap: {
    small: '2px',
    medium: '4px',
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
};

export const buttonStyle = {
  buttonSize: {
    width: '250px',
    height: '50px',
    letterSpacing: '10px',
  },
};

export type ButtonContent =
  | '취소'
  | '등록'
  | '등록중지'
  | '추가등록'
  | '아니오'
  | '급여사항확인'
  | '휴무등록'
  | '수정완료'
  | '휴무수정'
  | '기사정보수정';

type btnType = 'button' | 'submit' | 'reset';
type fontSizeProps = keyof typeof sizes.fontSize;
type fontWeightProps = keyof typeof sizes.fontWeight;

export type ButtonProps = {
  content: ButtonContent;
  fontSize?: fontSizeProps;
  fontWeight?: fontWeightProps;
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  type?: btnType;
  handleClick?: (event: any) => void;
};

//---------------------------------------

// 현재 날짜 초기화
export const TODAY = dayjs();
export const CURRENT_YEAR = TODAY.year();
export const CURRENT_MONTH = TODAY.month() + 1; // dayjs에서 month()는 0-11을 반환
export const CURRENT_DAY = TODAY.date();

/**
 * 클라이언트 기준 현재날짜 상수
 */
// TODO : 현재일 기준 이전 날짜도 예약사항 조회 필요시 선택이 가능해야 함. -> 차후 삭제예정
export const MIN_DATE = dayjs(`${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DAY}`);

export type DatePickerProps = {
  label?: '일정 선택' | '출발 날짜' | '도착 날짜';
  value?: Dayjs | null;
  mindateValue?: Dayjs | null; // null을 허용
  handleChange?: (date: Dayjs | null) => void; //스케쥴에 필요해서 매개변수 입력
};

//기사 타입
export type engineerInfo = {
  engineerId: number;
  engineerName: string;
  engineerContact: string;
  engineerAddress: string;
  engineerAbleItem: string;
  engineerSignificant: string;
  engineerWorkDay: string;
  engineerClosedDay: string;
  engineerClosedDate: string;
  engineerSalary: number;
  engineerImgUrl?: string;
};

//schedule에 표시할 사용자 정보
export type CustomerInfo = {
  customerName: string;
  customerContact: string;
  customerAddress: string;
  cleaningItem: string;
  customerComments?: string;
  cleaningType: string;
  itemQuantity: number;
  totalPrice: number;
  appointmentDate: string;
  appointmentTime: string;
  assignedEngineer: string;
};

export type CustomerInfoProps = {
  customer?: CustomerInfo;
};

export type CEditButtonProps = {
  handleClick: () => void;
};

export type CShowEngineerInfoProps = {
  engineer: engineerInfo | null;
};

// -------------------------------UTIL-------------------------------

//엔지니어와 주문 정보를 매칭함
export const filterOrdersForEngineer = (
  orders: CustomerInfo[] | undefined,
  engineerName: string,
  date: string
) => {
  return orders?.filter(
    (order) => order.assignedEngineer === engineerName && order.appointmentDate === date
  );
};

export const priceRender = (customer: CustomerInfo) => {
  const cPrice = customer.totalPrice;
  const customerPrice = cPrice > 10000;
  return customerPrice ? cPrice / 10000 + '만원' : cPrice + '원';
};

// -------------------------------스타일-------------------------------
export const StyledScheduleTimeline = { display: 'flex', flexDirection: 'column', gap: '6px' };
//일정 수정 박스 스타일
export const StyledShowList = {
  width: '300px',
  height: '550px',
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  border: '1px solid #bdbdbd',
  borderRadius: '6px',
  overflow: 'scroll',
};

export const styledEngBoxDetail = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  width: '100%',
  height: '300px',
};

export const EngineerTableStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: 5,
  backgroundColor: '#f5f5f5',
  width: '150px',
  textAlign: 'center',
};

export const StyledCustomerInfo = {
  width: '100%',
  height: '30px',
  padding: '3px',
};

export const StyledTimeSlot = {
  display: 'flex',
  gap: '4px',
};
