import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';

const ProductItem = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.desert1} style={styles.image} />
      <View>
        <Text style={styles.text}>$300</Text>
        <Text style={styles.text}>Mac Miller</Text>
      </View>
      <View>
        <Text style={styles.text}>painting for the Future</Text>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // width: '50%',
    padding: 30,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 100,
  },
  text: {
    // color: 'white',
  },
});
