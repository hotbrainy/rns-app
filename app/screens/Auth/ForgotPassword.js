import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {forgotPassword} from '../../actions';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {forgot_password_user} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');

  const gotoNext = () => {
    if (email === '') {
      Toast.showWithGravity('Please enter email', Toast.SHORT, Toast.TOP);
      return;
    } else {
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
              navigation.navigate('ForgotPassword1');
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
            Don’t worry. We have got you covered. Enter your registered email
            and we will send instructions to reset your password
          </Text>
          <View style={{marginTop: 30}}>
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                styles.tf14,
              ]}>
              Email
            </Text>
            <TextInput
              placeholder="chris@gmail.com"
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 10,
                marginTop: 15,
              }}
              onChangeText={e => setEmail(e)}
              value={email}
            />
          </View>
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

export default ForgotPassword;
