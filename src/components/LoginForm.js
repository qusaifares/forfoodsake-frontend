import React from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  formContent: {
    padding: '15px 20px',
    minHeight: 160,
    display: 'flex',
    justifyContent: 'space-around',
    height: 272,
    flexDirection: 'column',
  },
  inputField: {
    marginBottom: 35,
  },
  submitLogin: {
    margin: '30px auto',
    width: 200,
    background: '#F16642',
    '&:hover': {
      background: '#F16642',
    },
  },
}));

const LoginForm = ({
  emailString,
  passwordString,
  setEmailString,
  setPasswordString,
  validEmail,
  validPassword,
  logIn,
}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.formContent}>
        <FormControl error={!validEmail} className={classes.inputField}>
          <TextField
            required
            variant="outlined"
            value={emailString}
            onChange={(e) => setEmailString(e.target.value)}
            InputProps={{
              type: 'text',
            }}
            label="Email"
          />
          {validEmail ? null : (
            <FormHelperText>Please enter email</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!validPassword} className={classes.inputField}>
          <TextField
            required
            variant="outlined"
            value={passwordString}
            onChange={(e) => setPasswordString(e.target.value)}
            InputProps={{
              type: 'password',
            }}
            label="Password"
          />
          {validPassword ? null : (
            <FormHelperText>Please enter password</FormHelperText>
          )}
        </FormControl>
      </Box>
      <FormControl>
        <Button
          className={classes.submitLogin}
          variant="contained"
          color="secondary"
          onClick={logIn}
        >
          Log In
        </Button>
      </FormControl>
    </>
  );
};

export default LoginForm;
