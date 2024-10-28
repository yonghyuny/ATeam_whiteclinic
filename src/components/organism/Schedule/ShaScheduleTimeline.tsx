import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ShaGenerateTableRows from './ShaGenerateTableRows';
import { Order } from '@/constants/ScheduleType';

//스케쥴 보기 column 지정
type ShaScheduleTimelineProps = {
  scheduleData: Order[]; // Order[]로 타입을 수정
};

const ShaScheduleTimeline = ({ scheduleData }: ShaScheduleTimelineProps) => {
  const tableRows = <ShaGenerateTableRows scheduleData={scheduleData} />;

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-gray-50">Time Slot</TableHead>
            <TableHead>고객명</TableHead>
            <TableHead>주소</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>세탁품목</TableHead>
            <TableHead>세탁대수</TableHead>
            <TableHead>가격</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </div>
  );
};

export default ShaScheduleTimeline;
