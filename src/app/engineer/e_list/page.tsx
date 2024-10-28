'use client';

import React, { useState, useEffect } from 'react';
import AFooter from '@/components/molecules/datagrid/AFooter';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import ACalendar, { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { StyledCalendarContainer } from '@/components/yong/ContainerStyle';
import api from '@/utils/axios';
import axios from 'axios';

// API 응답 타입 정의
type Engineer = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark: string;
};

type EngineerPay = {
  id: number;
  engineerId: number;
  date: string;
  daily_amount: number;
};

type EngineerPayDay = {
  id: number;
  engineerId: number;
  weekdays: string;
  is_pay: boolean;
};

type EngineerCommissionRate = {
  id: number;
  engineerId: number;
  rateId: number;
};

// 통합된 기사 정보 타입
type EngineerWithDetails = {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark: string;
  commission_rate: number;
  payday: string;
  is_paid: boolean;
  daily_earnings: Array<{
    date: string;
    daily_amount: number;
  }>;
};

// API 응답 타입
type ApiResponse = {
  engineer: Engineer[];
  engineerPay: EngineerPay[];
  engineerPayDay: EngineerPayDay[];
  EngineerCommissionRates: EngineerCommissionRate[];
};

type FooterItem = {
  label: string;
  value: string | number | boolean;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
  renderValue?: (value: any) => React.ReactNode;
};

