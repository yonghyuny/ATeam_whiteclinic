// util/dateUtils.ts

export type DateInfo = {
  month: number;
  day: number;
  date: Date;
};

// 각 월별로 날짜 정보를 담는 배열을 생성합니다.
export const getMonthlyDates = (year: number) => {
  const dates: { day: Date }[][] = [];
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthDates = Array.from({ length: daysInMonth }, (_, day) => ({
      day: new Date(year, month, day + 1),
    }));
    dates.push(monthDates);
  }
  return dates;
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};
