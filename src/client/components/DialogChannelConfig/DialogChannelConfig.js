import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const DialogChannelConfig = (props) => {
  const { open, channel, onClose, onConfig } = props;
  // local copy
  const [name, setName] = React.useState(channel.name);
  const [description, setDescription] = React.useState(channel.description);

  const handleClose = () => {
    console.log('Cancel Button Clicked or Dialog Closed');
    // set state back to passed in props
    setName(channel.name);
    setDescription(channel.description);
    onClose();
  };

  const handleConfig = () => {
    console.log('Config Button Clicked');
    channel.name = name;
    channel.description = description;
    console.log('Channel:');
    console.log(channel);
    onConfig(channel);
  };

  const handleNameChange = (event) => {
    // change just the state channel name
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    // change just the state channel name
    setDescription(event.target.value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='configure-channel-title'
      open={open}>
      <DialogTitle id='configure-channel-title'>
        Configure Channel {channel._id}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Instructions to the user</DialogContentText>
        <TextField
          margin='dense'
          id='name'
          label='Channel Name'
          type='text'
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          margin='dense'
          id='description'
          label='Channel Description'
          type='text'
          fullWidth
          multiline
          value={description}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfig} color='primary'>
          Config
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogChannelConfig.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  channel: PropTypes.object.isRequired
};

export default DialogChannelConfig;
