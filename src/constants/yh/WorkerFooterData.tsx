import { WorkerProps } from '@/constants/Workers';
import { FooterItem } from '@/components/molecules/datagrid/AFooter';
import ACheckbox from '@/components/atom/CheckBox/ACheckbox';

const calculateWageAmount = (worker: WorkerProps): number => {
  const totalWage = worker.datePay?.reduce((sum, dp) => sum + parseInt(dp.pay), 0) || 0;
  const percentageRate = parseInt(worker.percent) / 100;
  return Math.round(totalWage * percentageRate);
};

export const getFooterData = (worker: WorkerProps): FooterItem[] => {
  const totalWage = worker.datePay?.reduce((sum, dp) => sum + parseInt(dp.pay), 0) || 0;
  const wageAmount = calculateWageAmount(worker);

  return [
    { label: '합계 급여', value: `${totalWage.toLocaleString()}원` },
    { label: '수당률', value: worker.percent },
    { label: '수당 금액', value: `${wageAmount.toLocaleString()}원` },
    { label: '지급일', value: worker.payday },
    { label: '전화번호', value: worker.tel },
    { label: '주소', value: worker.address },
    { label: '가능 품목', value: worker.available.join(', ') },
    {
      label: '지급 여부',
      value: worker.ispaid,
      renderValue: (value) => (
        <ACheckbox
          isChecked={value as boolean}
          onChange={(event) => {
            // 여기에 체크박스 상태 변경 로직을 추가합니다.
            console.log(`클릭`);
          }}
        />
      ),
    },
  ];
};
