import AButton, { AButtonProps } from '@/components/atom/Button/AButton';
import ADatePicker, { ADatePickerProps } from '@/components/atom/Calendar/ADatePicker';
import ACheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';
import ADropdownBox, { ADropdownProps } from '@/components/atom/DropdownBox/ADropdown';
import AFixedInput, { AFixedInputProps } from '@/components/atom/Input/FixedInput/AFixedInput';
import WorkcerCheckbox, { WorkerCheckboxGroupProps } from '../checkbox/WorkerCheckbox';
import LabelCheckBox, { LabelCheckBoxProps } from '@/components/molecules/Engineer/LabelCheckBox';
import AVariableInput, {
  AVariableInputProps,
} from '@/components/atom/Input/VariableInput/AVariableInput';
import OneCheckbox, { OneCheckboxProps } from '@/components/molecules/checkbox/OneCheckbox';
import { Box } from '@mui/material';
import ANumericInput, { ANumericInputProps } from '../input/ANumericInput';
import DiscountCheckbox, {
  DiscountCheckboxProps,
} from '@/components/molecules/Customer/DiscountCheckbox';
import CheckboxDropdownSelector, {
  CheckboxDropdownSelectorProps,
} from '@/components/molecules/Customer/CheckboxDropdownSelector';
import HolidayRegistration, {
  HolidayRegistrationProps,
} from '@/components/molecules/Engineer/HolidayRegistration';
import Holiday, { HolidayProps } from '@/components/molecules/Engineer/Holiday';
import AEvidentialDocument from '@/components/molecules/Select/AEvidentialDocument';
import APercent from '@/components/molecules/Select/APercent';
import ADaySelector from '@/components/molecules/Select/ADaySelector';
import APayment, { SelectProps } from '@/components/molecules/Select/APayment';
import ADateTimePicker, { ADateTimePickerProps } from '../ADateTimePicker/ADateTimePicker';

export type FormFieldType =
  | 'AButton'
  | 'ACheckbox'
  | 'ADatePicker'
  | 'ADropdownBox'
  | 'AFixedInput'
  | 'AVariableInput'
  | 'ANumericInput'
  | 'OneCheckbox'
  | 'WorkcerCheckbox'
  | 'DiscountCheckbox'
  | 'LabelCheckBox'
  | 'CheckboxDropdownSelector'
  | 'APayment'
  | 'HolidayRegistration'
  | 'Holiday'
  | 'AEvidentialDocument'
  | 'APercent'
  | 'ADaySelector'
  | 'ADateTimePicker';

export type FormFieldConfigProps = {
  formfieldtype: FormFieldType;
  prevprops?:
    | AButtonProps
    | CheckboxProps
    | ADatePickerProps
    | ADropdownProps
    | AFixedInputProps
    | AVariableInputProps
    | ANumericInputProps
    | OneCheckboxProps
    | WorkerCheckboxGroupProps
    | DiscountCheckboxProps
    | LabelCheckBoxProps
    | CheckboxDropdownSelectorProps
    | SelectProps
    | HolidayProps
    | HolidayRegistrationProps
    | ADateTimePickerProps;
};

export type FormFieldProps = {
  fields: FormFieldConfigProps[];
};

// 각 타입에 대한 컴포넌트 매핑
const fieldTypeToComponentMap: Record<FormFieldType, React.ElementType> = {
  AButton,
  ACheckbox,
  ADatePicker,
  ADropdownBox,
  AFixedInput,
  AVariableInput,
  ANumericInput,
  OneCheckbox,
  WorkcerCheckbox,
  DiscountCheckbox,
  LabelCheckBox,
  CheckboxDropdownSelector,
  APayment,
  HolidayRegistration,
  Holiday,
  AEvidentialDocument,
  APercent,
  ADaySelector,
  ADateTimePicker,
};

const FormField = ({ fields }: FormFieldProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {fields.map((field, index) => {
        const Component = fieldTypeToComponentMap[field.formfieldtype];

        return Component ? <Component key={index} {...field.prevprops} /> : null;
      })}
    </Box>
  );
};

export default FormField;
