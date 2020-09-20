import React from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const states = require('./states.json');

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: 20,
  },
  selectField: {
    marginBottom: 20,
  },
  selectLabel: {
    left: 14,
  },
  formContent: {
    maxWidth: '100%',
    padding: '15px 20px',
    minHeight: 140,
    height: 272,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
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

const SignupForm = (props) => {
  const classes = useStyles();
  if (props.signupStep === 1) {
    return (
      <>
        <Box className={classes.formContent}>
          <FormControl error={!props.validEmail} className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.emailString}
              onChange={(e) => props.setEmailString(e.target.value)}
              label="Email"
              InputProps={{ type: 'email' }}
              aria-describedby="my-helper-text"
            />
            {props.validEmail ? null : (
              <FormHelperText>Please enter email</FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={!props.validPassword}
            className={classes.inputField}
          >
            <TextField
              variant="outlined"
              required
              value={props.passwordString}
              onChange={(e) => props.setPasswordString(e.target.value)}
              InputProps={{ type: 'password' }}
              label="Password"
            />
            {props.validPassword ? null : (
              <FormHelperText>Please enter password</FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={!props.passwordMatch}
            className={classes.inputField}
          >
            <TextField
              variant="outlined"
              required
              value={props.confirmPasswordString}
              onChange={(e) => props.setConfirmPasswordString(e.target.value)}
              InputProps={{ type: 'password' }}
              label="Confirm Password"
            />
            {props.passwordMatch ? null : (
              <FormHelperText>Passwords must match</FormHelperText>
            )}
          </FormControl>
        </Box>
        <FormControl>
          <Button
            className={classes.submitLogin}
            variant="contained"
            color="secondary"
            onClick={props.incrementSignup}
          >
            Continue
          </Button>
        </FormControl>
      </>
    );
  } else if (props.signupStep === 2) {
    return (
      <>
        <Box className={classes.formContent}>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              error={!props.validName}
              value={props.nameString}
              onChange={(e) => props.setNameString(e.target.value)}
              label="Name"
              InputProps={{ type: 'text' }}
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.phoneString}
              onChange={(e) => props.setPhoneString(e.target.value)}
              InputProps={{
                type: 'tel',
                pattern: '[1-9]{1}[0-9]{9}',
              }}
              label="Phone Number"
            />
          </FormControl>
          <FormControl error={!props.validType} className={classes.selectField}>
            <InputLabel className={classes.selectLabel} htmlFor="type">
              Vendor Type
            </InputLabel>
            <Select
              variant="outlined"
              value={props.typeString}
              onChange={(e) => props.setTypeString(e.target.value)}
              id="type"
            >
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Farm">Farm</MenuItem>
              <MenuItem value="Market">Market</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl>
          <Button
            className={classes.submitLogin}
            variant="contained"
            color="secondary"
            onClick={props.incrementSignup}
          >
            Continue
          </Button>
        </FormControl>
      </>
    );
  } else if (props.signupStep === 3) {
    return (
      <>
        <Box className={classes.formContent}>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.streetString}
              onChange={(e) => props.setStreetString(e.target.value)}
              label="Street"
              InputProps={{ type: 'text' }}
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.cityString}
              onChange={(e) => props.setCityString(e.target.value)}
              label="City"
              InputProps={{ type: 'text' }}
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl className={classes.selectField}>
            <InputLabel className={classes.selectLabel} htmlFor="state">
              State
            </InputLabel>
            <Select
              variant="outlined"
              value={props.stateString}
              onChange={(e) => props.setStateString(e.target.value)}
              id="state"
            >
              {states.map((state) => (
                <MenuItem value={state.abbreviation}>{state.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.zipCodeString}
              onChange={(e) => props.setZipCodeString(e.target.value)}
              label="Zip Code"
              InputProps={{ type: 'text' }}
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </Box>
        <FormControl>
          <Button
            className={classes.submitLogin}
            variant="contained"
            color="secondary"
            onClick={props.incrementSignup}
          >
            Continue
          </Button>
        </FormControl>
      </>
    );
  } else if (props.signupStep === 4) {
    return (
      <>
        <Box className={classes.formContent}>
          <FormControl className={classes.inputField}>
            <TextField
              variant="outlined"
              required
              value={props.descriptionString}
              onChange={(e) => props.setDescriptionString(e.target.value)}
              multiline
              rows="4"
              label="Description"
              InputProps={{ type: 'text' }}
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </Box>
        <FormControl>
          <Button
            className={classes.submitLogin}
            variant="contained"
            color="secondary"
            onClick={props.signUp}
          >
            Sign Up
          </Button>
        </FormControl>
      </>
    );
  } else {
    return <Box>{props.signupStep}</Box>;
  }
};

export default SignupForm;
