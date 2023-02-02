import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../../styles';
import {PurchasedProduct} from '../../components';
import {Images} from '@assets/images';
import {TouchableOpacity} from 'react-native';
import HotUsers from '@components/HotUsers';
import Post from '../../components/Post';

const products = [
  {
    id: 1,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 2,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 3,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 4,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 5,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 6,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 7,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 8,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 9,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 10,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
  {
    id: 11,
    url: Images.product1,
    price: '300',
    user: 'Mac miller',
    category: 'Music video',
  },
];

const PurchasedProducts = props => {
  const renderItem = ({item}) => <PurchasedProduct product={item} />;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <View style={{alignSelf: 'flex-start', left: 0}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={Images.back}
              style={{alignSelf: 'flex-start', left: 0}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={[styles.text, styles.text_color_white, styles.text_banner]}>
            Purchased Products
          </Text>
        </View>
        <View>
          <Text> </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingLeft: 15,
        }}>
        <TouchableOpacity>
          <Text
            style={[
              styles.text,
              styles.text_color_white,
              styles.tf14,
              styles.text_bold,
              {alignSelf: 'flex-start'},
            ]}>
            All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          margin: 'auto',
          padding: 15,
        }}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default PurchasedProducts;
