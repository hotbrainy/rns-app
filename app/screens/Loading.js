import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {IMAGES} from '@assets';

const Loading = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splash');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
  },
  text: {
    color: 'white',
  },
});
