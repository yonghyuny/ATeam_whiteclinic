import { ListItemIcon } from '@mui/material';
import { ReactElement } from 'react';

export type AIconProps = {
  icon: ReactElement;
  color?: string;
  sx?: object;
};

const AIcon = ({ icon, color, sx }: AIconProps) => {
  return (
    <ListItemIcon
      sx={{
        color,
        ...sx,
      }}
    >
      {icon}
    </ListItemIcon>
  );
};

export default AIcon;
