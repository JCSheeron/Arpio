import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material-ui components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// styles
// Material-ui StylesProvider is used in Main.js which allows
// css style sheets (modules in this case) to override
// material-ui settings by injecting the material style tags first
// in the head element. By default they are injected last, overriding the
// css style sheets.
import styles from './ChannelPreview.scss';

const ChannelPreview = ({ channel, onConfigClick }) => {
  // named arrow function to handle the click event, and pass the
  // id back to the parent.
  return (
    <Card className={styles.channelContainer} variant='outlined'>
      <CardContent>
        <Typography
          className={styles.label}
          variant='h2'
          color='textSecondary'
          gutterBottom>
          Channel
        </Typography>
        <Typography className={styles.id}>{channel._id}</Typography>
        <Typography
          className={styles.label}
          variant='h3'
          color='textSecondary'
          gutterBottom>
          Name
        </Typography>
        <Typography className={styles.details}>{channel.name}</Typography>
        <Typography
          className={styles.label}
          variant='h3'
          color='textSecondary'
          gutterBottom>
          Mode
        </Typography>
        <Typography className={clsx(styles.details, styles.detailslast)}>
          {channel.mode}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button
          className={styles.btnCfg}
          variant='outlined'
          size='small'
          id={channel._id}
          onClick={onConfigClick}>
          Configure
        </Button>
      </CardActions>
    </Card>
  );
};

ChannelPreview.propTypes = {
  channel: PropTypes.object.isRequired,
  onConfigClick: PropTypes.func.isRequired
};

export default ChannelPreview;
