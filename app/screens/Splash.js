import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '@assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Auth');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Images.splash} style={styles.image} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
  },
});
