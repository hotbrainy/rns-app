/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../styles';
import {Images, Fonts} from '@assets';
import {signup, forgotPassword} from '@actions';
import Toast from 'react-native-simple-toast';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
// import {TextInput} from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';

const radioButtonData = [
  {
    id: '1',
    label: 'Talent',
    value: 'talent',
    labelStyle: {color: '#fff', fontSize: Fonts.defaultFontSize},
    color: '#fff',
  },
  {
    id: '2',
    label: 'User',
    labelStyle: {color: '#fff', fontSize: Fonts.defaultFontSize},
    value: 'user',
    color: '#fff',
  },
];

const signingRadioButtonData = [
  {
    id: '11',
    label:
      'By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.',
    value: 'policy',
    labelStyle: {
      color: '#fff',
      fontSize: Fonts.defaultFontSize,
      paddingRight: 20,
      lineHeight: 16,
    },
    color: '#fff',
  },
];

const MM = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
// const YY = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
const _gender = ['male', 'female'];

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [radioButtons, setRadioButtons] = useState(radioButtonData);
  const [signingRadioButtons, setSigningRadioButtons] = useState(
    signingRadioButtonData,
  );
  const [DD, setDD] = useState([]);
  const [YY, setYY] = useState([]);

  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signing, setSigning] = useState(false);
  const [birthDD, setBirthDD] = useState('');
  const [birthMM, setBirthMM] = useState('');
  const [birthYY, setBirthYY] = useState('');
  const [gender, setGender] = useState('');

  const [errorUserType, setErrorUserType] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorSecondeName, setErrorSecondName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorSigning, setErrorSigning] = useState('');
  const [errorBirth, setErrorBirth] = useState('');
  const [errorGender, setErrorGender] = useState('');

  useEffect(() => {
    var arrDD = [],
      arrYY = [];
    for (let i = 1; i <= 31; i++) {
      arrDD.push(i);
    }
    for (let i = 2023; i >= 1940; i--) {
      arrYY.push(i);
    }
    setDD(arrDD);
    setYY(arrYY);
  }, []);

  function validation() {
    var userTypeValid = false;
    if (userType === '') {
      setErrorUserType('Please select user type');
    } else {
      setErrorUserType('');
      userTypeValid = true;
    }

    var firstNameValid = false;
    if (firstName.length === 0) {
      setErrorFirstName('First Name is required');
    } else if (firstName.length < 3) {
      setErrorFirstName('First Name should be minimum 3 characters');
    } else if (firstName.indexOf(' ') >= 0) {
      setErrorFirstName('First Name cannot contain spaces');
    } else {
      setErrorFirstName('');
      firstNameValid = true;
    }

    var secondNameValid = false;
    if (secondName.length === 0) {
      setErrorSecondName('Last Name is required');
    } else if (secondName.length < 3) {
      setErrorSecondName('Last Name should be minimum 3 characters');
    } else if (secondName.indexOf(' ') >= 0) {
      setErrorSecondName('Last Name cannot contain spaces');
    } else {
      setErrorSecondName('');
      secondNameValid = true;
    }

    var emailValid = false;
    if (email.length === 0) {
      setErrorEmail('Email is required');
    } else if (email.length < 6) {
      // setErrorEmail('Email should be minimum 6 characters');
    } else if (email.indexOf(' ') >= 0) {
      setErrorEmail('Email cannot contain spaces');
    } else if (emailReg.test(email) === false) {
      console.log('email format error');
      setErrorEmail('Email format is not correct');
    } else {
      setErrorEmail('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setErrorPassword('Password is required');
    } else if (password.length < 6) {
      setErrorPassword('Password should be minimum 6 characters');
    } else {
      setErrorPassword('');
      passwordValid = true;
    }

    var confirmPasswordValid = false;
    if (confirmPassword.length === 0) {
      setErrorConfirmPassword('Password is required');
    } else if (confirmPassword.length < 6) {
      setErrorConfirmPassword('Password should be minimum 6 characters');
    } else if (confirmPassword !== password) {
      setErrorConfirmPassword('Password is not matched');
    } else {
      setErrorConfirmPassword('');
      confirmPasswordValid = true;
    }

    var signingValid = false;
    if (signing === false) {
      setErrorSigning('Signing is required');
    } else {
      setErrorSigning('');
      signingValid = true;
    }

    var birthValid = false;
    if (birthDD === '' || birthMM === '' || birthYY === '') {
      setErrorBirth('Please select birthday');
    } else {
      setErrorBirth('');
      birthValid = true;
    }

    var genderValid = false;
    if (gender === '') {
      setErrorGender('Please select gender');
    } else {
      setErrorGender('');
      genderValid = true;
    }

    if (
      userTypeValid &&
      firstNameValid &&
      secondNameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      signingValid &&
      birthValid &&
      genderValid
    ) {
      // alert('Email: ' + email + '\nPassword: ' + password);
      // setEmail('');
      // setPassword('');
      return true;
    } else {
      return false;
    }
  }

  function onPressAccountTypeRadioButton(radioButtonArray) {
    radioButtonArray.map(item => {
      if (item.selected) {
        setUserType(item.id);
      }
    });
    setRadioButtons(radioButtonArray);
  }

  function onPressSigningRadioButton(radioButtonArray) {
    radioButtonArray.map(item => {
      if (item.selected) {
        setSigning(true);
      } else {
        setSigning(false);
      }
    });
    setSigningRadioButtons(radioButtonArray);
  }

  const gotoSignIn = () => {
    navigation.replace('SignIn');
  };

  const onSignUp = () => {
    var dob = birthMM + '/' + birthDD + '/' + birthYY;
    var role = this.userType ? this.userType : 2;
    if (validation()) {
      dispatch(
        signup(
          email,
          password,
          role,
          firstName,
          secondName,
          dob,
          gender,
          res => {
            if (res && res.data) {
              var data = res.data;
              if (!data.error) {
                Toast.showWithGravity(
                  'SignUp Success!',
                  Toast.SHORT,
                  Toast.TOP,
                );
                dispatch(
                  forgotPassword(email, res => {
                    console.log('forgotPasswordOne: ', res);
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
                        navigation.navigate('Otp', 'SignIn');
                      }
                    }
                  }),
                );
              } else {
                Toast.showWithGravity(
                  data.msg || 'SignUp failed',
                  Toast.SHORT,
                  Toast.TOP,
                );
              }
            }
          },
        ),
      );
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image source={Images.splash} style={{resizeMode: 'contain'}} />
        </View>
        <View style={[styles.mainContainer]}>
          <View style={styles.subContainer}>
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                {paddingLeft: 10},
              ]}>
              Account Type
            </Text>
            <RadioGroup
              layout="row"
              radioButtons={radioButtons}
              onPress={onPressAccountTypeRadioButton}
              containerStyle={{alignSelf: 'flex-start', paddingTop: 15}}
            />
            {errorUserType.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorUserType}
              </Text>
            )}
            <TextInput
              placeholder="First Name"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setFirstName(e)}
              value={firstName}
            />
            {errorFirstName.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorFirstName}
              </Text>
            )}
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setSecondName(e)}
              value={secondName}
            />
            {errorSecondeName.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorSecondeName}
              </Text>
            )}
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setEmail(e)}
              value={email}
            />
            {errorEmail.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorEmail}
              </Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setPassword(e)}
              value={password}
            />
            {errorPassword.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorPassword}
              </Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setConfirmPassword(e)}
              value={confirmPassword}
            />
            {errorConfirmPassword.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorConfirmPassword}
              </Text>
            )}
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                styles.text_bold,
              ]}>
              Date of Birthday
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                width: '100%',
              }}>
              <SelectDropdown
                buttonStyle={styles.select}
                buttonTextStyle={styles.text_color_white}
                defaultButtonText={'MM'}
                // defaultValueByIndex={0}
                data={MM}
                onSelect={(selectedItem, index) => {
                  setBirthMM(index + 1);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <SelectDropdown
                buttonStyle={styles.select}
                buttonTextStyle={styles.text_color_white}
                defaultButtonText={'DD'}
                defaultValueByIndex={0}
                data={DD}
                onSelect={(selectedItem, index) => {
                  setBirthDD(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <SelectDropdown
                buttonStyle={styles.select}
                buttonTextStyle={styles.text_color_white}
                defaultValueByIndex={0}
                defaultButtonText={'YY'}
                data={YY}
                onSelect={(selectedItem, index) => {
                  setBirthYY(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            {errorBirth.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorBirth}
              </Text>
            )}
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                styles.text_bold,
              ]}>
              Gender
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <SelectDropdown
                buttonStyle={styles.select}
                buttonTextStyle={styles.text_color_white}
                searchPlaceHolder={'Gender'}
                defaultButtonText={'Gender'}
                // defaultValueByIndex={0}
                data={_gender}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            {errorGender.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorGender}
              </Text>
            )}
            <RadioGroup
              layout="row"
              containerStyle={{
                alignSelf: 'flex-start',
                paddingTop: 15,
                paddingRight: 15,
              }}
              radioButtons={signingRadioButtonData}
              onPress={onPressSigningRadioButton}
            />
            {errorSigning.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorSigning}
              </Text>
            )}
          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity style={[styles.button]} onPress={onSignUp}>
              <Text style={[styles.text_banner, styles.text_color_white]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={[
                  styles.text,
                  styles.text_small,
                  styles.text_color_white,
                ]}>
                Do you have already an Account? &nbsp;
                <Text
                  onPress={gotoSignIn}
                  style={[
                    styles.text,
                    styles.text_small,
                    styles.text_color_black,
                  ]}>
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
