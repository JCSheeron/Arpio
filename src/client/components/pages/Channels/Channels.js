import React, { Component } from 'react';

import clsx from 'clsx';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

// Material-ui StylesProvider is used in Main.js which allows
// css style sheets (modules in this case) to override
// material-ui settings by injecting the material style tags first
// in the head element. By default they are injected last, overriding the
// css style sheets.
import styles from './Channels.css';

const Channels = (props) => {
  //  const classes = useStyles();
  return (
    <main>
      <header>Header Section</header>
      <Container className={styles.channelContainer} maxWidth='lg'>
        <Paper elevation={3} className={styles.channelItem}>
          2
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          3
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          4
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          5
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          6
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          7
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          8
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          9
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          10
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          11
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          12
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          13
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          14
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          15
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          16
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          17
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          18
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          19
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          20
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          21
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          22
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          23
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          24
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          25
        </Paper>
        <Paper elevation={3} className={styles.channelItem}>
          26
        </Paper>
      </Container>
      <footer>Footer Section</footer>
    </main>
  );
};

export default Channels;

