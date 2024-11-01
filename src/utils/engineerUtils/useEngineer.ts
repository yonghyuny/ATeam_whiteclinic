import { useState, useEffect } from 'react';

import axios from 'axios';
import { Engineer } from '@/constants/yh/EngineerTypeData';
import { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import { engineerService } from './engineerService';
import { createCalendarEvents, processEngineerData } from './engineerUtils';

export const useEngineer = () => {
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [editedEngineer, setEditedEngineer] = useState<Engineer | null>(null);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await engineerService.getAllEngineers();
        const { engineer, engineerPay, engineerPayDay, EngineerCommissionRates } = response.data;

        const processedEngineers = engineer.map((eng) => 
          processEngineerData(eng, engineerPay, engineerPayDay, EngineerCommissionRates)
        );

        setEngineers(processedEngineers);
      } catch (error) {
        console.error('기사 정보 조회 실패:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        }
      }
    };

    fetchEngineers();
  }, []);

  useEffect(() => {
    if (selectedEngineer) {
      const newEvents = createCalendarEvents(selectedEngineer);
      setEvents(newEvents);
      setEditedEngineer(selectedEngineer);
    }
  }, [selectedEngineer]);

  const handleWorkerSelect = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setOpen(false);
  };

  const handleEditToggle = async () => {
    if (isEditing && editedEngineer) {
      try {
        await engineerService.updateEngineer(editedEngineer.id, {
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

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedEngineer(selectedEngineer);
  };

  return {
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
  };
};