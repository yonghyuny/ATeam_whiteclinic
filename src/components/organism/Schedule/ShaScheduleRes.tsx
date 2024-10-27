'use client';

import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { engineerData, orderData } from '@/constants/scheduleDummy';
import { useEffect, useState } from 'react';
import ShaTitledFormControl from '@/components/molecules/Form/ShaTitledFormControl';
import {
  EngineerInfo,
  OrderInfo,
  ShaScheduleResFormData,
  ShaScheduleResFormValues,
} from '@/constants/ShaScheduleResForm';

//예약 정보 등록하기 컴포넌트

//!!아직 코드 안나눔 + 리팩토링 안함!!

// 주문 정보 타입 정의
type Order = {
  id: string;
  details: string;
  startTime: string;
  endTime: string;
  engineerId: string | null;
};

// 엔지니어 정보 타입 정의
type Engineer = {
  id: string;
  name: string;
  isHoliday: boolean;
  availability: boolean;
  orders: { id: string; startTime: string; endTime: string }[];
};

const fetchOrderData = async (selectedDate: Date): Promise<OrderInfo[]> => {
  return orderData
    .filter((order) => {
      const orderDate = new Date(order.startTime).toDateString();
      return new Date(selectedDate).toDateString() === orderDate;
    })
    .map((order) => ({
      id: order.id,
      name: order.details,
      phoneNumber: order.phoneNumber, // 더미 데이터 필요
      address: order.address, // 더미 데이터 필요
      uniqueDetails: order.uniqueDetails, // 더미 데이터 필요
      startTime: order.startTime, // startTime 속성 추가
      endTime: order.endTime, // endTime 속성 추가
    }));
};

const fetchEngineerData = async (
  selectedDate: Date,
  selectedOrder: string
): Promise<EngineerInfo[]> => {
  const order = orderData.find((o) => o.id === selectedOrder);
  if (!order) return [];

  return engineerData
    .filter((engineer) => {
      return !engineer.isHoliday && !engineerHasOrderAtTime(engineer, order);
    })
    .map((engineer) => ({
      id: engineer.id,
      name: engineer.name,
      phoneNumber: engineer.phoneNumber,
      Items: engineer.Items,
      specialNotes: engineer.specialNotes,
      availability: engineer.availability,
      orders: engineer.orders, // orders 속성 추가
    }));
};

const engineerHasOrderAtTime = (engineer: Engineer, selectedOrder: Order) => {
  const orderStartTime = new Date(selectedOrder.startTime);
  const orderEndTime = new Date(selectedOrder.endTime);

  return engineer.orders.some((order) => {
    const engineerOrderStartTime = new Date(order.startTime);
    const engineerOrderEndTime = new Date(order.endTime);

    return (
      (orderStartTime >= engineerOrderStartTime && orderStartTime <= engineerOrderEndTime) ||
      (orderEndTime >= engineerOrderStartTime && orderEndTime <= engineerOrderEndTime)
    );
  });
};

const ShaScheduleRes = () => {
  const [formValues, setFormValues] = useState<ShaScheduleResFormValues>({
    reservationDateTime: null,
    customerName: '',
    selectedOrder: '',
    engineerName: '',
  });

  const [orderOptions, setOrderOptions] = useState<OrderInfo[]>([]);
  const [engineerOptions, setEngineerOptions] = useState<EngineerInfo[]>([]);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  useEffect(() => {
    if (formValues.reservationDateTime) {
      fetchOrderData(formValues.reservationDateTime).then((orders) => {
        const filteredOrders = orders.filter((order) => !order.engineerId);
        setOrderOptions(filteredOrders);
      });
    }
  }, [formValues.reservationDateTime]);

  useEffect(() => {
    if (formValues.reservationDateTime && formValues.selectedOrder) {
      fetchEngineerData(formValues.reservationDateTime, formValues.selectedOrder).then(
        (engineers) => {
          setEngineerOptions(engineers);
        }
      );
    }
  }, [formValues.reservationDateTime, formValues.selectedOrder]);

  const handleFieldChange = (fieldName: keyof ShaScheduleResFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const resetFormValues = () => {
    setFormValues({
      reservationDateTime: null,
      customerName: '',
      selectedOrder: '',
      engineerName: '',
    });
    setOrderOptions([]);
    setEngineerOptions([]);
    setIsSubmitAttempted(false);
  };

  const isFormValid = () => {
    return formValues.selectedOrder !== '' && formValues.engineerName !== '';
  };

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (isFormValid()) {
      console.log('등록된 정보:', formValues);
      resetFormValues();
    }
  };

  const formData = ShaScheduleResFormData(
    formValues,
    handleFieldChange,
    orderOptions,
    engineerOptions,
    isSubmitAttempted
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">스케쥴 등록</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <div className="flex flex-col gap-7">
            {formData.map((formField, index) => (
              <ShaTitledFormControl key={index} {...formField} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: resetFormValues,
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '등록',
              onClick: handleSubmit,
              disabled: !isFormValid(),
              size: 'lg',
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShaScheduleRes;
