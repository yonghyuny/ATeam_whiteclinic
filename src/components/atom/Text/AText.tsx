import { colors } from '@/styles/colors';
import { sizes } from '@/styles/sizes';
import { Typography } from '@mui/material';

export type TextProps = {
  text?: string | React.ReactNode;
  size?: keyof typeof sizes.fontSize;
  color?: keyof typeof colors.text;
};

const AText = ({ text, size = 'medium', color = 'default' }: TextProps) => {
  return (
    <Typography sx={{ fontSize: sizes.fontSize[size], color: colors.text[color] }}>
      {text}
    </Typography>
  );
};

export default AText;
