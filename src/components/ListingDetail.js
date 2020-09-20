import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';
const useStyles = makeStyles({
  container: {
    paddingBottom: 100,
  },
  media: {
    width: '100%',
    minHeight: 300,
    maxHeight: '40vh',
    objectFit: 'contain',
  },
  listingInfo: {
    borderBottom: '1px solid #bbb',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    margin: '0 auto',
  },
  info1: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    maxWidth: 220,
  },
  price: {
    fontSize: '1.2rem',
    transform: 'translateY(-5px)',
  },
  description: {
    margin: '40px auto',
    fontSize: '1.2rem',
    lineHeight: '1.4',
  },
});
const ListingDetail = ({ user, match }) => {
  const classes = useStyles();
  const [vendor, setVendor] = useState();
  const [listing, setListing] = useState();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/vendors/${match.params.vendorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setVendor(data);
        setListing(
          data.Listings.find(
            (listing) => listing.id === parseInt(match.params.listingId)
          )
        );
      })
      .catch((err) => console.error(err));

    return cleanUp();
  }, [match.params.listingId, match.params.vendorId]);

  const cleanUp = () => {
    setVendor(null);
    setListing(null);
  };
  if (listing) {
    return (
      <Box className={classes.container}>
        <img src={listing.image} alt="food" className={classes.media} />
        <Container>
          <Box className={classes.listingInfo}>
            <Box className={classes.info1}>
              <Typography
                className={classes.name}
                gutterBottom
                variant="h5"
                component="h5"
              >
                {listing.name}
              </Typography>
              <Typography className={classes.price}>
                ${listing.price}
              </Typography>
            </Box>
            <Typography className={classes.closing}>
              Pick up by {vendor.closing_time}
            </Typography>
            <Typography>
              {vendor.street}, {vendor.city}, {vendor.state} {vendor.zip_code}
            </Typography>
          </Box>
          <Typography className={classes.description}>
            {listing.description}
          </Typography>
          {vendor ? <Map user={vendor} /> : null}

          {user && user.id === listing.VendorId ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                // onClick={deleteListing}
              >
                Delete Listing
              </Button>
              <Link to={`/edit/listing/${listing.id}`}>
                <Button variant="outlined" color="primary">
                  Update Listing
                </Button>
              </Link>
            </>
          ) : null}
        </Container>
      </Box>
    );
  } else {
    return null;
  }
};

export default ListingDetail;
