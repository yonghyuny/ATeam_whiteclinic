import { ListItem } from '@mui/material';
import AIcon, { AIconProps } from '@/components/atom/Icon/AIcon';
import ALabel, { ALabelProps } from '@/components/atom/Label/ALabel';
import { TitleMenuIconStyle } from '@/styles/mui';

export type TitleMenuBoxProps = {
  iconprops: AIconProps;
  labelprops: ALabelProps;
};

const TitleMenuBox = ({ iconprops, labelprops }: TitleMenuBoxProps) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <AIcon
        {...iconprops}
        sx={{
          ...TitleMenuIconStyle,
        }}
      />
      <ALabel {...labelprops} fontSize="small" />
    </ListItem>
  );
};

export default TitleMenuBox;