const Page = () => {
  const [selectedEngineer, setSelectedEngineer] = useState<EngineerWithDetails | null>(null);
  const [editedEngineer, setEditedEngineer] = useState<EngineerWithDetails | null>(null);
  const [engineers, setEngineers] = useState<EngineerWithDetails[]>([]);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        console.log('Fetching engineers...');
        const response = await api.get<ApiResponse>('engineer-info/getAll');
        console.log('Raw API Response:', response.data);

        const {
          engineer,
          engineerPay,
          engineerPayDay,
          EngineerCommissionRates
        } = response.data;

        console.log('Engineer Data:', engineer);
        console.log('Engineer Pay Data:', engineerPay);
        console.log('Engineer PayDay Data:', engineerPayDay);
        console.log('Commission Rates Data:', EngineerCommissionRates);

        const processedEngineers: EngineerWithDetails[] = engineer.map((eng) => {
          const payments = engineerPay.filter(
            (pay) => pay.engineerId === eng.id
          );
          console.log(`Payments for engineer ${eng.id}:`, payments);

          const payDay = engineerPayDay.find(
            (day) => day.engineerId === eng.id
          );
          console.log(`PayDay for engineer ${eng.id}:`, payDay);

          const commission = EngineerCommissionRates.find(
            (rate) => rate.engineerId === eng.id
          );
          console.log(`Commission for engineer ${eng.id}:`, commission);

          const processed = {
            id: eng.id,
            name: eng.name,
            phoneNumber: eng.phoneNumber,
            location: eng.location,
            remark: eng.remark,
            commission_rate: commission ? commission.rateId : 50,
            payday: payDay ? payDay.weekdays : '월요일',
            is_paid: payDay ? payDay.is_pay : false,
            daily_earnings: payments.map((pay) => ({
              date: pay.date,
              daily_amount: pay.daily_amount
            }))
          };
          console.log(`Processed engineer ${eng.id}:`, processed);
          return processed;
        });

        setEngineers(processedEngineers);
      } catch (error) {
        console.error('기사 정보 조회 실패:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
        }
      }
    };

    fetchEngineers();
  }, []);

  useEffect(() => {
    if (selectedEngineer) {
      const newEvents: CalendarEventType[] = selectedEngineer.daily_earnings.map((earning) => {
        const date = new Date(earning.date);

        return {
          title: `${earning.daily_amount.toLocaleString()}원`,
          start: date,
          end: date,
          allDay: true,
          amount: earning.daily_amount,
          user: selectedEngineer.name,
        };
      });
      setEvents(newEvents);
      setEditedEngineer(selectedEngineer);
    }
  }, [selectedEngineer]);

  const calculateWageAmount = (engineer: EngineerWithDetails): number => {
    const totalWage = engineer.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
    return Math.round(totalWage * (engineer.commission_rate / 100));
  };

  const handleWorkerSelect = (engineer: EngineerWithDetails) => {
    setSelectedEngineer(engineer);
    setOpen(false);
  };

  const handleEditToggle = async () => {
    if (isEditing && editedEngineer) {
      try {
        await api.put(`/engineer-info/${editedEngineer.id}`, {
          commission_rate: editedEngineer.commission_rate,
          is_paid: editedEngineer.is_paid,
          daily_earnings: editedEngineer.daily_earnings,
        });
        setSelectedEngineer(editedEngineer);
      } catch (error) {
        console.error('기사 정보 수정 실패:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const getEditableFooterData = (engineer: EngineerWithDetails): FooterItem[] => {
    const totalWage = engineer.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
    const wageAmount = calculateWageAmount(engineer);

    return [
      {
        label: '합계 급여',
        value: `${totalWage.toLocaleString()}원`,
        isEditable: true,
        onValueChange: async (value) => {
          if (editedEngineer) {
            const newEngineer = { ...editedEngineer };
            const ratio = parseInt(value) / totalWage;
            newEngineer.daily_earnings = newEngineer.daily_earnings.map((dp) => ({
              ...dp,
              daily_amount: Math.round(dp.daily_amount * ratio),
            }));
            setEditedEngineer(newEngineer);
          }
        },
      },
      { label: '수당률', value: `${engineer.commission_rate}%` },
      {
        label: '수당 금액',
        value: `${wageAmount.toLocaleString()}원`,
        isEditable: true,
        onValueChange: async (value) => {
          if (editedEngineer) {
            const newRate = Math.round((parseInt(value) / totalWage) * 100);
            setEditedEngineer({
              ...editedEngineer,
              commission_rate: newRate,
            });
          }
        },
      },
      { label: '지급일', value: engineer.payday },
      { label: '전화번호', value: engineer.phoneNumber },
      { label: '주소', value: engineer.location },
      { label: '특이사항', value: engineer.remark },
      {
        label: '지급 여부',
        value: engineer.is_paid,
        renderValue: (value) => (
          <ShaCheckbox
            isChecked={value as boolean}
            onChange={async (checked) => {
              if (editedEngineer) {
                try {
                  await api.put(`/engineer-info/${editedEngineer.id}/payment-status`, {
                    is_paid: checked,
                  });
                  setEditedEngineer({
                    ...editedEngineer,
                    is_paid: checked,
                  });
                } catch (error) {
                  console.error('지급 상태 변경 실패:', error);
                }
              }
            }}
          />
        ),
      },
    ];
  };

  return (
    <div className="p-3 h-screen w-full">
      <div className="mb-3">
        <WorkerDrawer
          engineers={engineers}
          onEngineerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>

      {selectedEngineer && (
        <div className="w-full h-screen flex flex-col gap-5">
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            {selectedEngineer.name}님의 근무 일정
          </h2>

          <StyledCalendarContainer className="flex-grow min-h-[700px] mb-3">
            <ACalendar
              events={events}
              onEventSelect={(event) => console.log('Selected event:', event)}
            />
          </StyledCalendarContainer>

          <div className="w-full max-w-[1400px] mx-auto mt-auto">
            <AFooter
              data={getEditableFooterData(editedEngineer || selectedEngineer)}
              isEditing={isEditing}
            />
            <div className="flex justify-center gap-2 mt-4">
              <ShaButton text={isEditing ? '저장' : '수정'} onClick={handleEditToggle} />
              {isEditing && (
                <ShaButton
                  text="취소"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedEngineer(selectedEngineer);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;