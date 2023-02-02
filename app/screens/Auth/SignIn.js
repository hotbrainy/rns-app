/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import React, {useEffect, useState} from 'react';
import styles from '../../styles';
import {Images} from '@assets';
import {login} from '../../actions';
import {useSelector, useDispatch} from 'react-redux';
import {forgotPassword} from '../../actions';

const SignIn = ({navigation}, props) => {
  const dispatch = useDispatch();
  const {user, login_state} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      // console.log('Singin: ', user);
    }
  }, [user]);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const validation = () => {
    var emailValid = false;
    if (email.length === 0) {
      setEmailError('Email is required');
    } else if (email.length < 6) {
      // setEmailError('Email should be minimum 6 characters');
    } else if (email.indexOf(' ') >= 0) {
      setEmailError('Email cannot contain spaces');
    } else if (reg.test(email) === false) {
      console.log('email format error');
      setEmailError('Email format is not correct');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError('Password is required');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
      passwordValid = true;
    }
    if (emailValid && passwordValid) {
      // alert('Email: ' + email + '\nPassword: ' + password);
      setEmail('');
      setPassword('');
      return true;
    } else {
      return false;
    }
  };
  const onSignIn = async () => {
    if (validation()) {
      dispatch(
        login(email, password, res => {
          // console.log(res);
          var data = res;
          if (!data.error) {
            Toast.showWithGravity(
              data.msg || 'Login Success!',
              Toast.SHORT,
              Toast.TOP,
            );
            // navigation.navigate('MainApp');
            dispatch(
              forgotPassword(email, res => {
                // console.log('forgotPasswordOne: ', res.data);
                if (res && res.data) {
                  var data = res.data;
                  if (data.error) {
                    Toast.showWithGravity(
                      data.msg || 'Send failed!',
                      Toast.SHORT,
                      Toast.TOP,
                    );
                  } else {
                    Toast.showWithGravity(
                      'Sent Successfully. Please check your email!',
                      Toast.SHORT,
                      Toast.TOP,
                    );
                    navigation.navigate('Otp', 'MainApp');
                    // navigation.navigate('Otp', {email});
                  }
                }
              }),
            );
          } else {
            Toast.showWithGravity(
              data.msg || 'Login failed',
              Toast.SHORT,
              Toast.TOP,
            );
          }
        }),
      );
    }
  };
  const gotoSignUp = () => {
    navigation.navigate('SignUp');
  };
  const gotoForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <ScrollView>
      <SafeAreaView
        style={{alignItems: 'center', backgroundColor: 'black', width: '100%'}}>
        <View style={{width: '100%', paddingBottom: 10}}>
          <Image
            source={Images.splash}
            style={{resizeMode: 'contain', width: '100%'}}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            padding: 10,
            paddingTop: 50,
            paddingBottom: 50,
            backgroundColor: '#1455F5',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={e => setEmail(e)}
            value={email}
          />
          {emailError.length > 0 && (
            <Text style={[styles.text_error, styles.text_align_left]}>
              {emailError}
            </Text>
          )}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={e => setPassword(e)}
            value={password}
          />
          {passwordError.length > 0 && (
            <Text style={[styles.text_error, styles.text_align_left]}>
              {' '}
              {passwordError}{' '}
            </Text>
          )}
          <Text
            style={[
              styles.text,
              styles.text_small,
              styles.text_color_white,
              styles.text_align_right,
            ]}
            onPress={gotoForgotPassword}>
            Forget your password
          </Text>
          <TouchableOpacity style={[styles.button]} onPress={onSignIn}>
            <Text style={[styles.text_banner, styles.text_color_white]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={[styles.text, styles.text_small, styles.text_color_white]}>
              Don't have an Account &nbsp;
              <Text
                onPress={gotoSignUp}
                style={[
                  styles.text,
                  styles.text_small,
                  styles.text_color_black,
                ]}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
