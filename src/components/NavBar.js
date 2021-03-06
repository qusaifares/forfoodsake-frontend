import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F16642',
    height: 56,
  },
  navIcon: {
    color: 'white',
  },
}));

const NavBar = ({ user }) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  return (
    <Hidden smUp>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
        id="nav"
      >
        <BottomNavigationAction
          component={Link}
          className={classes.navIcon}
          to="/login"
          label="Login"
          icon={<VpnKeyIcon />}
        />
        <BottomNavigationAction
          component={Link}
          className={classes.navIcon}
          to="/"
          label="Home"
          icon={<HomeIcon />}
        />
        {user ? (
          <BottomNavigationAction
            component={Link}
            className={classes.navIcon}
            to={`/vendors/${user.id}`}
            label="Profile"
            icon={<PersonIcon />}
          />
        ) : null}
      </BottomNavigation>
    </Hidden>
  );
};
export default NavBar;
