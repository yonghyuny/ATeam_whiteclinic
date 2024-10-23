'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { productCategories } from '@/constants/productCategory';
import ShaInfoForm from '@/components/molecules/Form/ShaInfoForm';
import { ShaSalesInfoFormData } from '@/constants/ShaSalesInfoFormData';
import ShaTwoButton from '@/components/molecules/Button/ShaTwoButton';

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

const ShaSalesInfo = () => {
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

  const isRegisterButtonDisabled =
    !formValues.selectedCategory || !formValues.selectedDropdownValue;

  const createHandler =
    <K extends keyof SalesFormData>(key: K, isNumber = false) =>
    (value: any) => {
      setFormValues((prev) => ({
        ...prev,
        [key]: isNumber ? Number(value) : value,
        ...(key !== 'isFinalPriceManual' && key !== 'finalPrice' && { isFinalPriceManual: false }),
      }));
    };

  const handleCategoryChange = (category: ProductCategoryKey) => {
    setFormValues({
      ...formValues,
      selectedCategory: category,
      selectedDropdownValue: '',
      itemCount: 1,
      finalPrice: 0,
      isFinalPriceManual: false,
    });
  };

  const handleDropdownChange = createHandler('selectedDropdownValue');
  const handleItemCountChange = createHandler('itemCount', true);
  const handleDiscountChange = createHandler('discountAmount', true);
  const handleUniqueDetailsChange = createHandler('uniqueDetails');
  const handleCustomProductChange = createHandler('customProduct');

  const handleDiscountToggle = (checked: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      isDiscountApplied: checked,
      isFinalPriceManual: false,
    }));
  };

  const handleFinalPriceChange = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      finalPrice: Number(value),
      isFinalPriceManual: true,
    }));
  };

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

    if (!selectedCategory || !selectedDropdownValue) return 0;
    if (isFinalPriceManual) return finalPrice;

    let itemPrice = 0;
    const category = productCategories[selectedCategory];
    const foundItem = category.categories.find((item) => item.category === selectedDropdownValue);

    if (foundItem?.price) {
      itemPrice = foundItem.price;
    }

    let totalPrice = itemPrice * itemCount;
    if (isDiscountApplied) {
      totalPrice -= discountAmount;
    }

    return Math.max(totalPrice, 0);
  };

  useEffect(() => {
    const newFinalPrice = calculateFinalPrice(formValues);
    if (formValues.finalPrice !== newFinalPrice) {
      setFormValues((prev) => ({ ...prev, finalPrice: newFinalPrice }));
    }
  }, [
    formValues.selectedCategory,
    formValues.selectedDropdownValue,
    formValues.itemCount,
    formValues.discountAmount,
    formValues.isDiscountApplied,
    formValues.isFinalPriceManual,
  ]);

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

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (!isRegisterButtonDisabled) {
      console.log('등록된 정보:', {
        세척품목: formValues.selectedCategory,
        드롭다운선택: formValues.selectedDropdownValue,
        세척대수: formValues.itemCount,
        할인적용여부: formValues.isDiscountApplied,
        할인금액: formValues.discountAmount,
        최종금액: formValues.finalPrice,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">세척 정보 등록</CardTitle>
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
              onClick: resetForm,
              size: 'lg',
              variant: 'outline',
            }}
            rightButton={{
              text: '등록',
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

export default ShaSalesInfo;
