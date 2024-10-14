import { TitledFormControlProps } from '@/components/molecules/Form/TitledFormControl';
import { FormFieldType } from '@/components/molecules/Form/FormField';
import { CheckboxDropdownSelectorProps } from '@/components/molecules/Customer/CheckboxDropdownSelector';
import { productCategories } from '@/constants/productCategory';
import { OneCheckboxProps } from '@/components/molecules/checkbox/OneCheckbox';
import { ANumericInputProps } from '@/components/molecules/input/ANumericInput';
import { DiscountCheckboxProps } from '@/components/molecules/Customer/DiscountCheckbox';
import { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';
import { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { SalesFormData } from '@/components/organism/Customer/SalesInfo';

type ProductCategoryKey = keyof typeof productCategories;

type SalesInfoProps = {
  onCategoryChange: (category: ProductCategoryKey) => void;
  onDropdownChange: (value: string) => void;
  onItemCountChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onUniqueDetailsChange: (value: string) => void;
  onCustomProductChange: (value: string) => void;
  onDiscountToggle: (checked: boolean) => void;
  onFinalPriceChange: (value: string) => void;
  formData: SalesFormData;
};

export const salesInfoFormData = ({
  onCategoryChange,
  onDropdownChange,
  onItemCountChange,
  onDiscountChange,
  onUniqueDetailsChange,
  onCustomProductChange,
  onDiscountToggle,
  onFinalPriceChange,
  formData,
}: SalesInfoProps): TitledFormControlProps[] => {
  const {
    itemCount,
    discountAmount,
    finalPrice,
    uniqueDetails,
    customProduct,
    selectedDropdownValue,
    selectedCategory,
    isDiscountApplied,
  } = formData;

  return [
    {
      titleprops: { text: '세척품목' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'CheckboxDropdownSelector' as FormFieldType,
            prevprops: {
              onecheckboxprops: {
                checkboxes: {
                  airConditioner: { textprops: { text: productCategories.airConditioner.product } },
                  washingMachine: { textprops: { text: productCategories.washingMachine.product } },
                },
                value: selectedCategory,
                onChange: onCategoryChange,
              } as OneCheckboxProps,
              dropdownprops: {
                label: '카테고리 선택',
                value: selectedDropdownValue,
                onChange: (event) => onDropdownChange(event.target.value),
              } as ADropdownProps,
              customInputValue: customProduct,
              onProductChange: onCustomProductChange,
            } as CheckboxDropdownSelectorProps,
          },
        ],
      },
    },
    {
      titleprops: { text: '세척대수' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ANumericInput' as FormFieldType,
            prevprops: {
              avariableinputprops: {
                isInvisible: false,
                value: itemCount.toString(),
                onValueChange: onItemCountChange,
              },
            } as ANumericInputProps,
          },
        ],
      },
    },
    {
      titleprops: { text: '할인 여부' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'DiscountCheckbox' as FormFieldType,
            prevprops: {
              checkboxprops: {
                isChecked: isDiscountApplied,
                onChange: (event) => onDiscountToggle(event.target.checked),
                textprops: { text: '할인 적용' },
              } as CheckboxProps,
              anumericInputprops: {
                avariableinputprops: {
                  isInvisible: false,
                  value: discountAmount.toString(),
                  onValueChange: onDiscountChange,
                },
                max: 100000,
              } as ANumericInputProps,
            } as DiscountCheckboxProps,
          },
        ],
      },
    },
    {
      titleprops: { text: '세척금액' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ANumericInput' as FormFieldType,
            prevprops: {
              avariableinputprops: {
                value: finalPrice.toString(),
                isInvisible: false,
                onValueChange: onFinalPriceChange,
              },
            } as ANumericInputProps,
          },
        ],
      },
    },
    {
      titleprops: { text: '특이사항' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'AFixedInput' as FormFieldType,
            prevprops: {
              placeholder: '특이사항',
              isInvisible: false,
              isMultiline: true,
              value: uniqueDetails,
              onChange: (event) => onUniqueDetailsChange(event.target.value),
            } as AFixedInputProps,
          },
        ],
      },
    },
  ];
};
