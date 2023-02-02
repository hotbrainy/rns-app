import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
import {imageUrl} from '../constants';

const Avatar = props => {
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

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
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
