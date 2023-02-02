import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
import {imageUrl} from '../constants';

const Avatar_small = props => {
  let url = props.url;
  return (
    <View style={styles.container}>
      {url ? (
        <Image
          source={{uri: imageUrl + 'profile_pic/' + url}}
          style={styles.image}
        />
      ) : (
        <Image source={Images.default_user} style={styles.image} />
      )}
    </View>
  );
};

export default Avatar_small;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: 'blue',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
});
