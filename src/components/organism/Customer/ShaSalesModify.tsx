'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { ShaSalesInfoFormData } from '@/constants/ShaSalesInfoFormData';
import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';
import { productCategories } from '@/constants/productCategory';
import { Loader2 } from 'lucide-react';

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

// 더미 데이터
const salesDummyData: SalesFormData = {
  selectedCategory: 'airConditioner',
  selectedDropdownValue: '스탠드',
  itemCount: 2,
  discountAmount: 10000,
  finalPrice: 190000,
  uniqueDetails: '2층 설치, 사다리 필요',
  customProduct: '',
  isDiscountApplied: true,
  isFinalPriceManual: true,
};

const SalesModify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<SalesFormData>({
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
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  // 등록 버튼 비활성화 조건 추가
  const isRegisterButtonDisabled =
    !formValues.selectedCategory || !formValues.selectedDropdownValue || formValues.finalPrice <= 0;

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFormValues(salesDummyData);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateFinalPrice = (data: SalesFormData): number => {
    const { discountAmount, isDiscountApplied, isFinalPriceManual, finalPrice } = data;

    if (isFinalPriceManual) return finalPrice;

    if (isDiscountApplied) {
      return Math.max(finalPrice - discountAmount, 0);
    }

    return finalPrice;
  };

  const handleCategoryChange = (category: ProductCategoryKey) => {
    setFormValues({
      ...formValues,
      selectedCategory: category,
      selectedDropdownValue: '',
      itemCount: 1,
    });
  };

  const handleDropdownChange = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      selectedDropdownValue: value,
    }));
  };

  const handleItemCountChange = (value: string) => {
    const newCount = Number(value);

    setFormValues((prev) => {
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
    setFormValues((prev) => ({
      ...prev,
      finalPrice: Number(value),
      isFinalPriceManual: true,
    }));
  };

  const handleDiscountToggle = (checked: boolean) => {
    setFormValues((prev) => {
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
    setFormValues((prev) => {
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
    setFormValues((prev) => ({
      ...prev,
      uniqueDetails: value,
    }));
  };

  const handleCustomProductChange = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      customProduct: value,
    }));
  };
  const resetForm = () => {
    setFormValues({
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
    setIsSubmitAttempted(false);
  };
  const handleSubmit = async () => {
    setIsSubmitAttempted(true);
    if (!isRegisterButtonDisabled) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('수정된 정보:', {
          세척품목: formValues.selectedCategory,
          카테고리: formValues.selectedDropdownValue,
          세척대수: formValues.itemCount,
          할인적용여부: formValues.isDiscountApplied,
          할인금액: formValues.discountAmount,
          최종금액: formValues.finalPrice,
          특이사항: formValues.uniqueDetails,
          에어컨스탠드: formValues.customProduct,
        });
        // 성공 시 페이지 이동
        window.history.back();
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">세척 정보 수정</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6">
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
              formData: formValues,
              isSubmitAttempted,
            })}
          />
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 pt-6 border-t bg-muted/50">
          <ShaTwoButton
            leftButton={{
              text: '취소',
              onClick: () => window.history.back(),
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '수정',
              onClick: handleSubmit,
              size: 'lg',
              disabled: isRegisterButtonDisabled,
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SalesModify;
