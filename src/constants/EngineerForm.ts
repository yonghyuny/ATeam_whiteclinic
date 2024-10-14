import { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import { LabelCheckBoxProps } from '@/components/molecules/Engineer/LabelCheckBox';
import { FormFieldType, FormFieldConfigProps } from '@/components/molecules/Form/FormField';
import { TitledFormControlProps } from '@/components/molecules/Form/TitledFormControl';
import { Days } from './Days';
import { Percentage } from './Percentage';

// FormFieldConfigProps 타입을 확장합니다.
type ExtendedFormFieldConfigProps = FormFieldConfigProps & {
  id: string;
};

// TitledFormControlProps 타입을 확장합니다.
interface ExtendedTitledFormControlProps extends Omit<TitledFormControlProps, 'formfieldprops'> {
  id: string;
  formfieldprops: {
    fields: ExtendedFormFieldConfigProps[];
  };
}

export const EngineerFormData: ExtendedTitledFormControlProps[] = [
  {
    id: 'engineerName',
    titleprops: {
      text: '기사성함',
    },
    formfieldprops: {
      fields: [
        {
          id: 'engineerNameInput',
          formfieldtype: 'AFixedInput',
          prevprops: {
            placeholder: '기사성함',
            isInvisible: false,
            value: '',
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    id: 'contactNumber',
    titleprops: {
      text: '연락처',
    },
    formfieldprops: {
      fields: [
        {
          id: 'contactNumberInput',
          formfieldtype: 'AFixedInput',
          prevprops: {
            placeholder: '연락처',
            isInvisible: false,
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    id: 'residenceArea',
    titleprops: {
      text: '거주지역',
    },
    formfieldprops: {
      fields: [
        {
          id: 'residenceAreaInput',
          formfieldtype: 'AFixedInput',
          prevprops: { placeholder: '거주지역', isInvisible: false } as AFixedInputProps,
        },
      ],
    },
  },
  {
    id: 'availableItems',
    titleprops: {
      text: '가능품목',
    },
    formfieldprops: {
      fields: [
        {
          id: 'availableItemsCheckbox',
          formfieldtype: 'LabelCheckBox',
          prevprops: {} as LabelCheckBoxProps,
        },
        {
          id: 'availableItemsNote',
          formfieldtype: 'AFixedInput',
          prevprops: {
            placeholder: '특이사항',
            isInvisible: false,
            isMultiline: true,
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    id: 'specialNote',
    titleprops: {
      text: '특이사항',
    },
    formfieldprops: {
      fields: [
        {
          id: 'specialNoteInput',
          formfieldtype: 'AFixedInput',
          prevprops: {
            placeholder: '특이사항',
            isInvisible: false,
            isMultiline: true,
          } as AFixedInputProps,
        },
      ],
    },
  },
  {
    id: 'allowanceRate',
    titleprops: {
      text: '수당률',
    },
    formfieldprops: {
      fields: [
        {
          id: 'allowanceRateDropdown',
          formfieldtype: 'ADropdownBox',
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Percentage.map((payment) => ({
              value: payment,
              text: payment,
            })),
          } as ADropdownProps,
        },
      ],
    },
  },
  {
    id: 'paymentDay',
    titleprops: {
      text: '급여요일',
    },
    formfieldprops: {
      fields: [
        {
          id: 'paymentDayDropdown',
          formfieldtype: 'ADropdownBox',
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Days.map((days) => ({
              value: days,
              text: days,
            })),
          } as ADropdownProps,
        },
      ],
    },
  },
  {
    id: 'holidayRegistration',
    titleprops: {
      text: '휴무등록',
    },
    formfieldprops: {
      fields: [
        {
          id: 'holidayRegistrationComponent',
          formfieldtype: 'HolidayRegistration',
        },
      ],
    },
  },
  {
    id: 'regularHoliday',
    titleprops: {
      text: '정기휴무',
    },
    formfieldprops: {
      fields: [
        {
          id: 'regularHolidayComponent',
          formfieldtype: 'Holiday',
        },
      ],
    },
  },
];
