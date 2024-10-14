import { Input } from '@mui/material';

type InputTextType = {
  text: string;
  password: string;
};

type PracticeProps = {
  type: keyof InputTextType;
  value: string;
};

const Practice = ({ type, value }: PracticeProps) => {
  return <Input type={type} value={value} />;
};

export default Practice;
