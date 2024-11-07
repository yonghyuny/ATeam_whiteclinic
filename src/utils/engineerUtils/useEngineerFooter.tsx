
import { ReactNode, useCallback } from 'react';
import { Engineer, FooterItem } from '@/constants/yh/EngineerTypeData';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { calculateNewDailyEarnings, calculateWageAmount, getTotalWage } from './engineerUtils';
import { engineerService } from './engineerService';



export const useEngineerFooter = (
  engineer: Engineer,
  editedEngineer: Engineer | null,
  setEditedEngineer: (engineer: Engineer | null) => void
) => {
  const handleTotalWageChange = useCallback(async (value: string) => {
    if (!editedEngineer) return;

    const currentTotal = getTotalWage(engineer);
    const newTotal = parseInt(value);
    
    const newDailyEarnings = calculateNewDailyEarnings(
      editedEngineer.daily_earnings,
      newTotal,
      currentTotal
    );

    setEditedEngineer({
      ...editedEngineer,
      daily_earnings: newDailyEarnings
    });
  }, [editedEngineer, engineer, setEditedEngineer]);

  const handleCommissionChange = useCallback(async (value: string) => {
    if (!editedEngineer) return;

    const totalWage = getTotalWage(engineer);
    const newRate = Math.round((parseInt(value) / totalWage) * 100);

    setEditedEngineer({
      ...editedEngineer,
      commission_rate: newRate
    });
  }, [editedEngineer, engineer, setEditedEngineer]);

  const handlePaymentStatusChange = useCallback(async (checked: boolean) => {
    if (!editedEngineer) return;

    try {
      await engineerService.updatePaymentStatus(editedEngineer.id, checked);
      setEditedEngineer({
        ...editedEngineer,
        is_paid: checked
      });
    } catch (error) {
      console.error('지급 상태 변경 실패:', error);
    }
  }, [editedEngineer, setEditedEngineer]);

  const getFooterData = useCallback((): FooterItem[] => {
    const totalWage = getTotalWage(engineer);
    const wageAmount = calculateWageAmount(engineer);

    return [
      {
        label: '합계 급여',
        value: `${totalWage.toLocaleString()}원`,
        isEditable: true,
        onValueChange: handleTotalWageChange,
      },
      { 
        label: '수당률', 
        value: `${engineer.commission_rate}%` 
      },
      {
        label: '수당 금액',
        value: `${wageAmount.toLocaleString()}원`,
        isEditable: true,
        onValueChange: handleCommissionChange,
      },
      { label: '지급일', value: engineer.payday },
      { label: '전화번호', value: engineer.phone_number },
      { label: '주소', value: engineer.location },
      { label: '특이사항', value: engineer.remark },
      {
        label: '지급 여부',
        value: engineer.is_paid,
        renderValue: ((value: string | number | boolean): ReactNode => {
          return (
            <ShaCheckbox
              isChecked={Boolean(value)}
              onChange={handlePaymentStatusChange}
            />
          );
        }) as (value: string | number | boolean) => ReactNode,
      },
    ];
  }, [
    engineer,
    handleTotalWageChange,
    handleCommissionChange,
    handlePaymentStatusChange
  ]);

  return { getFooterData };
};