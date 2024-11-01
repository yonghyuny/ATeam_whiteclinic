import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import {
  EditOrderCustomerFormData,
  EditOrderCustomerFormValues,
} from '@/constants/schedule/EditOrderCustomer';
import {
  ShaEngTimeEditFormData,
  ShaEngTimeEditFormValues,
} from '@/constants/schedule/ShaEngTimeEdit';
import { ShaSalesInfoFormData } from '@/constants/ShaSalesInfoFormData';
import { CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import ShaSalesInfo from '../Customer/ShaSalesInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { engineerData, orderData } from '@/constants/schedule/scheduleDummy';

type AEditOrderInfoType = {
  selectTime: Date | null;
  selectCustomerId: number | null;
  selectOrderId: number | null;
  engineerId: number | null;
};

const AEditOrderInfo = ({
  selectTime,
  selectCustomerId,
  selectOrderId,
  engineerId,
}: AEditOrderInfoType) => {
  const [formValues, setFormValues] = useState<ShaEngTimeEditFormValues>({
    reservationDateTime: selectTime,
    engineerId: engineerId,
    engineerName: '',
  });

  const [customerFormValues, setCustomerFormValues] = useState<EditOrderCustomerFormValues>({
    customerId: selectCustomerId || 0,
    customerName: '',
    customerTel: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: '',
    payment: '',
  });
  //const [formValues, setFormValues] = useState<ShaEngTimeEditFormValues | null>(null);
  //const [customerFormValues, setCustomerFormValues] = useState<EditOrderCustomerFormValues | null>(
  //  null
  //);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  useEffect(() => {
    // 선택된 엔지니어 정보를 가져옵니다.
    const selectedEngineer = engineerData.find((engineer) => Number(engineer.id) === engineerId);
    if (selectedEngineer) {
      setFormValues({
        // 필요한 필드만 포함하도록 수정
        reservationDateTime: selectTime, // 이 필드를 설정하려면 `ShaEngTimeEditFormValues` 타입에 포함되어야 합니다.
        engineerId: Number(selectedEngineer.id), // 선택된 엔지니어의 ID를 설정
        engineerName: selectedEngineer.name, // 엔지니어의 이름 설정
        // 필요에 따라 다른 필드도 설정
      });
    }

    // 선택된 주문 정보를 가져옵니다.
    const selectedOrder = orderData.find((order) => Number(order.id) === selectOrderId);
    if (selectedOrder) {
      setCustomerFormValues({
        customerId: Number(selectedOrder.id),
        customerName: selectedOrder.name,
        customerTel: selectedOrder.phoneNumber,
        address: selectedOrder.address,
        uniqueDetails: selectedOrder.uniqueDetails,
        document: selectedOrder.document,
        published: selectedOrder.published,
        payment: selectedOrder.payment,
      });
    }
  }, [engineerId, selectOrderId]);

  const handleFieldChange = (fieldName: keyof ShaEngTimeEditFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };
  const handleCustomerFieldChange = (fieldName: keyof EditOrderCustomerFormValues, value: any) => {
    setCustomerFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="flex gap-4">
      <Card className="w-[800px] shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">스케쥴 수정하기</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={ShaEngTimeEditFormData(formValues, handleFieldChange)}
          />
        </CardContent>

        <CardContent className="pt-6 px-6">
          <ShaInfoForm
            ShaTitledFormControlProps={EditOrderCustomerFormData(
              customerFormValues,
              handleCustomerFieldChange,
              isSubmitAttempted
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AEditOrderInfo;
