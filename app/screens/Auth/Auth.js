import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import {Images, FONT} from '@assets';

const Auth = ({navigation}) => {
  const gotoSignIn = () => {
    navigation.replace('SignIn');
  };
  const gotoSignUp = () => {
    navigation.replace('SignUp');
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{width: '100%', paddingBottom: 10}}>
          <Image source={Images.splash} style={styles.image_banner} />
        </View>
        <View style={styles.mainContainer}>
          <View>
            <Text
              style={[
                styles.text,
                styles.text_color_white,
                styles.text_banner,
              ]}>
              "Who's Next? You Decide..."
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.active]}
            onPress={gotoSignIn}>
            <Text style={[styles.text, styles.text_color_white]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={gotoSignUp}>
            <Text style={[styles.text, styles.text_color_white]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button1]}>
            <Image source={Images.googleIcon} style={{marginRight: 10}} />
            <Text style={[styles.text, styles.text_color_black]}>
              Sign Up With Gmail
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '70%',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.text, styles.text_small]}>
              By process you agree to the{' '}
              <Text
                style={styles.text_color_white}
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                Privacy Policy
              </Text>
            </Text>
            <Text style={[styles.text, styles.text_small]}>
              and{' '}
              <Text
                style={styles.text_color_white}
                onPress={() => navigation.navigate('TermsOfUse')}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
  },
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  image_banner: {
    resizeMode: 'contain',
    width: '100%',
  },
  text: {
    alignItems: 'center',
    fontSize: 18,
  },
  text_color_white: {
    color: 'white',
  },
  text_color_black: {
    color: 'black',
  },
  text_banner: {
    fontSize: 18,
    paddingBottom: 40,
  },
  text_small: {
    color: 'gray',
    fontSize: 11,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 53,
    color: 'white',
    padding: 12,
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#005DE3',
    borderStyle: 'solid',
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 53,
    color: 'black',
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#005DE3',
    borderStyle: 'solid',
  },
  active: {
    backgroundColor: '#005DE3',
  },
});
