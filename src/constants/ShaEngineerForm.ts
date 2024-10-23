import { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import { LabelCheckBoxProps } from '@/components/molecules/Engineer/LabelCheckBox';
import { Days } from './Days';
import { Percentage } from './Percentage';
import dayjs, { Dayjs } from 'dayjs';
import { HolidayProps } from '@/components/molecules/Engineer/Holiday';
import { HolidayRegistrationProps } from '@/components/molecules/Engineer/HolidayRegistration';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';
import { ShaLabelCheckBoxProps } from '@/components/molecules/Engineer/ShaLabelCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaHolidayRegistrationProps } from '@/components/molecules/Engineer/ShaHolidayRegistration';
import { ShaHolidayProps } from '@/components/molecules/Engineer/ShaHoliday';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';

export type EngineerFormValues = {
  name: string;
  phoneNumber: string;
  residenceArea: string;
  Items: string[];
  ItemsSpecialNotes: string;
  specialNotes: string;
  allowanceRate: string;
  paymentDay: string;
  holidayRegistration: Date[];
  regularHoliday: string[];
};

export const EngineerFormData = (
  formValues: EngineerFormValues,
  handleFieldChange: (fieldName: keyof EngineerFormValues, value: any) => void,
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '기사성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '기사성함',
            required: true,
            error: '기사성함을 입력해주세요',
            value: formValues.name,
            onChange: (value: string) => handleFieldChange('name', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
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
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '연락처',
            type: 'tel',
            required: true,
            error: '연락처를 입력해주세요',
            value: formValues.phoneNumber,
            onChange: (value: string) => handleFieldChange('phoneNumber', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '거주지역',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '거주지역',
            required: true,
            error: '거주지역을 입력해주세요',
            value: formValues.residenceArea,
            onChange: (value: string) => handleFieldChange('residenceArea', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '가능품목',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaLabelCheckBox' as ShaFormFieldType,
          prevprops: {
            selectedItems: formValues.Items,
            onItemsChange: (newItems: string[]) => handleFieldChange('Items', newItems),
          } as ShaLabelCheckBoxProps,
        },
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '특이사항을 입력해주세요',
            size: 'large',
            rows: 1,
            value: formValues.ItemsSpecialNotes,
            onChange: (value: string) => handleFieldChange('ItemsSpecialNotes', value),
          } as ShaTextareaProps,
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
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '특이사항을 입력해주세요',
            size: 'large',
            rows: 1,
            value: formValues.specialNotes,
            onChange: (value: string) => handleFieldChange('specialNotes', value),
          } as ShaTextareaProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '수당률',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Percentage.map((payment) => ({
              value: payment,
              text: payment,
            })),
            value: formValues.allowanceRate,
            required: true,
            error: '수당률을 선택해주세요',
            onChange: (value: string) => handleFieldChange('allowanceRate', value),
            showError: isSubmitAttempted,
          } as ShaDropdownProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '급여요일',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Days.map((days) => ({
              value: days,
              text: days,
            })),
            value: formValues.paymentDay,
            required: true,
            error: '급여요일을 선택해주세요',
            onChange: (value: string) => handleFieldChange('paymentDay', value),
            showError: isSubmitAttempted,
          } as ShaDropdownProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '휴무등록',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaHolidayRegistration' as ShaFormFieldType,
          prevprops: {
            registeredHolidays: formValues.holidayRegistration,
            onHolidaysChange: (newDays: Date[]) =>
              handleFieldChange('holidayRegistration', newDays),
          } as ShaHolidayRegistrationProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '정기휴무',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaHoliday' as ShaFormFieldType,
          prevprops: {
            selectedDays: formValues.regularHoliday,
            onDaysChange: (newDays: string[]) => handleFieldChange('regularHoliday', newDays),
          } as ShaHolidayProps,
        },
      ],
    },
  },
];
