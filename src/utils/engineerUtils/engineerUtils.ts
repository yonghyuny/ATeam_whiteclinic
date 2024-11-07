import { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import {Engineer} from '@/constants/yh/EngineerTypeData';

export const processEngineerData = (
  engineer: any,
  engineerPay: any[],
  engineerPayDay: any[],
  EngineerCommissionRates: any[]
): Engineer => {
  const payments = engineerPay.filter((pay) => pay.engineerId === engineer.id);
  const payDay = engineerPayDay.find((day) => day.engineerId === engineer.id);
  const commission = EngineerCommissionRates.find((rate) => rate.engineerId === engineer.id);

  return {
    id: engineer.id,
    engineer_id: engineer.id,
    name: engineer.name,
    phone_number: engineer.phoneNumber,
    location: engineer.location,
    remark: engineer.remark,
    skills: [],
    commission_rate: commission ? commission.rateId : 50,
    payday: payDay ? payDay.weekdays : '월요일',
    is_paid: payDay ? payDay.is_pay : false,
    daily_earnings: payments.map((pay) => ({
      date: pay.date,
      daily_amount: pay.daily_amount,
    })),
  };
};

export const createCalendarEvents = (engineer: Engineer): CalendarEventType[] => {
  return engineer.daily_earnings.map((earning) => ({
    title: `${earning.daily_amount.toLocaleString()}원`,
    start: new Date(earning.date),
    end: new Date(earning.date),
    allDay: true,
    amount: earning.daily_amount,
    user: engineer.name,
  }));
};

export const calculateWageAmount = (engineer: Engineer): number => {
  const totalWage = getTotalWage(engineer);
  return Math.round(totalWage * (engineer.commission_rate / 100));
};

export const getTotalWage = (engineer: Engineer): number => {
  return engineer.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
};

export const calculateNewDailyEarnings = (
  dailyEarnings: Engineer['daily_earnings'], 
  newTotalAmount: number, 
  currentTotal: number
) => {
  const ratio = newTotalAmount / currentTotal;
  return dailyEarnings.map(dp => ({
    ...dp,
    daily_amount: Math.round(dp.daily_amount * ratio),
  }));
};