'use client';

import React from 'react';
import AFooter from '@/components/molecules/datagrid/AFooter';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import ACalendar from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import { StyledCalendarContainer } from '@/components/yong/ContainerStyle';
import { useEngineer } from '@/utils/engineerUtils/useEngineer';
import { useEngineerFooter } from '@/utils/engineerUtils/useEngineerFooter';


const Page = () => {
  const {
    selectedEngineer,
    editedEngineer,
    setEditedEngineer,
    engineers,
    open,
    events,
    isEditing,
    setOpen,
    handleWorkerSelect,
    handleEditToggle,
    handleEditCancel,
  } = useEngineer();

  const { getFooterData } = useEngineerFooter(
    selectedEngineer || editedEngineer!,
    editedEngineer,
    setEditedEngineer
  );

  if (!selectedEngineer) {
    return (
      <div className="p-3 h-screen w-full">
        <WorkerDrawer
          engineers={engineers}
          onEngineerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  }

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
            data={getFooterData()}
            isEditing={isEditing}
          />
          <div className="flex justify-center gap-2 mt-4">
            <ShaButton 
              text={isEditing ? '저장' : '수정'} 
              onClick={handleEditToggle} 
            />
            {isEditing && (
              <ShaButton
                text="취소"
                onClick={handleEditCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;