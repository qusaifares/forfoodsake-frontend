import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import HomeHeader from './HomeHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Input, Grid } from '@material-ui/core/';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  search: {
    padding: 5,
  },
  container: {
    paddingBottom: 100,
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
}));

const Home = ({ hideSplash, splash }) => {
  const [vendors, setVendors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    handleSubmit();
  }, [searchString]);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  const handleSubmit = () => {
    setFiltered(
      vendors.filter((vendor) =>
        vendor.name.toLowerCase().match(searchString.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/vendors/`)
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        setFiltered(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="home" className={splash ? 'home-hidden' : null}>
      <HomeHeader searchString={searchString} handleChange={handleChange} />
      <Box className={classes.container}>
        <Grid container spacing={4}>
          {filtered.map((vendor) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                xl={3}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <ItemCard item={vendor} itemType="vendor" />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </section>
  );
};

export default Home;
