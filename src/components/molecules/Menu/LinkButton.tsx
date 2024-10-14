import AIcon, { AIconProps } from '@/components/atom/Icon/AIcon';
import ALabel, { ALabelProps } from '@/components/atom/Label/ALabel';
import { colors } from '@/styles/colors';
import { LinkButtonHoverStyle } from '@/styles/mui';
import { ListItemButton } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type ALinkButtonProps = {
  iconprops: AIconProps;
  labelprops: ALabelProps;
  href: string;
  sx?: object;
};

const LinkButton = ({ iconprops, labelprops, href }: ALinkButtonProps) => {
  const pathname = usePathname();
  return (
    <Link href={href} passHref style={{ textDecoration: 'none' }}>
      <ListItemButton
        sx={{
          color: pathname === href ? colors.text.active : colors.text.inActive,
          ':hover': {
            '& .MuiListItemIcon-root, & .MuiListItemText-root': {
              color: colors.text.active,
            },
          },
        }}
      >
        <AIcon
          {...iconprops}
          sx={{
            ...LinkButtonHoverStyle,
            color: pathname === href ? colors.text.active : colors.text.inActive,
          }}
        />
        <ALabel
          {...labelprops}
          sx={{
            ...LinkButtonHoverStyle,
            color: pathname === href ? colors.text.active : colors.text.inActive,
          }}
        />
      </ListItemButton>
    </Link>
  );
};

export default LinkButton;
