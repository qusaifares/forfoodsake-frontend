import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    map: {
        width: '100%',
        height: 190,
        border: 0
    }
}));

const Map = ({ user }) => {
    const classes = useStyles();
    return (
        <iframe
            title="map"
            className={classes.map}
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=${
                process.env.REACT_APP_GMAPS_KEY
            }&q=${encodeURIComponent(
                `${user.street}, ${user.city}, ${user.state} ${user.zip_code}`
            )}`}
            allowFullScreen
        ></iframe>
    );
};

export default Map;
