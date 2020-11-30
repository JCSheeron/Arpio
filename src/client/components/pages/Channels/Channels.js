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
  const [configId, setConfigId] = React.useState(-1);
  const [configChannel, setConfigChannel] = React.useState({});

  // *** Config button handler (launch dialog)
  const handleConfigChannelClick = (event) => {
    console.log('Preview Config Pressed: Preview Config Handler in Channels');
    console.log(event.currentTarget.id);
    setConfigId(event.currentTarget.id);
    setConfigChannel(channels[event.currentTarget.id]);
    setDialogConfigOpen(true);
  };

  // *** Config Dialog Handlers
  const handleDialogClose = () => {
    console.log('Cancel Pressed: Dialog Close Handler in Channels');
    setConfigChannel({});
    setDialogConfigOpen(false);
  };

  const handleDialogConfig = (channel) => {
    console.log('Dialog Config Pressed: Dialog Config Handler in Channels');
    console.log('Channel:');
    console.log(channel);
    setDialogConfigOpen(false);
    channels[configId].name = channel.name;
    channels[configId].description = channel.description;
  };

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
      <DialogChannelConfig
        channel={configChannel}
        open={dialogConfigOpen}
        onClose={handleDialogClose}
        onConfig={handleDialogConfig}
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
