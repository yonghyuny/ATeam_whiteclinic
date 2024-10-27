'use client';

import React, { useState, useEffect } from 'react';
import { WorkerInfo, WorkerProps } from '@/constants/Workers';
import AFooter from '@/components/molecules/datagrid/AFooter';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import ACalendar from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { StyledCalendarContainer } from '@/components/yong/ContainerStyle';

type FooterItem = {
  label: string;
  value: string | number | boolean;
  renderValue?: (value: string | number | boolean) => React.ReactNode;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
};

const calculateWageAmount = (worker: WorkerProps): number => {
  const totalWage = worker.datePay?.reduce((sum, dp) => sum + parseInt(dp.pay), 0) || 0;
  const percentageRate = parseInt(worker.percent) / 100;
  return Math.round(totalWage * percentageRate);
};

const Page = () => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerProps | null>(null);
  const [editedWorker, setEditedWorker] = useState<WorkerProps | null>(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedWorker) {
      setEditedWorker(selectedWorker);
      const newEvents = selectedWorker.datePay.map((dp) => {
        const dateStr = dp.date;
        const month = parseInt(dateStr.match(/(\d+)월/)![1]) - 1;
        const day = parseInt(dateStr.match(/(\d+)일/)![1]);
        const date = new Date(2024, month, day);

        const pay = parseInt(dp.pay.replace('원', ''));

        return {
          title: `${pay.toLocaleString()}원`,
          start: date,
          end: date,
          allDay: true,
          pay: pay,
        };
      });
      setEvents(newEvents);
    }
  }, [selectedWorker]);

  const handleWorkerSelect = (worker: WorkerProps) => {
    setSelectedWorker(worker);
    setOpen(false);
  };

  const handleEventAdd = (event: any) => {
    console.log('New event:', event);
  };

  const handleEventSelect = (event: any) => {
    console.log('Selected event:', event);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 수정 완료 로직
      setSelectedWorker(editedWorker);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const getEditableFooterData = (worker: WorkerProps): FooterItem[] => {
    const totalWage = worker.datePay?.reduce((sum, dp) => sum + parseInt(dp.pay), 0) || 0;
    const wageAmount = calculateWageAmount(worker);

    return [
      {
        label: '합계 급여',
        value: `${totalWage.toLocaleString()}원`,
        isEditable: true,
        onValueChange: (value) => {
          if (editedWorker) {
            const newWorker = { ...editedWorker };
            // 합계 급여가 변경되면 각 일자별 급여를 비율에 맞게 조정
            const ratio = parseInt(value) / totalWage;
            newWorker.datePay = newWorker.datePay.map((dp) => ({
              ...dp,
              pay: Math.round(parseInt(dp.pay) * ratio).toString(),
            }));
            setEditedWorker(newWorker);
          }
        },
      },
      { label: '수당률', value: worker.percent },
      {
        label: '수당 금액',
        value: `${wageAmount.toLocaleString()}원`,
        isEditable: true,
        onValueChange: (value) => {
          if (editedWorker) {
            const newWorker = { ...editedWorker };
            // 수당 금액이 변경되면 수당률을 재계산
            const newRate = Math.round((parseInt(value) / totalWage) * 100);
            newWorker.percent = newRate.toString();
            setEditedWorker(newWorker);
          }
        },
      },
      { label: '지급일', value: worker.payday },
      { label: '전화번호', value: worker.tel },
      { label: '주소', value: worker.address },
      { label: '가능 품목', value: worker.available.join(', ') },
      {
        label: '지급 여부',
        value: worker.ispaid,
        renderValue: (value) => (
          <ShaCheckbox
            isChecked={value as boolean}
            onChange={(checked) => {
              if (editedWorker) {
                setEditedWorker({
                  ...editedWorker,
                  ispaid: checked,
                });
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
          WorkerInfo={WorkerInfo}
          onWorkerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>

      {selectedWorker && (
        <div className="w-full h-screen flex flex-col gap-5">
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            {selectedWorker.name}님의 근무 일정
          </h2>

          <StyledCalendarContainer className="flex-grow min-h-[700px] mb-3">
            <ACalendar
              events={events}
              onEventAdd={handleEventAdd}
              onEventSelect={handleEventSelect}
            />
          </StyledCalendarContainer>

          <div className="w-full max-w-[1400px] mx-auto mt-auto">
            <AFooter
              data={getEditableFooterData(editedWorker || selectedWorker)}
              isEditing={isEditing}
            />
            <div className="flex justify-center gap-2 mt-4">
              <ShaButton text={isEditing ? '저장' : '수정'} onClick={handleEditToggle} />
              {isEditing && (
                <ShaButton
                  text="취소"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedWorker(selectedWorker);
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
