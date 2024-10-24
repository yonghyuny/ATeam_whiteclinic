'use client';

import ADataGrid from '@/components/molecules/datagrid/ADataGrid';

import { CustomerInfo } from '@/constants/CustomerInfo';
import { customerColumns } from '@/constants/yh/ColumnData';

const Page = () => {
  const rows = Object.entries(CustomerInfo).map(([key, customer]) => ({
    id: key,
    ...customer,
  }));

  const customerDataProps = {
    rows,
    columns: customerColumns,
    title: `고객 정보`,
  };

  return (
    // p-6 대신 p-4나 p-2로 패딩을 줄여볼 수 있습니다
    <div className="w-full flex justify-center p-4">
      {/* overflow-y-auto만 남기고 width를 full로 변경 */}
      <div className="w-full overflow-y-auto">
        <ADataGrid {...customerDataProps} />
      </div>
    </div>
  );
};

export default Page;
