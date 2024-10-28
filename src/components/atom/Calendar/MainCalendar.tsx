'use client';

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { sampleSalesData } from '@/constants/MainCalendarSalesData';
import ACalendar from './ACalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShoppingCart, 
  ArrowUpRight, 
  CalendarDays,
  CreditCard
} from 'lucide-react';

interface SalesData {
  date: string;
  totalOrders: number;
  dailySales: number;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend 
}: { 
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
          {icon}
        </div>
        {trend && (
          <span className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const SalesDashboard: React.FC = () => {
  // 더미 데이터 변환: 캘린더 이벤트 형식으로 변환
  const events = sampleSalesData.map((data) => ({
    title: `총 주문: ${data.totalOrders}, 일일 매출: ${data.dailySales.toLocaleString()}원`,
    start: new Date(data.date),
    end: new Date(data.date),
  }));

  // 주간 및 월간 매출 계산 함수
  const calculateWeeklyMonthlySales = (salesData: SalesData[]) => {
    const today = new Date();
    
    // 최근 7일 데이터
    const weeklyData = salesData.slice(-7);
    // 이번 달 데이터
    const monthlyData = salesData.filter(data => 
      new Date(data.date).getMonth() === today.getMonth()
    );

    // 주간 매출 및 주문 수 계산
    const totalWeeklySales = weeklyData.reduce((acc, data) => acc + data.dailySales, 0);
    const totalWeeklyOrders = weeklyData.reduce((acc, data) => acc + data.totalOrders, 0);
    
    // 월간 매출 및 주문 수 계산
    const totalMonthlySales = monthlyData.reduce((acc, data) => acc + data.dailySales, 0);
    const totalMonthlyOrders = monthlyData.reduce((acc, data) => acc + data.totalOrders, 0);

    return {
      totalWeeklySales,
      totalWeeklyOrders,
      totalMonthlySales,
      totalMonthlyOrders,
    };
  };

  const { 
    totalWeeklySales, 
    totalWeeklyOrders, 
    totalMonthlySales, 
    totalMonthlyOrders 
  } = calculateWeeklyMonthlySales(sampleSalesData);

  return (
    <div className="max-w-full m-auto"> {/* 최대 너비 조정 */}
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* 주간 매출 카드 */}
          <StatCard
            title="주간 총 매출"
            value={`￦${totalWeeklySales.toLocaleString()}`}
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            trend={12}
          />
          
          {/* 주간 주문 카드 */}
          <StatCard
            title="주간 총 주문"
            value={totalWeeklyOrders.toLocaleString()}
            subtitle="지난 7일 동안의 총 주문 수"
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          />
          
          {/* 월간 매출 카드 */}
          <StatCard
            title="월간 총 매출"
            value={`￦${totalMonthlySales.toLocaleString()}`}
            icon={<CreditCard className="w-6 h-6 text-blue-600" />}
            trend={8}
          />
          
          {/* 월간 주문 카드 */}
          <StatCard
            title="월간 총 주문"
            value={totalMonthlyOrders.toLocaleString()}
            subtitle="이번 달의 총 주문 수"
            icon={<CalendarDays className="w-6 h-6 text-blue-600" />}
          />
        </div>
      </div>

      {/* 캘린더 섹션 */}
      
          <div className="h-[600px]">
            <ACalendar events={events} />
          </div>
        
    </div>
  );
};

export default SalesDashboard;