import ADropdown from '@/components/atom/DropdownBox/ADropdown';
import { MonthsPlan } from '@/constants/MonthsPlan';

const AMonthPlan = () => {
  const MonthsPlanOption = MonthsPlan.map((month) => ({ text: month, value: month }));

  return <ADropdown label="" options={MonthsPlanOption} width="medium" />;
};

export default AMonthPlan;
