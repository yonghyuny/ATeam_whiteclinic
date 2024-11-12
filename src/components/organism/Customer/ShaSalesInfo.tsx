'use client';

import { productCategories } from '@/constants/productCategory';
import { useState } from 'react';

type ProductCategoryKey = keyof typeof productCategories;

// product_remark 및 필요한 필드를 포함한 SalesFormData 타입 정의
export type SalesFormData = {
  order_id: number;
  product_type_id: number | null;
  product_detail_id: number | null;
  count: number;
  discount_amount: number;
  total_amount: number;
  product_remark: string;
  remark: string;
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
  // SalesFormData 타입에 따라 초기 상태 정의
  const [salesForm, setSalesForm] = useState<SalesFormData>({
    order_id: 0,
    product_type_id: 0,
    product_detail_id: 0,
    count: 1,
    discount_amount: 0,
    total_amount: 0,
    product_remark: '',
    remark: '',
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

  const calculateFinalPrice = (data: SalesFormData): number => {
    const { discountAmount, isDiscountApplied, isFinalPriceManual, finalPrice } = data;
    if (isFinalPriceManual) return finalPrice;
    return isDiscountApplied ? Math.max(finalPrice - discountAmount, 0) : finalPrice;
  };

  const handleCategoryChange = (category: ProductCategoryKey) => {
    setSalesForm((prev) => ({
      ...prev,
      selectedCategory: category,
      selectedDropdownValue: '',
      itemCount: 1,
    }));
  };

  const handleDropdownChange = (value: string) => {
    setSalesForm((prev) => ({
      ...prev,
      selectedDropdownValue: value,
    }));
  };

  const handleItemCountChange = (value: string) => {
    const newCount = Number(value);
    setSalesForm((prev) => {
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
    setSalesForm((prev) => ({
      ...prev,
      finalPrice: Number(value),
      isFinalPriceManual: true,
    }));
  };

  const handleDiscountToggle = (checked: boolean) => {
    setSalesForm((prev) => {
      const newState = {
        ...prev,
        isDiscountApplied: checked,
      };
      return checked
        ? { ...newState, finalPrice: Math.max(prev.finalPrice - prev.discountAmount, 0) }
        : {
            ...newState,
            finalPrice: prev.finalPrice + (prev.isDiscountApplied ? prev.discountAmount : 0),
          };
    });
  };

  const handleDiscountChange = (value: string) => {
    const newDiscountAmount = Number(value);
    setSalesForm((prev) => {
      const originalPrice = prev.isDiscountApplied
        ? prev.finalPrice + prev.discountAmount
        : prev.finalPrice;
      return {
        ...prev,
        discountAmount: newDiscountAmount,
        finalPrice: prev.isDiscountApplied
          ? Math.max(originalPrice - newDiscountAmount, 0)
          : prev.finalPrice,
      };
    });
  };

  const handleUniqueDetailsChange = (value: string) => {
    setSalesForm((prev) => ({
      ...prev,
      uniqueDetails: value,
    }));
  };

  const handleCustomProductChange = (value: string) => {
    setSalesForm((prev) => ({
      ...prev,
      customProduct: value,
    }));
  };

  const resetForm = () => {
    setSalesForm({
      order_id: 0,
      product_type_id: 0,
      product_detail_id: 0,
      count: 1,
      discount_amount: 0,
      total_amount: 0,
      product_remark: '',
      remark: '',
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

  const isRegisterButtonDisabled =
    !salesForm.selectedCategory || !salesForm.selectedDropdownValue || salesForm.finalPrice <= 0;

  const handleSubmit = () => {
    setIsSubmitAttempted(true);
    if (!isRegisterButtonDisabled) {
      console.log('등록된 정보:', salesForm);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      {/* UI components such as input fields, dropdowns, and buttons to handle form changes */}
    </div>
  );
};

export default ShaSalesInfo;
