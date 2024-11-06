import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaDateTimePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { dummyEngineers } from './scheduleDummy';

export type ShaEngTimeEditFormValues = {
  reservationDateTime: Date | null;
  engineerId: number | null;
  engineerName: string;
};

export const ShaEngTimeEditFormData = (
  formValues: ShaEngTimeEditFormValues,
  handleFieldChange: (fieldName: keyof ShaEngTimeEditFormValues, value: any) => void
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '예약일시',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDateTimePicker' as ShaFormFieldType,
          prevprops: {
            dateLabel: '예약 날짜',
            timeLabel: '예약 시간',
            value: formValues.reservationDateTime,
            onChange: (newValue: Date | null) => handleFieldChange('reservationDateTime', newValue),
          } as ShaDateTimePickerProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '기사 선택',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '기사 선택',
            width: 'medium',
            options: dummyEngineers.map((id) => ({
              key: id.engineerId,
              value: id.engineerName,
              text: id.engineerName,
            })),
            value: formValues.engineerName,
            onChange: (value: string) => handleFieldChange('engineerName', value),
          } as ShaDropdownProps,
        },
      ],
    },
  },
];
