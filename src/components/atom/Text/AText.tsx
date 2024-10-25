import { colors } from '@/styles/colors';
import { sizes } from '@/styles/sizes';
import { Typography } from '@mui/material';

export type TextProps = {
  text?: string | React.ReactNode;
  size?: keyof typeof sizes.fontSize;
  color?: keyof typeof colors.text;
};

const AText = ({ text, size = 'medium', color = 'default' }: TextProps) => {
  // ShaCheckbox가 포함된 경우에는 div로, 그 외에는 p로 렌더링
  const isComponent = typeof text !== 'string' && typeof text !== 'number';

  return (
    <Typography
      component={isComponent ? 'div' : 'p'}
      sx={{
        fontSize: sizes.fontSize[size],
        color: colors.text[color],
      }}
    >
      {text}
    </Typography>
  );
};

export default AText;
