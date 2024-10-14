import { Checkbox, FormControlLabel } from '@mui/material';
import AText, { TextProps } from '../Text/AText';

export type CheckboxProps = {
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textprops?: TextProps;
};

const ACheckbox = ({ isChecked = false, onChange, textprops }: CheckboxProps) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={onChange} size="medium" />}
      label={<AText {...textprops} />}
    />
  );
};

export default ACheckbox;
