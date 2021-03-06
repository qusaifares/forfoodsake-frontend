import React, { useState } from 'react';
import {
  FormGroup,
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingBottom: 100,
  },
  iconContainer: {
    margin: '30px auto 0',
    display: 'grid',
    placeItems: 'center',
  },
  avatar: {
    background: '#f16642',
  },
  form: {
    minHeight: 446,
    width: 320,
    background: '#fff',
    borderRadius: 10,
    border: '1px solid #F16642',
  },
  tabs: {
    indicatorColor: 'blue',
    color: 'black',
    height: 48,
  },
}));

const AccountForm = ({ url, setUser }) => {
  // Account info fields
  const [emailString, setEmailString] = useState('');
  const [passwordString, setPasswordString] = useState('');
  const [nameString, setNameString] = useState('');
  const [confirmPasswordString, setConfirmPasswordString] = useState('');
  const [streetString, setStreetString] = useState('');
  const [cityString, setCityString] = useState('');
  const [stateString, setStateString] = useState('');
  const [zipCodeString, setZipCodeString] = useState('');
  const [typeString, setTypeString] = useState('');
  const [phoneString, setPhoneString] = useState('');
  const [descriptionString, setDescriptionString] = useState('');
  const [imageString, setImageString] = useState('');
  const [closingString, setClosingString] = useState('');

  // Validation
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validType, setValidType] = useState(true);

  // Switch between login and signup
  const [formType, setFormType] = useState(1);
  let history = useHistory();
  const classes = useStyles();

  // Signup steps
  const [signupStep, setSignupStep] = useState(1);
  const incrementSignup = () => {
    switch (signupStep) {
      case 1:
        if (
          !emailString ||
          !passwordString ||
          confirmPasswordString !== passwordString
        ) {
          setValidEmail(!!emailString);
          setValidPassword(!!passwordString);
          setPasswordMatch(confirmPasswordString === passwordString);
          return;
        }
        break;
      case 2:
        break;
      case 3:
        break;
      default:
    }
    setSignupStep(signupStep + 1);
  };

  const changeTabs = (e, newValue) => {
    setFormType(newValue);
    // reset fields
    setEmailString('');
    setPasswordString('');
    setConfirmPasswordString('');

    setSignupStep(1);

    // reset errors
    setValidEmail(true);
    setValidPassword(true);
    setPasswordMatch(true);
  };
  const signUp = (e) => {
    e.preventDefault();

    // fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/new`, {
    fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/new`, {
      method: 'POST',
      body: JSON.stringify({
        name: nameString,
        type: typeString,
        phone: phoneString,
        email: emailString,
        password: passwordString,
        closing_time: closingString,
        street: streetString,
        city: cityString,
        state: stateString,
        zip_code: zipCodeString,
        description: descriptionString,
        image: imageString,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // hiding password from state
        let tempUser = data;
        delete tempUser.password;
        setUser(tempUser);
        localStorage.setItem('userId', data.id.toString());
        history.push('/');
      });
  };
  const logIn = (e) => {
    e.preventDefault();
    // if email and password aren't empty, and password and confirmPassword match
    if (emailString && passwordString) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: emailString,
          password: passwordString,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res, err) => {
          if (err) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          // hiding password from state
          let tempUser = data;
          delete tempUser.password;
          setUser(tempUser);
          localStorage.setItem('userId', data.id);
          history.push('/');
        })
        .catch((err) => console.error(err));
    } else {
      setValidEmail(!!emailString); //true if string isnt empty
      setValidPassword(!!passwordString);
    }
  };

  return (
    <Box className={classes.container}>
      <FormGroup className={classes.form}>
        <Tabs
          onChange={changeTabs}
          value={formType}
          className={classes.tabs}
          variant="fullWidth"
          indicatorColor="primary"
        >
          <Tab label="Sign Up" className={classes.tab} />
          <Tab label="Log In" className={classes.tab} />
        </Tabs>
        <Box className={classes.iconContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formType ? 'Log In' : 'Sign Up'}
          </Typography>
        </Box>
        {formType ? (
          <LoginForm
            emailString={emailString}
            passwordString={passwordString}
            setEmailString={setEmailString}
            setPasswordString={setPasswordString}
            validEmail={validEmail}
            validPassword={validPassword}
            logIn={logIn}
          />
        ) : (
          <SignupForm
            // fields
            emailString={emailString}
            passwordString={passwordString}
            confirmPasswordString={confirmPasswordString}
            nameString={nameString}
            streetString={streetString}
            cityString={cityString}
            stateString={stateString}
            zipCodeString={zipCodeString}
            typeString={typeString}
            phoneString={phoneString}
            descriptionString={descriptionString}
            imageString={imageString}
            closingString={closingString}
            // set fields
            setEmailString={setEmailString}
            setPasswordString={setPasswordString}
            setConfirmPasswordString={setConfirmPasswordString}
            setNameString={setNameString}
            setStreetString={setStreetString}
            setCityString={setCityString}
            setStateString={setStateString}
            setZipCodeString={setZipCodeString}
            setTypeString={setTypeString}
            setPhoneString={setPhoneString}
            setDescriptionString={setDescriptionString}
            setImageString={setImageString}
            setClosingString={setClosingString}
            // validation
            validEmail={validEmail}
            validName={validName}
            validPassword={validPassword}
            passwordMatch={passwordMatch}
            validType={validType}
            // else
            signUp={signUp}
            signupStep={signupStep}
            incrementSignup={incrementSignup}
          />
        )}
      </FormGroup>
    </Box>
  );
};

export default AccountForm;
