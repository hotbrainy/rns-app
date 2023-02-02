import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../styles';

export default function PurchasedProduct(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
          }}>
          <Image source={props.product.url} style={{width: 40, height: 50}} />
        </View>
        <Text style={(styles.text, styles.text_color_black, {paddingLeft: 30})}>
          ${props.product.price}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={(styles.text, styles.text_color_black, {paddingBottom: 10})}>
          {props.product.user}
        </Text>
        <Text style={(styles.text, styles.text_color_black)}>
          {props.product.category}
        </Text>
      </View>
    </View>
  );
}
