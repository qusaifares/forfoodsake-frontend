import React, { useState, useEffect } from 'react';
import Map from './Map';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  IconButton,
  InputLabel,
  Grid,
  Container,
} from '@material-ui/core/';
import FoodListItem from './FoodListItem';
import ItemCard from './ItemCard';

const VendorProfile = ({ match, user, setUser }) => {
  const [vendor, setVendor] = useState();
  const [formattedPhone, setFormattedPhone] = useState();
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/${match.params.id}`)
    fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVendor(data);
      })
      .catch((err) => console.error(err));
  }, [match.params.id]);
  useEffect(() => {
    // formatting phone (XXX) XXX-XXXX
    let tempArr = [];
    if (!user || !user.phone) {
      return;
    }
    for (let i = 0; i < user.phone.length; i++) {
      if (i === 0) {
        tempArr.push('(');
      }
      if (i === 3) {
        tempArr.push(')');
        tempArr.push(' ');
      }
      if (i === 6) {
        tempArr.push('-');
      }
      tempArr.push(user.phone.charAt(i));
    }

    setFormattedPhone(tempArr.join(''));
  }, [user]);

  const classes = useStyles();

  if (vendor) {
    return (
      <Container className={classes.container}>
        <img src={vendor.image} alt="vendor profile" className={classes.img} />
        <Box className={classes.vendorInfo}>
          {user && user.id === vendor.id ? (
            <InputLabel className={classes.edit} htmlFor="icon-button-file">
              <IconButton
                aria-label="upload picture"
                component={Link}
                to="/edit/account"
              >
                <EditIcon className={classes.icon} />
              </IconButton>
            </InputLabel>
          ) : null}
          <h2>{vendor.name}</h2>
          <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
          <Typography className={classes.address}>
            {vendor.street}
            <br />
            {vendor.city} {vendor.state}
            <br />
            {vendor.zip_code}
          </Typography>
          <p>{formattedPhone}</p>
        </Box>
        <Box className={classes.description}>{vendor.description}</Box>
        <Map user={vendor} />
        {user && user.id === vendor.id ? (
          <Box className={classes.addContainer}>
            <Link to="/newlisting">
              <Button
                className={classes.add}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add listing
              </Button>
            </Link>
          </Box>
        ) : null}

        <Grid container spacing={4} className={classes.listingGrid}>
          {vendor.Listings.map((listing) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
              key={`${vendor.id}-${listing.id}`}
              className={classes.listingGridItem}
            >
              <ItemCard item={listing} itemType="listing" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <Box></Box>;
  }
};

const useStyles = makeStyles(() => ({
  edit: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    fontSize: 32,
    color: '#F16642',
  },
  img: {
    width: '100%',
    minHeight: 300,
    maxHeight: '40vh',
    objectFit: 'contain',
  },
  vendorInfo: {
    borderBottom: '1px solid #bbb',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    margin: '0 auto',
    width: 'calc(100% - 4rem)',
    position: 'relative',
  },
  address: {
    lineHeight: 1.4,
  },
  description: {
    margin: '0 auto',
    fontSize: '1.2rem',
    lineHeight: '1.4',
    width: 'calc(100% - 4rem)',
    padding: '2rem 1rem',
  },
  listingGrid: {
    marginTop: 30,
  },
  listingGridItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  update: {
    margin: '2%',
    backgroundColor: '#b6d2c4',
  },
  addContainer: {
    marginTop: 40,
    paddingRight: 40,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default VendorProfile;
