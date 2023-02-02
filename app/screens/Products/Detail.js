import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import {Images} from '@assets/images';
import {imageUrl, albumUrl} from '@constants';

const ProductDetail = ({navigation, route, addToCart, products}) => {
  const [amount, setAmount] = useState(1);
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    console.log('useEffect  ');
    setUserId(route.params?.id);
    const product = route.params?.product ? route.params.product : null;
    setProduct(product);
    console.log(product?.product_data?.album);
    const images =
      product && product.product_data.image
        ? product.product_data.image.split(',')
        : null;
    const audios =
      product && product.product_data.audio
        ? product.product_data.audio.split(',')
        : null;
    const audio =
      audios && audios.length > 0
        ? audios
        : product && product.product_data.audio
        ? [product.product_data.audio]
        : null;
    setImages(images);
    setAudio(audio);
    // console.log("images", images);
    // console.log("audios", audio);
    images.map(item => console.log('images', item));
  }, [route]);

  const onControlAmount = d => {
    if (d == -1) {
      let newAmount = amount - 1;
      if (newAmount < 0) newAmount = 0;
      setAmount(newAmount);
    } else {
      let newAmount = amount + 1;
      if (newAmount < 0) newAmount = 0;
      setAmount(newAmount);
    }
  };

  const onClickAddToCart = async product => {
    const data = product.product_data;
    if (parseInt(amount, 10) > 0) {
      let obj = {
        ...product.product_data,
        quantity: amount,
      };
      // await addToCart(obj);
    }
    navigation.navigate('CheckOut', {
      amount: amount,
      id: userId,
      products: product.product_data,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowStyle}>
        <Image
          style={styles.backIconStyle}
          source={Images.back}
          onTouchEnd={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Product Detail</Text>
      </View>
      <View style={styles.record}>
        <Image
          source={
            product?.product_data?.album
              ? {
                  uri: `${albumUrl + product.product_data.album}`,
                }
              : require('./detail1.png')
          }
          style={{
            width: '60%',
            height: '60%',
            aspectRatio: 1,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={images}
          style={{width: '100%', paddingVertical: 10, paddingHorizontal: 15}}
          renderItem={({item}) => (
            <View
              style={{
                // flex: 1,
                // flexDirection: 'row',
                margin: 5,
                borderRadius: 10,
                height: 'auto',
                // aspectRatio: 1,
              }}>
              <Image
                source={{uri: `${imageUrl + 'products/image/' + item}`}}
                style={styles.imageThumbnail}
              />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
        {audio?.map((item, index) => (
          <View
            key={index}
            style={{marginTop: 10, display: 'flex', flexDirection: 'row'}}>
            <Image source={require('./detail5.png')} />
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginLeft: 10,
                fontWeight: '800',
              }}>
              {item}
            </Text>
          </View>
        ))}

        {/*  <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}><Image source={require('./detail5.png')} /><Text style={{ fontSize: 10, color: 'white', marginLeft: 10, fontWeight: '800' }}>Song 2</Text></View> */}
        <Text style={{color: 'white', position: 'absolute', right: 10}}>
          ${product?.product_data.price * amount}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#1455F5',
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
          width: '20%',
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: 'space-evenly',
          paddingVertical: 5,
        }}>
        <Image
          source={require('./i_minus.png')}
          onTouchEnd={() => onControlAmount(-1)}
        />
        <Text style={{color: 'white'}}>{amount < 10 ? '0' + amount : amount + ''}</Text>
        <Image
          source={require('./i_plus.png')}
          onTouchEnd={() => onControlAmount(1)}
        />
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Product info</Text>
        <Text style={{color: 'white', fontWeight: '300'}}>
          {product?.product_data?.description}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          backgroundColor: '#1455F5',
          padding: 10,
          borderRadius: 20,
          alignSelf: 'center',
          marginTop: 30,
          marginBottom: 70,
        }}
        onTouchEnd={() => onClickAddToCart(product)}>
        <Text style={{color: 'white', alignSelf: 'center'}}>Add to cart</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
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
  record: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
  },
  itemImg: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  backIconStyle: {
    position: 'absolute',
    left: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
});
