import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ko';
import { DatePickerProps, MIN_DATE, TODAY } from '../ts/BEditScheduleDef';

/**
 * @param label 일정 선택 문자열로 타입 고정 되어있음
 * @param value MIN_DATE - 현재 날짜(yy년 mm월 dd일) static변수로 기본값 설정되어 있음
 * @param handleChange 달력에서 일정선택 시 상태변화 추적함수 전달
 * @returns MUI DatePicker 컴포넌트 반환
 */
const CDatePicker = ({
  label = '일정 선택',
  value = MIN_DATE,
  mindateValue = TODAY,
  handleChange,
}: DatePickerProps) => {
  dayjs.locale('ko');

  // null을 undefined로 변환() minDate안에 null타입이 안들어가서)
  const minDate = mindateValue ?? undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          views={['year', 'month', 'day']}
          slotProps={{
            textField: {
              placeholder: '연 / 월 / 일',
              size: 'small',
            },
          }}
          label={label}
          format="YYYY년 MM월 DD일"
          defaultValue={value}
          onChange={handleChange}
          minDate={minDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CDatePicker;
