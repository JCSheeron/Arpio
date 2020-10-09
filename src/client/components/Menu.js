import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

//icons
import Icon from '@mdi/react';
import {
  mdiHome,
  mdiTabletDashboard,
  mdiCalendarClock,
  mdiCogs,
  mdiVideoInputComponent,
  mdiImport,
  mdiExport
} from '@mdi/js';

import MenuItem from './MenuItem';

// You can use a function if the Icon component has a lot of props, and use
// the function below in the menuItems.
// const IconDashboard = (props) => <Icon path={mdiTabletDashboard} size={1.5} />;
const menuItems = [
  {
    name: 'Home',
    link: '/',
    icon: <Icon path={mdiHome} size={1.5} />
  },
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <Icon path={mdiTabletDashboard} size={1.5} />
  },
  {
    name: 'Events',
    link: '/events',
    icon: <Icon path={mdiCalendarClock} size={1.5} />,
    divider: true
  },
  {
    name: 'Setup',
    icon: <Icon path={mdiCogs} size={1.5} />,
    items: [
      {
        name: 'Channels',
        link: '/channels',
        icon: <Icon path={mdiVideoInputComponent} size={1.5} />,
        items: [
          {
            name: 'Inputs',
            link: '/channels/inputs',
            icon: <Icon path={mdiImport} size={1.5} />
          },
          {
            name: 'Outputs',
            link: '/channels/outputs',
            icon: <Icon path={mdiExport} size={1.5} />
          }
        ]
      }
    ]
  }
];

// Use material-ui styles to define some styles
// makeStyles returns a hook to access class styles

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100%'
  },
  navList: {
    width: drawerWidth
  },
  menuItem: {
    width: drawerWidth
  },
  menuItemIcon: {
    color: '#97c05c'
  }
}));

const Menu = (props) => {
  // use hook from makeStyles to bring in styles
  const classes = useStyles();

  return (
    <List component='nav' className={classes.menu} disablePadding>
      {menuItems.map((item, index) => (
        <MenuItem {...item} key={index} />
      ))}
    </List>
  );
};

export default Menu;
