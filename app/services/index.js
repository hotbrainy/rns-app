import axios from 'axios';
import {LOGIN_SUCCESS, FORGOT_PASSWORD_USER, BASEURL} from '@constants';
import {call} from 'react-native-reanimated';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const httpRequestPost = (action_page, params = null) => {
  var url = BASEURL + action_page;
  return new Promise(function (resolve, reject) {
    axios
      .post(url, params, {
        headers: headers,
      })
      .then(response => response)
      .then(data => resolve(data))
      .catch(err => {
        console.log('Request error: ', JSON.stringify({url, params, err}));
        reject(err);
      });
  });
};
