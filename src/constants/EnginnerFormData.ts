import { TitledFormControlProps } from '@/components/molecules/Form/TitledFormControl';
import { FormFieldType } from '@/components/molecules/Form/FormField';
import { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import { LabelCheckBoxProps } from '@/components/molecules/Engineer/LabelCheckBox';
import { Days } from './Days';
import { Percentage } from './Percentage';
import dayjs, { Dayjs } from 'dayjs';
import { HolidayProps } from '@/components/molecules/Engineer/Holiday';
import { HolidayRegistrationProps } from '@/components/molecules/Engineer/HolidayRegistration';

export type EngineerFormValues = {
  name: string;
  phoneNumber: string;
  residenceArea: string;
  Items: string[];
  ItemsSpecialNotes: string;
  specialNotes: string;
  allowanceRate: string;
  paymentDay: string;
  holidayRegistration: Dayjs[];
  regularHoliday: string[];
};

export const EngineerFormData = (
  formValues: EngineerFormValues,
  handleFieldChange: (fieldName: keyof EngineerFormValues, value: any) => void
): TitledFormControlProps[] => [
  {
    titleprops: {
      text: '기사성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '기사성함',
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
      text: '거주지역',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '거주지역',
            isInvisible: false,
            value: formValues.residenceArea,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('residenceArea', e.target.value),
          } as AFixedInputProps,
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
          formfieldtype: 'LabelCheckBox' as FormFieldType,
          prevprops: {
            selectedItems: formValues.Items,
            onItemsChange: (newItems: string[]) => handleFieldChange('Items', newItems),
          } as LabelCheckBoxProps,
        },
        {
          formfieldtype: 'AFixedInput' as FormFieldType,
          prevprops: {
            placeholder: '특이사항',
            isInvisible: false,
            isMultiline: true,
            value: formValues.ItemsSpecialNotes,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('ItemsSpecialNotes', e.target.value),
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
            value: formValues.specialNotes,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('specialNotes', e.target.value),
          } as AFixedInputProps,
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
          formfieldtype: 'ADropdownBox' as FormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Percentage.map((payment) => ({
              value: payment,
              text: payment,
            })),
            value: formValues.allowanceRate,
            onChange: (e: React.ChangeEvent<{ value: unknown }>) =>
              handleFieldChange('allowanceRate', e.target.value as string),
          } as ADropdownProps,
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
          formfieldtype: 'ADropdownBox' as FormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Days.map((days) => ({
              value: days,
              text: days,
            })),
            value: formValues.paymentDay,
            onChange: (e: React.ChangeEvent<{ value: unknown }>) =>
              handleFieldChange('paymentDay', e.target.value as string),
          } as ADropdownProps,
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
          formfieldtype: 'HolidayRegistration' as FormFieldType,
          prevprops: {
            registeredHolidays: formValues.holidayRegistration,
            onHolidaysChange: (newDays: Dayjs[]) =>
              handleFieldChange('holidayRegistration', newDays),
          } as HolidayRegistrationProps,
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
          formfieldtype: 'Holiday' as FormFieldType,
          prevprops: {
            selectedDays: formValues.regularHoliday,
            onDaysChange: (newDays: string[]) => handleFieldChange('regularHoliday', newDays),
          } as HolidayProps,
        },
      ],
    },
  },
];
