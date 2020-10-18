import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';

// import Icon from '@mdi/react';
//import { mdiTabletDashboard } from '@mdi/js';
// import { AccessAlarm } from '@material-ui/icons';

// React runtime PropTypes
export const MenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  icon: PropTypes.element,
  items: PropTypes.array,
  divider: PropTypes.bool
};

const MenuItem = (props) => {
  const { name, icon, link, divider, items = [] } = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // MenuLink is a functional component that returns a react router Link.
  // The NavLink "to" prop needs to match the path specified in the Route
  // element in Main.js
  // The return is constant (via useMemo) unless the "to" link changes.
  // This is to prevent re-rendering problems with passing custom components
  // to a react ListItem.
  // forwardRef passes the props and refs of MenuItemRoot to the
  // NavLink child of MenuLink.
  const MenuLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => {
        return <NavLink to={link} ref={ref} {...itemProps} />;
      }),
    [link]
  );

  const MenuItemRoot = (link) => {
    // If link is not set, return an ordinary list item
    if (!link || typeof link !== 'string') {
      return (
        <ListItem
          button // component type defaults to div when button is true
          className={classes.menuItem}
          divider={divider}
          onClick={handleClick}>
          {/* Display an icon if any */}
          {icon && (
            <ListItemIcon className={classes.menuItemIcon}>{icon}</ListItemIcon>
          )}
          <ListItemText primary={name} inset={!icon} />

          {/* Display the expand menu if the item has children */}
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </ListItem>
      );
    }

    return (
      // Link is set, and is a string, return a list item with a link
      <ListItem
        button
        component={MenuLink}
        className={classes.menuItem}
        divider={divider}
        onClick={handleClick}>
        {/* Display an icon if any */}
        {icon && (
          <ListItemIcon className={classes.menuItemIcon}>{icon}</ListItemIcon>
        )}
        <ListItemText primary={name} inset={!icon} />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </ListItem>
    );
  };

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout='auto' unmountOnExit>
      <Divider />
      <List component='div' disablePadding>
        {items.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot(link)}
      {MenuItemChildren}
    </>
  );
};

MenuItem.propTypes = MenuItemPropTypes;

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {},
    menuItemIcon: {
      color: '#97c05c'
    }
  })
);

export default MenuItem;