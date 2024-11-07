import { ReactNode, useCallback } from 'react';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { Engineer, EngineerDailyEarning, FooterItem } from '@/constants/yh/EngineerTypeData';
import { engineerService } from './engineerService';

export const useEngineerFooter = (
  engineer: Engineer,
  editedEngineer: Engineer | null,
  setEditedEngineer: (engineer: Engineer | null) => void
) => {
  const getTotalWage = (eng: Engineer): number => {
    return eng.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
  };

  const calculateWageAmount = (eng: Engineer): number => {
    if (!eng || !eng.commission_rate) return 0; // null 체크 추가

    const totalWage = getTotalWage(eng);
    // commission_rate.commission_rate_id를 직접 사용
    return Math.round(totalWage * (eng.commission_rate.commission_rate_id / 100));
  };

  const calculateNewDailyEarnings = (
    dailyEarnings: EngineerDailyEarning[],
    newTotalAmount: number,
    currentTotal: number
  ): EngineerDailyEarning[] => {
    const ratio = newTotalAmount / currentTotal;
    return dailyEarnings.map((dp) => ({
      ...dp,
      daily_amount: Math.round(dp.daily_amount * ratio),
    }));
  };

  const handleTotalWageChange = useCallback(
    async (value: string) => {
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
        daily_earnings: newDailyEarnings,
      });
    },
    [editedEngineer, engineer, setEditedEngineer]
  );

  const handlePaymentStatusChange = useCallback(
    async (checked: boolean) => {
      if (!editedEngineer) return;

      try {
        await engineerService.updatePaymentStatus(editedEngineer.engineer_id, checked);
        setEditedEngineer({
          ...editedEngineer,
          is_paid: checked,
        });
      } catch (error) {
        console.error('지급 상태 변경 실패:', error);
      }
    },
    [editedEngineer, setEditedEngineer]
  );

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
        value: `${engineer.commission_rate.commission_rate_id}%`, // commission_rate_id 직접 사용
      },
      {
        label: '수당 금액',
        value: `${wageAmount.toLocaleString()}원`,
      },
      {
        label: '지급 여부',
        value: engineer.is_paid,
        renderValue: ((value: boolean): ReactNode => (
          <ShaCheckbox isChecked={value} onChange={handlePaymentStatusChange} />
        )) as (value: string | number | boolean) => ReactNode,
      },
      { label: '전화번호', value: engineer.phone_number },
      { label: '주소', value: engineer.location },
      { label: '특이사항', value: engineer.remark || '' },
    ];
  }, [engineer, handleTotalWageChange, handlePaymentStatusChange]);

  return { getFooterData };
};
