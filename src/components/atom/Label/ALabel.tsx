import { sizes } from '@/styles/sizes';
import { ListItemText } from '@mui/material';

export type ALabelProps = {
  text?: string;
  color?: string;
  fontSize?: keyof typeof sizes.fontSize;
  sx?: object;
};

const ALabel = ({ text = 'Label', color = 'black', fontSize = 'medium', sx }: ALabelProps) => {
  return (
    <ListItemText
      primary={text}
      primaryTypographyProps={{
        style: { fontSize: sizes.fontSize[fontSize] },
        sx: { color, ...sx },
      }}
    />
  );
};

export default ALabel;
