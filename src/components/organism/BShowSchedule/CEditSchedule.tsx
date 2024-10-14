/* eslint-disable react/no-children-prop */

import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import {
  CustomerInfo,
  engineerInfo,
  StyledScheduleTimeline,
  StyledTimeSlot,
  TODAY,
} from './ts/BEditScheduleDef';
import { dummyCustomers, dummyEngineers } from './ts/editDummy';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from './ts/theme';
import CDatePicker from './molecules/CDatePicker';
import CShowList from './molecules/CShowList';
import CDateCustomer from './molecules/CDateCustomer';
import CDateEngineer from './molecules/CDateEngineer';
import CShowEngineerInfo from './molecules/CShowEngineerInfo';
import CTimeSubmit from './molecules/CTimeSubmit';

const CEditSchedule = () => {
  // 이것도 한번에 관리? 고민..
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(TODAY);
  const [selectEng, setSelectEng] = useState<engineerInfo | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [selectCustomer, setSelectCustomer] = useState<CustomerInfo | null>(null);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerInfo[]>([]);
  const [filteredEngineers, setFilteredEngineers] = useState<engineerInfo[]>([]);

  const handleSelect = (date: Dayjs | null) => {
    setSelectedDate(date);
    setSelectEng(null);
  };
  const handleSelectEngineer = (engineer: engineerInfo) => {
    setSelectEng(engineer);
    console.log('선택한 기사 정보: ', engineer);
  };
  const handleStartTime = (time: Dayjs | null) => {
    setStartTime(time);
    console.log('시작 시간: ', time);
  };
  const handleEndTime = (time: Dayjs | null) => {
    setEndTime(time);
    console.log('종료 시간: ', time);
  };
  const handleSelectCustomer = (customer: CustomerInfo) => {
    setSelectCustomer(customer);
    console.log('선택한 고객 정보', customer);
  };

  const handleButtonClick = async () => {
    if (!selectedDate) {
      alert('날짜를 선택하세요');
      return;
    } else if (!handleSelectCustomer) {
      alert('주문을 선택하세요');
      return;
    } else if (!selectEng) {
      alert('담당 기사를 선택하세요');
      return;
    } else if (!startTime || !endTime) {
      alert('시간을 선택하세요');
      return;
    }

    const requestData = {
      selectedCustomer: selectCustomer,
      selectedEngineer: selectEng,
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
    };

    try {
      const response = await fetch(`/api/submitSchedule/`, {
        // post..
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        alert('예약 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('예약 등록 중 오류 발생:', error);
      alert('서버에 오류가 발생했습니다.');
    }

    //추후 수정
  };

  const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
  const formattedDay = selectedDate ? selectedDate.locale('ko').format('ddd') : '';

  useEffect(() => {
    const customerData = dummyCustomers.filter(
      (customer) => customer.appointmentDate === formattedDate
    );
    setFilteredCustomers(customerData);

    const engineerData = dummyEngineers.filter(
      (engineer) =>
        engineer.engineerClosedDate !== formattedDate &&
        engineer.engineerWorkDay.split(',').includes(formattedDay)
    );
    setFilteredEngineers(engineerData);
    setSelectEng(null);
  }, [selectedDate, formattedDate, formattedDay]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '1200px', marginLeft: 3, ...StyledScheduleTimeline }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CDatePicker value={selectedDate} handleChange={handleSelect} />
        </Box>

        <Box sx={{ ...StyledTimeSlot }}>
          <CShowList
            label="주문 목록"
            children={
              <CDateCustomer
                selectDate={formattedDate}
                orderInfo={filteredCustomers}
                onCustomerClick={handleSelectCustomer}
              />
            }
          />
          <CShowList
            label="기사 목록"
            children={
              <CDateEngineer
                selectDate={formattedDate}
                selectDay={formattedDay}
                engineer={filteredEngineers}
                onEngineerClick={handleSelectEngineer}
              />
            }
          />
          <CShowList label="기사 상세 정보" children={<CShowEngineerInfo engineer={selectEng} />} />
          <CShowList
            label="예약 시간"
            children={
              <CTimeSubmit
                timeprops={{
                  handleStart: handleStartTime,
                  handleEnd: handleEndTime,
                  startValue: startTime,
                  endValue: endTime,
                }}
                handleClick={handleButtonClick}
              />
            }
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CEditSchedule;
