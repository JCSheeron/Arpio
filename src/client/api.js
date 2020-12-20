// Api logic
// Funcitons to fetch data the server.
// In general:
//  1) These functions are called from client components
//  2) These functions return axios promises.
//  3) axios.get(path, data) for example will send a request to
//  src/server/api/index.js router.get(path).  The router will send
//  back the data, and the axios promise that is returned, will return the
//  data from the router.
//  4) axios.post(path, data) will send a request to
//  src/server/api/index.js router.post(path, data, callback). The router
//  will update the data and return a response. The axios promise that
//  is returned will return the response from the server.

import axios from 'axios';
import { inspect } from 'util'; // console.log of objects

export const fetchEventList = () => {
  // axios returns a promise
  return axios.get('/api/events').then((resp) => resp.data.events);
};

export const fetchEvent = (eventId) => {
  return axios.get(`/api/events/${eventId}`).then((resp) => {
    // console.log('axios resp from api fetchEvent');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchChannelList = () => {
  // axios returns a promise
  return axios.get('/api/channels').then((resp) => resp.data.channels);
};

export const fetchChannel = (channelId) => {
  return axios.get(`/api/channels/${channelId}`).then((resp) => {
    return resp.data;
  });
};

export const fetchTriggers = (eventId) => {
  return axios.get(`/api/events/${eventId}/triggers`).then((resp) => {
    // console.log('axios resp from api fetchTriggers');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchTrigger = (eventId, triggerId) => {
  return axios.get(`/api/events/${eventId}/${triggerId}`).then((resp) => {
    // console.log('axios resp from api fetchTrigger');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchActions = (eventId, triggerId) => {
  return axios.get(`/api/events/${eventId}/${triggerId}`).then((resp) => {
    // console.log('axios resp from api fetchActions');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchAction = (eventId, triggerId, actionId) => {
  return axios
    .get(`/api/events/${eventId}/${triggerId}/${actionId}`)
    .then((resp) => {
      // console.log('axios resp from api fetchAction');
      // console.log(
      //  inspect(resp, { showHidden: false, depth: null, colors: true })
      //);
      return resp.data;
    });
};
export const addTrigger = (eventId, newTrigger) => {
  console.log(`api.js addTrigger.
    trigger: 
    ${inspect(newTrigger, { showHidden: false, depth: null, colors: true })}
    eventId: ${eventId}`);
  return axios
    .post(`/api/events/${eventId}/${newTrigger._id}`, { eventId, newTrigger })
    .then((resp) => resp.data);
};

export const updateChannel = (channelConfig) => {
  console.log(`api.js updateChannel
    channelConfig: 
    ${inspect(channelConfig, {
      showHidden: false,
      depth: null,
      colors: true
    })}`);
  return axios
    .post(`api/channels/${channelConfig._id}`, channelConfig)
    .then((resp) => {
      console.log('Resp logged from api.js/UpdateChannel Below');
      console.log(resp);
      console.log('Resp logged from api.js/UpdateChannel Above');
      return resp.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
