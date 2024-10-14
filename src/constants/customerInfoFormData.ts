import { TitledFormControlProps } from '@/components/molecules/Form/TitledFormControl';
import { FormFieldType } from '@/components/molecules/Form/FormField';
import { ADatePickerProps } from '@/components/atom/Calendar/ADatePicker';
import { AVariableInputProps } from '@/components/atom/Input/VariableInput/AVariableInput';
import { OneCheckboxProps } from '@/components/molecules/checkbox/OneCheckbox';
import { publishedCheckboxData } from './customerData';
import dayjs, { Dayjs } from 'dayjs';
import { CustomerInfoValues } from '@/components/organism/Customer/CustomerInfo';
import { SelectProps } from '@/components/molecules/Select/APayment';
import { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import { ADateTimePickerProps } from '@/components/molecules/ADateTimePicker/ADateTimePicker';

export const CustomerInfoFormData = (
  formValues: CustomerInfoValues,
  handleFieldChange: (fieldName: keyof CustomerInfoValues, value: any) => void
): TitledFormControlProps[] => [
  {
    titleprops: {
      text: '예약일시',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ADateTimePicker' as FormFieldType,
          prevprops: {
            dateLabel: '예약 날짜',
            timeLabel: '예약 시간',
            value: formValues.reservationDateTime,
            onChange: (newValue: Dayjs | null) =>
              handleFieldChange('reservationDateTime', newValue),
            size: 'small',
          } as ADateTimePickerProps,
        },
        
      ],
    },
  },
  {
    titleprops: {
      text: '고객성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '고객성함',
            isInvisible: false,
            value: formValues.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('name', e.target.value),
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '연락처',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '연락처',
            isInvisible: false,
            value: formValues.phoneNumber,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('phoneNumber', e.target.value),
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '방문주소',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '방문주소',
            isInvisible: false,
            value: formValues.address,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('address', e.target.value),
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '특이사항',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '특이사항',
            isInvisible: false,
            isMultiline: true,
            value: formValues.uniqueDetails,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('uniqueDetails', e.target.value),
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '결제방식',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'APayment' as FormFieldType,
          prevprops: {
            adropdownprops: {
              label: '결제방식 선택',
              width: 'medium',
              value: formValues.payment || '',
              onChange: (event: React.ChangeEvent<{ value: string }>) => {
                handleFieldChange('payment', event.target.value);
              },
            },
          } as SelectProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '증빙서류',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AEvidentialDocument' as FormFieldType,
          prevprops: {
            adropdownprops: {
              label: '증빙서류 선택',
              width: 'medium',
              value: formValues.document || '',
              onChange: (event: React.ChangeEvent<{ value: string }>) => {
                handleFieldChange('document', event.target.value);
              },
            },
          } as SelectProps,
        },
        {
          formfieldtype: 'OneCheckbox' as FormFieldType,
          prevprops: {
            checkboxes: publishedCheckboxData,
            value: formValues.published || '',
            onChange: (value: string) => {
              handleFieldChange('published', value);
            },
          } as OneCheckboxProps,
        },
      ],
    },
  },
];
