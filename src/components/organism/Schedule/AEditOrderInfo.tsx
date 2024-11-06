import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
import { SalesFormData } from '../Customer/ShaSalesInfo';
import { productCategories } from '@/constants/productCategory';
import { dummyEngineers, dummyOrders } from '@/constants/schedule/scheduleDummy';
import { SalesType } from '@/constants/schedule/ScheduleType';

type AEditOrderInfoType = {
  selectTime: Date | null;
  selectCustomerId: number | null;
  selectOrderId: number | null;
  engineerId: number | null;
};

type ProductCategoryKey = keyof typeof productCategories;

const AEditOrderInfo = ({
  selectTime,
  selectCustomerId,
  selectOrderId,
  engineerId,
}: AEditOrderInfoType) => {
  //예약 시간, 기사 이름
  const [formValues, setFormValues] = useState<ShaEngTimeEditFormValues>({
    reservationDateTime: selectTime || new Date(),
    engineerId: engineerId || null,
    engineerName: '',
  });

  //고객 정보
  const [customerFormValues, setCustomerFormValues] = useState<EditOrderCustomerFormValues>({
    customerId: selectCustomerId || 0,
    customerName: '',
    customerTel: '',
    address: '',
    uniqueDetails: '',
    document: '',
    published: false,
    payment: '',
  });

  //세척 물품 정보
  const [salesFormValues, setSalesFormValues] = useState<SalesType>({
    orderId: selectOrderId || 0,
    selectedCategory: '',
    selectedDropdownValue: '',
    itemCount: 1,
    discountAmount: 0,
    finalPrice: 0,
    uniqueDetails: '',
    customProduct: '',
    isDiscountApplied: false,
    isFinalPriceManual: false,
  });

  //등록 버튼 클릭 여부
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  useEffect(() => {
    // 선택된 엔지니어 정보를 가져옵니다.
    if (engineerId) {
      const selectedEngineer = dummyEngineers.find(
        (engineer) => Number(engineer.engineerId) === engineerId
      );
      if (selectedEngineer) {
        setFormValues((prev) => ({
          ...prev,
          engineerId: Number(selectedEngineer.engineerId),
          engineerName: selectedEngineer.engineerName,
          reservationDateTime: selectTime || prev.reservationDateTime,
        }));
      }
    }

    // 선택된 주문 정보를 가져옵니다.
    if (selectOrderId) {
      const selectedOrder = dummyOrders.find((order) => Number(order.orderId) === selectOrderId);
      if (selectedOrder) {
        setCustomerFormValues((prev) => ({
          ...prev,
          customerId: Number(selectedOrder.customerId),
          customerName: selectedOrder.customerName,
          customerTel: selectedOrder.phoneNumber,
          address: selectedOrder.address,
          uniqueDetails: selectedOrder.customerUniqueDetails,
          document: selectedOrder.document,
          published: selectedOrder.published,
          payment: String(selectedOrder.payment),
        }));
        setSalesFormValues((prev) => ({
          ...prev,
          orderId: Number(selectedOrder.orderId),
          itemCount: selectedOrder.itemCount,
          finalPrice: selectedOrder.finalPrice,
          orderUniqueDetails: selectedOrder.orderUniqueDetails || '',
        }));
      }
    }
  }, [engineerId, selectOrderId, selectTime]);

  //시간, 기사 변화 확인
  const handleFieldChange = (fieldName: keyof ShaEngTimeEditFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };
  //고객 정보 변화 확인
  const handleCustomerFieldChange = (fieldName: keyof EditOrderCustomerFormValues, value: any) => {
    setCustomerFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleIsChecked = () => {
    const newChecked = !customerFormValues.published;

    setCustomerFormValues((prev) => ({
      ...prev,
      published: newChecked,
    }));
  };

  const handleCategoryChange = (category: ProductCategoryKey) => {
    setSalesFormValues({
      ...salesFormValues,
      selectedCategory: category,
      selectedDropdownValue: '',
      itemCount: 1,
    });
  };

  //드랍다운 클릭시 변화
  const handleDropdownChange = (value: string) => {
    setSalesFormValues((prev) => ({
      ...prev,
      selectedDropdownValue: value,
    }));
  };

  const handleItemCountChange = (value: string) => {
    const newCount = Number(value);

    setSalesFormValues((prev) => {
      const originalUnitPrice = prev.isDiscountApplied
        ? (prev.finalPrice + prev.discountAmount) / prev.itemCount
        : prev.finalPrice / prev.itemCount;

      let newTotalPrice = originalUnitPrice * newCount;

      if (prev.isDiscountApplied) {
        newTotalPrice = Math.max(newTotalPrice - prev.discountAmount, 0);
      }

      return {
        ...prev,
        itemCount: newCount,
        finalPrice: newTotalPrice,
      };
    });
  };
  const handleFinalPriceChange = (value: string) => {
    setSalesFormValues((prev) => ({
      ...prev,
      finalPrice: Number(value),
      isFinalPriceManual: true,
    }));
  };

  const handleDiscountToggle = (checked: boolean) => {
    setSalesFormValues((prev) => {
      const newState = {
        ...prev,
        isDiscountApplied: checked,
      };

      if (checked) {
        return {
          ...newState,
          finalPrice: Math.max(prev.finalPrice - prev.discountAmount, 0),
        };
      }

      return {
        ...newState,
        finalPrice: prev.finalPrice + (prev.isDiscountApplied ? prev.discountAmount : 0),
      };
    });
  };

  const handleDiscountChange = (value: string) => {
    const newDiscountAmount = Number(value);
    setSalesFormValues((prev) => {
      if (prev.isDiscountApplied) {
        const originalPrice = prev.finalPrice + prev.discountAmount;
        return {
          ...prev,
          discountAmount: newDiscountAmount,
          finalPrice: Math.max(originalPrice - newDiscountAmount, 0),
        };
      }

      return {
        ...prev,
        discountAmount: newDiscountAmount,
      };
    });
  };

  const handleUniqueDetailsChange = (value: string) => {
    setSalesFormValues((prev) => ({
      ...prev,
      uniqueDetails: value,
    }));
  };

  const handleCustomProductChange = (value: string) => {
    setSalesFormValues((prev) => ({
      ...prev,
      customProduct: value,
    }));
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
              handleIsChecked,
              isSubmitAttempted
            )}
          />
        </CardContent>

        <CardContent>
          <ShaInfoForm
            ShaTitledFormControlProps={ShaSalesInfoFormData({
              onCategoryChange: handleCategoryChange,
              onDropdownChange: handleDropdownChange,
              onItemCountChange: handleItemCountChange,
              onDiscountChange: handleDiscountChange,
              onUniqueDetailsChange: handleUniqueDetailsChange,
              onCustomProductChange: handleCustomProductChange,
              onDiscountToggle: handleDiscountToggle,
              onFinalPriceChange: handleFinalPriceChange,
              formData: salesFormValues,
              isSubmitAttempted,
            })}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AEditOrderInfo;
