import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';

import { Home, VpnKey, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const { PUBLIC_URL } = process.env;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    height: 80,
    margin: '30px auto',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const SideNav = ({ user }) => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Drawer
        PaperProps={{
          style: {
            background: '#f16642',
            color: 'white',
          },
        }}
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img
          src={`${PUBLIC_URL}/images/splash-logo.svg`}
          alt=""
          className={classes.logo}
        />
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon style={{ color: 'white' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {user ? (
            <ListItem button component={Link} to={`/vendors/${user.id}`}>
              <ListItemIcon style={{ color: 'white' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          ) : null}
          <ListItem button component={Link} to="/login">
            <ListItemIcon style={{ color: 'white' }}>
              <VpnKey />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </ListItem>
        </List>
      </Drawer>
    </Hidden>
  );
};

export default SideNav;
