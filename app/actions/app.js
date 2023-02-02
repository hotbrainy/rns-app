import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_USER,
  BASEURL,
  ADD_TO_CART,
  REMOVE_USER_DATA,
} from '@constants';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const httpRequestPost = (action_page, params = null) => {
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

export const getUser = payload => ({type: LOGIN_SUCCESS, payload});

export const loginSuccess = user => dispatch => {
  dispatch({type: LOGIN_SUCCESS, data: user});
};

export const logoutAction = () => dispatch => {
  dispatch({type: LOGIN_SUCCESS, data: {}});
};

export const login = (email, password, callback) => async dispatch => {
  const params = {
    func: 'login',
    email: email,
    password: password,
  };

  httpRequestPost('users.php', params).then(res => {
    if (res && res.data) {
      var data = res.data;
      let user = {};
      for (let i in data) {
        if (i === '0') {
          user = data[i];
        }
      }
      if (data.error) {
        dispatch({type: LOGIN_SUCCESS, data: {}});
      } else {
        dispatch({type: LOGIN_SUCCESS, data: {email, password, user}});
      }
      if (callback) {
        callback(data);
      }
    }
  });
};

export const signup =
  (email, password, role, first_name, last_name, dob, gender, callback) =>
  dispatch => {
    const params = {
      func: 'signup',
      email: email,
      password: password,
      role: role,
      first_name: first_name,
      last_name: last_name,
      dob: dob,
      gender: gender,
    };
    httpRequestPost('users.php', params)
      .then(res => callback(res))
      .catch(callback());
  };

export const getUserById = (user_id, callback) => dispatch => {
  const params = {
    func: 'fetchUser_id',
    id: user_id,
  };
  httpRequestPost('users.php', params).then(res => {
    if (res && res.data) {
      var data = res.data;
      let user = {};
      for (let i in data) {
        if (i === '0') {
          user = data[i];
        }
      }
      // if (data.error) {
      //   dispatch({type: LOGIN_SUCCESS, data: {}});
      // } else {
      //   dispatch({type: LOGIN_SUCCESS, data: {user}});
      // }
      if (callback) {
        callback(data);
      }
    }
  });
};

export const forgotPassword = (email, callback) => dispatch => {
  const params = {
    func: 'forgot_password_one',
    email: email,
  };
  httpRequestPost('users.php', params)
    .then(res => {
      if (res && res.data) {
        var data = res.data;
        if (!data.error) {
          dispatch({type: FORGOT_PASSWORD_USER, data: {email}});
        } else {
          dispatch({type: FORGOT_PASSWORD_USER, data: {}});
        }
        callback(res);
      }
    })
    .catch(callback());
};

export const forgotPassword2 = (email, code, callback) => dispatch => {
  const params = {
    func: 'forgot_password_second',
    email: email,
    code: code,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(callback());
};

export const emailVerify = (email, code, callback) => dispatch => {
  const params = {
    func: 'email_verify',
    email: email,
    code: code,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(callback());
};

export const forgotPassword3 = (email, password, callback) => dispatch => {
  const params = {
    func: 'forgot_password_third',
    email: email,
    password: password,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(callback());
};

export const getAllPost = (user_id, callback) => dispatch => {
  const params = {
    func: 'posts',
    user_id: user_id,
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const addPost = (user_id, content, tags, callback) => dispatch => {
  const params = {
    func: 'new_post',
    user_id: user_id,
    content: content,
    tags: tags,
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const deletePost = (post_id, callback) => dispatch => {
  const params = {
    func: 'delete_post',
    id: post_id,
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const getPostById = (post_id, callback) => dispatch => {
  const params = {
    func: 'fetch_post_id',
    id: post_id,
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const fetchFollowers = (user_id, callback) => dispatch => {
  const params = {
    func: 'fetch_followers',
    user_id: user_id,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const fetchFriends = (user_id, callback) => dispatch => {
  const params = {
    func: 'fetch_friends',
    user_id: user_id,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const updateLikes = (user_id, post_id, likes, callback) => dispatch => {
  const params = {
    func: 'update_likes',
    user_id: user_id,
    post_id: post_id,
    likes: likes,
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const updateBookmark =
  (user_id, post_id, bookmark, callback) => dispatch => {
    const params = {
      func: 'update_bookmark',
      user_id: user_id,
      post_id: post_id,
      bookmark: bookmark,
    };
    httpRequestPost('posts.php', params)
      .then(res => callback(res))
      .catch(err => console.log(err));
  };

export const postComment = (user_id, post_id, lcb, data, callback) => dispatch => {
  console.log("LCB data==>>>", user_id, post_id, lcb, data);
  const params = {
    func: 'insert_user_lcb',
    user_id: user_id,
    post_id: post_id,
    likes: lcb === 'like' ? data : '',
    bookmark: lcb === 'bookmark' ? data : '',
    comment: lcb === 'comment' ? data : '',
  };
  httpRequestPost('posts.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const fetchUserNotifications = (user_id, callback) => dispatch => {
  const params = {
    func: 'fetch_user_notifications',
    user_id: user_id,
  };
  httpRequestPost('users.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const getPages = callback => dispatch => {
  const params = {
    func: 'pages',
  };
  httpRequestPost('pages.php', params)
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const addToCart = async (dispatch, data) => {
  dispatch({type: ADD_TO_CART, payload: data});
};

export const removeUserData = async dispatch => {
  // console.log('removeItem', JSON.parse(AsyncStorage.getItem('whsnxt_user_data')));
  try {
    await AsyncStorage.removeItem('whsnxt_user_data');
  } catch (e) {
    console.log(e);
  }
  dispatch({type: REMOVE_USER_DATA, payload: {}});
};
