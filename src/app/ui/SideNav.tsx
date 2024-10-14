'use client';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { DrawerMuiStyle, DrawerToolbarMuiStyle } from '@/styles/mui';
import { logoData } from '@/constants/logoData';
import ASideMenuBox from '@/components/organism/Menu/ASideMenuBox';
import ALogoIcon from '@/components/atom/Icon/ALogoIcon';

const SideNav = () => {
  return (
    <Drawer sx={{ ...DrawerMuiStyle }} variant="permanent" anchor="left">
      <Toolbar
        sx={{
          ...DrawerToolbarMuiStyle,
        }}
      >
        <ALogoIcon {...logoData} />
      </Toolbar>
      <List>
        <ASideMenuBox />
      </List>
    </Drawer>
  );
};

export default SideNav;
