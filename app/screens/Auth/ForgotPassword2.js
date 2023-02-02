import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {forgotPassword3} from '../../actions';

const ForgotPassword2 = ({navigation}) => {
  const dispatch = useDispatch();
  const {forgot_password_user} = useSelector(state => state.auth);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const save = () => {
    if (password === '' || confirmPassword === '') {
      Toast.showWithGravity('Please enter password', Toast.SHORT, Toast.TOP);
    } else if (password !== confirmPassword) {
      Toast.showWithGravity('Password is not matched', Toast.SHORT, Toast.TOP);
    } else if (forgot_password_user.email === '') {
      Toast.showWithGravity('Please enter email', Toast.SHORT, Toast.TOP);
      navigation.navigate('ForgotPassword');
    } else {
      dispatch(
        forgotPassword3(forgot_password_user.email, password, res => {
          if (res && res.data) {
            var data = res.data;
            if (!data.error) {
              Toast.showWithGravity(
                'Password changed successfully!',
                Toast.SHORT,
                Toast.TOP,
              );
              navigation.navigate('SignIn');
            } else {
              Toast.showWithGravity('Failed', Toast.SHORT, Toast.TOP);
            }
          }
        }),
      );
    }
    console.log('saving');
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '100%', padding: 20}}>
        <View style={{width: '100%', height: 'auto'}}>
          <Text
            style={[
              styles.text,
              styles.text_align_left,
              styles.text_color_white,
              styles.tf14,
            ]}>
            Let's reset your password
          </Text>
          <View style={{marginTop: 30}}>
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                styles.tf14,
              ]}>
              Your new password
            </Text>
            <TextInput
              placeholder="Please enter new password"
              secureTextEntry={true}
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 10,
                marginTop: 15,
              }}
              onChangeText={e => setPassword(e)}
              value={password}
            />
            <Text
              style={[
                styles.text,
                styles.text_align_left,
                styles.text_color_white,
                styles.tf14,
                {paddingTop: 10},
              ]}>
              Retype your new password
            </Text>
            <TextInput
              placeholder="Retype new password"
              secureTextEntry={true}
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 10,
                marginTop: 15,
              }}
              onChangeText={e => setConfirmPassword(e)}
              value={confirmPassword}
            />
          </View>
        </View>
        <TouchableOpacity style={[styles.button]} onPress={save}>
          <Text style={[styles.text_banner, styles.text_color_white]}>
            Save Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword2;
