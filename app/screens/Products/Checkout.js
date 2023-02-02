/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '@assets/images';
import {albumUrl} from '@constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
Icon.loadFont();
const Checkout = props => {
  const {navigation, route, addToCart} = props;
  const {products, amount} = route.params;
  console.log('checkout route: ', JSON.stringify(products, null, 4));
  console.log('checkout route: ', JSON.stringify(props, null, 4));
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setUserId(route.params?.id);
    const product = products?.length > 0 ? products[0] : null;
    const audios = product && product.audio ? product.audio.split(',') : null;
    const qty = product && product.quantity ? parseInt(product.quantity) : 1;
    const audio =
      audios && audios.length > 0
        ? audios
        : product && product.audios
        ? [product.audio]
        : null;
    setAudio(audio);
    setProduct(product);
  }, []);

  const getTotal = product => {
    const price = product && product.price ? parseInt(product.price) : 0;
    const qty = product && product.quantity ? parseInt(product.quantity) : 1;
    return price * qty;
  };

  const getSubTotal = product => {
    const price = product && product.price ? parseInt(product.price) : 0;
    const qty = product && product.quantity ? parseInt(product.quantity) : 1;
    return price * qty;
  };

  const onClickPay = () => {
    console.log('product pay...');
    // const price  = product && product.price ? parseInt(product.price):0;
    // const qty    = product && product.quantity ? parseInt(product.quantity):1;
    // const total  = price * qty;
    // navigation.navigate('ProductPaymentMethod', { amount: total.toString(), id: userId });
  };

  const songs = [
    {
      src: Images.desert1,
      name: 'song1',
    },
    {
      src: Images.desert1,
      name: 'song2',
    },
    {
      src: Images.desert1,
      name: 'song3',
    },
    {
      src: Images.desert1,
      name: 'song4',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowStyle}>
        <Image
          style={styles.backIconStyle}
          source={Images.back}
          onStartShouldSetResponder={e => true}
          onTouchEnd={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>CheckOut</Text>
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.subBanner}>
          <Image
            source={
              product?.album
                ? {
                    uri: `${albumUrl + product.product_data.album}`,
                  }
                : require('./detail1.png')
            }
            style={styles.albumBannerImage}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Text style={styles.text}>{product?.album_title}</Text>
            <Text style={styles.blueText}>${product?.price}</Text>
          </View>
        </View>
        <View
          style={[
            styles.subBanner,
            {justifyContent: 'space-evenly', alignSelf: 'flex-end'},
          ]}>
          <Icon name="minuscircleo" size={20} color="blue" />
          <Text style={styles.text}>Qty: {amount}</Text>
          <Icon name="pluscircleo" size={20} color="blue" />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View>
          <Text style={{color: 'white'}}>Track List</Text>
        </View>
        <View>
          <Text style={{color: 'white'}}>
            1 item(s), Total: <Text style={{color: 'blue'}}>${products.price * amount}</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <View>
          <FlatList
            data={songs}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image source={item.src} style={{width: 20, height: 20}} />
                <Text style={{color: 'white', marginLeft: 10}}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            width: '50%',
          }}>
          <View>
            <Text style={[styles.text, {textAlign: 'center'}]}>${products.price * amount}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View>
          <Text style={{color: 'white'}}>Subtotal (1 item)</Text>
        </View>
        <View>
          <Text style={styles.text}>${products.price * amount}</Text>
        </View>
      </View>
      <View style={{paddingVertical: 70}}>
        <Text style={[styles.text, styles.title]}>
          <Text>Total :</Text>
          <Text style={{color: 'blue'}}> ${products.price * amount}</Text>
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            borderRadius: 20,
            backgroundColor: 'blue',
            padding: 20,
          }}
          onPress={() => props.navigation.navigate('ProductCheckout', {price: products.price * amount})}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: '800'}}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    padding: 20,
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIconStyle: {
    position: 'absolute',
    left: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  bannerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  subBanner: {
    width: '50%',
    flexDirection: 'row',
  },
  albumBannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
  blueText: {
    color: 'blue',
  },
  title: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
});
