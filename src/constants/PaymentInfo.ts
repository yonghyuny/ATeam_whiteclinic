import { AVariableInputProps } from '@/components/atom/Input/VariableInput/AVariableInput';
import { FormFieldType } from '@/components/molecules/Form/FormField';

export const PaymentInfo = [
  {
    titleprops: {
      text: '기사성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'AVariableInput' as FormFieldType,
          prevprops: {
            isEdit: false,
          } as AVariableInputProps,
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
          formfieldtype: 'APercent' as FormFieldType,
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
          formfieldtype: 'ADaySelector' as FormFieldType,
        },
      ],
    },
  },
];
