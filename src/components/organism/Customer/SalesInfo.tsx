'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ModalButton from '@/components/molecules/Customer/ModalButton';
import InfoForm from '@/components/molecules/Form/InfoForm';
import { salesInfoFormData } from '@/constants/salesInfoFormData';
import { productCategories } from '@/constants/productCategory';

type ProductCategoryKey = keyof typeof productCategories;

export type SalesFormData = {
  selectedCategory: ProductCategoryKey | '';
  selectedDropdownValue: string;
  itemCount: number;
  discountAmount: number;
  finalPrice: number;
  uniqueDetails: string;
  customProduct: string;
  isDiscountApplied: boolean;
  isFinalPriceManual: boolean;
};

const SalesInfo = () => {
  // 상태 변수들을 하나의 객체로 통합
  const [SalesFormData, setSalesFormData] = useState<SalesFormData>({
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

  // 등록 버튼 활성화 상태 변수
  const isRegisterButtonDisabled =
    !SalesFormData.selectedCategory || !SalesFormData.selectedDropdownValue;

  // 상태 업데이트를 위한 핸들러 생성 함수
  const createHandler =
    <K extends keyof SalesFormData>(key: K, isNumber = false) =>
    (value: any) => {
      setSalesFormData((prev) => ({
        ...prev,
        [key]: isNumber ? Number(value) : value,
        ...(key !== 'isFinalPriceManual' && key !== 'finalPrice' && { isFinalPriceManual: false }), // 금액 자동 계산으로 전환
      }));
    };

  // 각 핸들러 함수들
  const handleCategoryChange = (category: ProductCategoryKey) => {
    setSalesFormData({
      ...SalesFormData,
      selectedCategory: category,
      selectedDropdownValue: '',
      itemCount: 1,
      finalPrice: 0,
      isFinalPriceManual: false,
    });
    console.log(`품목 선택: ${category}`);
  };

  const handleDropdownChange = createHandler('selectedDropdownValue');
  const handleItemCountChange = createHandler('itemCount', true);
  const handleDiscountChange = createHandler('discountAmount', true);
  const handleUniqueDetailsChange = createHandler('uniqueDetails');
  const handleCustomProductChange = createHandler('customProduct');
  const handleDiscountToggle = (checked: boolean) => {
    setSalesFormData((prev) => ({
      ...prev,
      isDiscountApplied: checked,
      isFinalPriceManual: false,
    }));
    console.log(`할인 적용 여부: ${checked ? '적용됨' : '적용 해제됨'}`);
  };
  const handleFinalPriceChange = (value: string) => {
    setSalesFormData((prev) => ({
      ...prev,
      finalPrice: Number(value),
      isFinalPriceManual: true,
    }));
    console.log(`세척금액 변경: ${value}`);
  };

  // 최종 금액 계산 함수
  const calculateFinalPrice = (data: SalesFormData): number => {
    const {
      selectedCategory,
      selectedDropdownValue,
      itemCount,
      discountAmount,
      isDiscountApplied,
      isFinalPriceManual,
      finalPrice,
    } = data;

    if (!selectedCategory || !selectedDropdownValue) {
      return 0;
    }

    if (isFinalPriceManual) {
      return finalPrice;
    }

    let itemPrice = 0;

    // 선택된 품목의 가격을 계산
    const category = productCategories[selectedCategory];
    const foundItem = category.categories.find((item) => item.category === selectedDropdownValue);

    if (foundItem?.price) {
      itemPrice = foundItem.price;
      console.log(`선택된 품목: ${selectedDropdownValue}, 가격: ${itemPrice}`);
    }

    // 총 가격 계산
    let totalPrice = itemPrice * data.itemCount;

    // 할인 적용
    if (isDiscountApplied) {
      totalPrice -= data.discountAmount;
    }

    // 최종 금액이 음수가 되지 않도록 처리
    totalPrice = Math.max(totalPrice, 0);

    console.log(`최종 가격: ${totalPrice}`);
    return totalPrice;
  };

  // 세척금액을 계산하고 상태를 업데이트
  useEffect(() => {
    const newFinalPrice = calculateFinalPrice(SalesFormData);

    if (SalesFormData.finalPrice !== newFinalPrice) {
      setSalesFormData((prev) => ({ ...prev, finalPrice: newFinalPrice }));
    }
  }, [
    SalesFormData.selectedCategory,
    SalesFormData.selectedDropdownValue,
    SalesFormData.itemCount,
    SalesFormData.discountAmount,
    SalesFormData.isDiscountApplied,
    SalesFormData.isFinalPriceManual,
    SalesFormData,
  ]);

  // 폼 초기화 함수
  const resetForm = () => {
    setSalesFormData({
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
    console.log('폼이 초기화되었습니다.');
  };

  // 등록 버튼 클릭 핸들러
  const handleRegisterClick = () => {
    const data = {
      세척품목: SalesFormData.selectedCategory,
      드롭다운선택: SalesFormData.selectedDropdownValue,
      세척대수: SalesFormData.itemCount,
      할인적용여부: SalesFormData.isDiscountApplied,
      할인금액: SalesFormData.discountAmount,
      최종금액: SalesFormData.finalPrice,
    };
    console.log('등록된 정보:', data);
  };

  // 취소 버튼 클릭 핸들러
  const handleCancelClick = () => {
    resetForm();
  };

  return (
    <Box>
      <InfoForm
        titledformcontrolprops={salesInfoFormData({
          onCategoryChange: handleCategoryChange,
          onDropdownChange: handleDropdownChange,
          onItemCountChange: handleItemCountChange,
          onDiscountChange: handleDiscountChange,
          onUniqueDetailsChange: handleUniqueDetailsChange,
          onCustomProductChange: handleCustomProductChange,
          onDiscountToggle: handleDiscountToggle,
          onFinalPriceChange: handleFinalPriceChange,
          formData: SalesFormData,
        })}
      />
      <ModalButton
        leftButton={{ text: '취소', size: 'full' }}
        rightButton={{
          text: '등록',
          color: 'primary',
          size: 'full',
          disabled: isRegisterButtonDisabled,
        }}
        onRightButtonClick={handleRegisterClick}
        onLeftButtonClick={handleCancelClick}
      />
    </Box>
  );
};

export default SalesInfo;
