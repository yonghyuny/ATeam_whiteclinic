'use client';

import { useState, useEffect } from 'react';
import { EngineerData, generateEngineerData } from '@/constants/Engineer';

export const useEngineerLabel = () => {
  const [engineerData, setEngineerData] = useState<EngineerData | null>(null);
  const [localData, setLocalData] = useState<EngineerData | null>(null);

  useEffect(() => {
    const initialData = generateEngineerData();
    setEngineerData(initialData);
    setLocalData(initialData);
  }, []);

  useEffect(() => {
    setLocalData(engineerData);
  }, [engineerData]);

  const handleInputChange = (key: string, value: string) => {
    setLocalData((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const handleSkillChange = (skill: string) => {
    setLocalData((prev) => {
      if (!prev) return null;
      const updatedItems = prev.items.includes(skill)
        ? prev.items.filter((item) => item !== skill)
        : [...prev.items, skill];
      return { ...prev, items: updatedItems };
    });
  };

  const handleSave = () => {
    if (localData) {
      setEngineerData(localData);
    }
  };

  const handleCancel = () => {
    setLocalData(engineerData);
  };

  return {
    localData,
    handleInputChange,
    handleSkillChange,
    handleSave,
    handleCancel,
  };
};
