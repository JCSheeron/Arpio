import React from 'react';
import PropTypes from 'prop-types';

// Material-ui components
import Container from '@material-ui/core/Container';

// app components
import ChannelPreview from '../../ChannelPreview/ChannelPreview';
// Material-ui StylesProvider is used in Main.js which allows
// css style sheets (modules in this case) to override
// material-ui settings by injecting the material style tags first
// in the head element. By default they are injected last, overriding the
// css style sheets.
import styles from './Channels.css';

const handleConfigChannelClick = (event) => {
  console.log(event.currentTarget.id);
};

const Channels = ({ channels }) => {
  //  const classes = useStyles();
  let ch2 = { _id: 66766, name: 'Billiam', mode: 'input' };
  return (
    <main>
      <header>Header Section</header>
      <Container className={styles.channelContainer} maxWidth='lg'>
        {Object.keys(channels).map((key, i) => (
          <ChannelPreview
            key={i}
            channel={channels[key]}
            onConfigClick={handleConfigChannelClick}
          />
        ))}
      </Container>
      <footer>Footer Section</footer>
    </main>
  );
};

Channels.propTypes = {
  channels: PropTypes.object.isRequired
};

export default Channels;
