import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {emailVerify} from '../../actions';
import styles from '../../styles';
import OtpInputs from 'react-native-otp-inputs';

const Otp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {forgot_password_user} = useSelector(state => state.auth);
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [code, setCode] = useState('');

  console.log(JSON.stringify(route.params, null, 4));

  useEffect(() => {
    setCode1('');
    setCode2('');
    setCode3('');
    setCode4('');
  }, []);

  const gotoNext = () => {
    setCode(`${code1}${code2}${code3}${code4}`);
    if (code.length < 4) {
      Toast.showWithGravity(
        'Please enter code correctly',
        Toast.SHORT,
        Toast.TOP,
      );
    } else if (forgot_password_user.email === '') {
      Toast.showWithGravity('Please enter email', Toast.SHORT, Toast.TOP);
      navigation.goback();
    } else {
      dispatch(
        emailVerify(forgot_password_user.email, code, res => {
          console.log('code===>>>', code);
          console.log('res===>>>', res);

          if (res && res.data) {
            console.log('OTP pass: ', res);
            var data = res.data;
            if (!data.error) {
              Toast.showWithGravity(
                'OTP Passed Successfully',
                Toast.SHORT,
                Toast.TOP,
              );
              navigation.navigate(route.params);
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
          <View
            style={{
              marginTop: 30,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input_otp}
              onChangeText={e => setCode1(e)}
              value={code1}
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input_otp}
              onChangeText={e => setCode2(e)}
              value={code2}
            />
            <TextInput
              style={styles.input_otp}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={e => setCode3(e)}
              value={code3}
            />
            <TextInput
              style={styles.input_otp}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={e => setCode4(e)}
              value={code4}
            />
          </View>
          {/* <OtpInputs
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
          /> */}
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

export default Otp;
