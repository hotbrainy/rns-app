import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const Avatar = props => {
  const url = {uri: props.url};
  return (
    <View style={styles.container}>
      <Image source={url} style={styles.image} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: 'blue',
    padding: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
});
