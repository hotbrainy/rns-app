import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword2} from '../../actions';
import styles from '../../styles';
import OtpInputs from 'react-native-otp-inputs';

const ForgotPassword1 = ({navigation}) => {
  const dispatch = useDispatch();
  const {forgot_password_user} = useSelector(state => state.auth);
  const [code, setCode] = useState('');

  const gotoNext = () => {
    if (code.length < 4) {
      Toast.showWithGravity(
        'Please enter code correctly',
        Toast.SHORT,
        Toast.TOP,
      );
    } else if (forgot_password_user.email === '') {
      Toast.showWithGravity('Please enter email', Toast.SHORT, Toast.TOP);
      navigation.navigate('ForgotPassword');
    } else {
      dispatch(
        forgotPassword2(forgot_password_user.email, code, res => {
          if (res && res.data) {
            console.log('OTP pass: ', res);
            var data = res.data;
            if (!data.error) {
              Toast.showWithGravity(
                'OTP Passed Successfully',
                Toast.SHORT,
                Toast.TOP,
              );
              navigation.navigate("ForgotPassword2");
            } else {
              Toast.showWithGravity('OTP Pass failed', Toast.SHORT, Toast.TOP);
            }
          }
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '100%', padding: 20}}>
        <View style={{width: '100%', height: '40%'}}>
          <Text
            style={[
              styles.text,
              styles.text_align_left,
              styles.text_color_white,
              styles.tf14,
            ]}>
            Please enter OTP that we have sent you on your email adress
          </Text>
          <OtpInputs
            handleChange={code => setCode(code)}
            numberOfInputs={4}
            style={{
              marginTop: 30,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center',
            }}
            inputStyles={styles.input_otp}
          />
        </View>
        <View style={{width: '100%', height: '60%'}}>
          <TouchableOpacity style={[styles.button]} onPress={gotoNext}>
            <Text style={[styles.text_banner, styles.text_color_white]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword1;
