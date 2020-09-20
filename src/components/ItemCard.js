import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  IconButton,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  Button,
} from '@material-ui/core/';
import { ExpandMore, Favorite, Share } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: 0,
  },
  media: {
    height: 160,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  container: {
    padding: '10px 10px 100px 10px',
    minHeight: '100vh',
  },
  actions: {
    marginTop: 'auto',
  },
}));

const cardHeaderStyle = {
  fontSize: '0.875rem',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 400,
  lineHeight: 1.43,
  letterSpacing: '0.01071em',
};

const ItemCard = ({ item, itemType }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.name}
      />
      <CardHeader
        title={item.name}
        subheader={
          itemType === 'vendor'
            ? `${item.street}, ${item.city}, ${item.state} ${item.zip_code}`
            : undefined
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          to={`/vendors/${
            itemType === 'vendor'
              ? item.id
              : `${item.VendorId}/listings/${item.id}`
          }`}
          size="small"
          color="primary"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
