import React from 'react';
import PropTypes from 'prop-types';

// Material-ui components
import Container from '@material-ui/core/Container';

// app components
import ChannelPreview from '../../ChannelPreview/ChannelPreview';
import DialogChannelConfig from '../../DialogChannelConfig/DialogChannelConfig';

// Material-ui StylesProvider is used in Main.js which allows
// css style sheets (modules in this case) to override
// material-ui settings by injecting the material style tags first
// in the head element. By default they are injected last, overriding the
// css style sheets.
import styles from './Channels.css';

const Channels = (props) => {
  const { channels, updateChannel } = props;

  // *** States related to configuring a channel and associated dialog
  const [dialogConfigOpen, setDialogConfigOpen] = React.useState(false);
  const [configChannel, setConfigChannel] = React.useState({});

  // *** Config button handler (launch dialog)
  const handleDialogOpen = (event) => {
    console.log(
      'Channels config button pressed launching dialog for a specific channel'
    );
    console.log('channels:');
    console.log(channels);
    console.log('Preview Config Pressed: Preview Config Handler in Channels');
    console.log('Id:');
    console.log(event.currentTarget.id);
    setConfigChannel(channels.current[event.currentTarget.id]);
    setDialogConfigOpen(true);
  };

  // *** Config Dialog Close handler
  // Update the channel only if a channel is passed in, otherwise just close
  const handleDialogClose = (channel) => {
    setDialogConfigOpen(false);
    console.log('Dialog Config Pressed: Dialog Config Handler in Channels');
    console.log('Channel from Dialog:');
    console.log(channel);
    if (channel) {
      updateChannel(channel);
    }
  };

  return (
    <main>
      <header>Header Section</header>
      <Container className={styles.channelContainer} maxWidth='lg'>
        {Object.keys(channels.current).map((key, i) => (
          <ChannelPreview
            key={i}
            channel={channels.current[key]}
            onConfigClick={handleDialogOpen}
          />
        ))}
      </Container>
      <DialogChannelConfig
        channel={configChannel}
        open={dialogConfigOpen}
        onClose={handleDialogClose}
      />
      <footer>Footer Section</footer>
    </main>
  );
};

Channels.propTypes = {
  channels: PropTypes.object.isRequired,
  updateChannel: PropTypes.func.isRequired
};

export default Channels;
