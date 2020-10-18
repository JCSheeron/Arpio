import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: 20,
    marginTop: 15,
    background: '#fc3'
  }
}));

const Channels = (props) => {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container justify='center' spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Paper className={classes.control}>
          <div>
            <FormLabel>spacing</FormLabel>
            <RadioGroup
              name='spacing'
              aria-label='spacing'
              value={spacing.toString()}
              onChange={handleChange}
              row>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Channels;
