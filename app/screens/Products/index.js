/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  ScrollView,
  Platform,
} from 'react-native';
import {Images} from '@assets/images';
import {productUrl, albumUrl, httpHeaders} from '@constants';
import {ConvertToUrlForm} from '@util';
import Toast from 'react-native-toast-message';
import SweetAlert from 'react-native-sweet-alert';
import ProductItem from '@components/ProductItem';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;

let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

const Products = props => {
  const {navigation, route} = props;
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  const [filterN, setFilterN] = useState(0);
  const white = '#f0f0f0';
  const gray = '#1455F5';

  useEffect(() => {
    if (user === undefined || user.length === 0) {
      SweetAlert.showAlertWithOptions({
        style: 'error',
        title: 'Sorry, your account data is removed. Sign In again.',
      });
      navigation.navigate('SignIn');
    }
    setUserId(user.user?.id);
    getProduct();
  }, []);

  useEffect(() => {
    getProduct();
  }, [route]);

  const getProduct = () => {
    const data = {
      func: 'products',
      user_id: userId,
    };
    // console.log(data);
    let sendData = ConvertToUrlForm(data);
    fetch(productUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sendData,
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log('responseData', responseData.data);
        if (responseData.error == false) {
          setProducts(responseData?.data);
          setDataSource(responseData?.data);
        }
        // console.log('responseData', products);
      })
      .catch(err => {
        console.log('catch', err);
      });
  };

  const onSearch = e => {
    // console.log(e);
    if (e === null || e === '') return;

    let filteredData = products.filter(
      item => item?.product_data?.product_type?.index(e) > -1,
    );
    // console.log(filteredData);
    setDataSource(filteredData);
  };

  const onToggleFilterMenu = () => {
    // console.log('onToggleFilterMenu');
    setFilterMenuVisible(!filterMenuVisible);
  };

  const addBookmark = (product_id, bookmarked) => {
    let data = {
      func: 'insert_product_bookmark',
      user_id: userId,
      product_id: product_id,
    };
    if (bookmarked === 1) {
      data.bookmark = 0;
    } else {
      data.bookmark = 1;
    }
    let sendData = ConvertToUrlForm(data);
    // let sendData = data;
    fetch(productUrl, {
      method: 'POST',
      headers: httpHeaders,
      body: sendData,
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log('add bookmark responseData', responseData);
        if (responseData.error === false) {
          ToastAndroid.show('Bookmarked successfully 👋.', ToastAndroid.SHORT);
          getProduct();
        }
      })
      .catch(err => {
        return Toast.show({
          type: 'error',
          text1: err,
        });
      });
  };

  var state1 = {
    data: [
      {
        id: 1,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: true,
      },
      {
        id: 2,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 3,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 4,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 5,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 6,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 7,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 8,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 9,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
      {
        id: 10,
        url: 'http://placehold.it/200x200?text=1',
        price: '300',
        user: 'Mac miller',
        category: 'Music video',
        like: false,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowStyle}>
        <Image
          style={styles.Group379}
          source={Images.back}
          onStartShouldSetResponder={e => true}
          onTouchEnd={e => {
            {
              navigation.navigate('HomeScreen');
            }
          }}
        />
        <Text style={styles.title}>Product</Text>
        <Image style={styles.Group380} source={require('./i_store.png')} />
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 20,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'grey'}
          style={{
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 5,
            marginRight: 10,
            paddingLeft: 40,
            color: 'black',
          }}
          autoFocus={false}
          onChangeText={e => onSearch(e)}
        />
        <Image
          source={require('./i_search.png')}
          style={{
            position: 'absolute',
            left: 25,
            marginRight: 10,
            paddingRight: 10,
          }}
        />
        <Image
          source={require('./i_filter.png')}
          style={{height: 40, borderRadius: 5}}
          onTouchEnd={() => onToggleFilterMenu()}
        />
      </View>
      {filterMenuVisible ? (
        <View
          style={{
            backgroundColor: 'white',
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: 15,
            top: 110,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            zIndex: 1,
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: 40,
              borderBottomWidth: 1,
              width: '100%',
              backgroundColor: filterN == 0 ? gray : white,
            }}
            onTouchEnd={() => {
              setFilterN(0);
              setFilterMenuVisible(false);
            }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                alignSelf: 'center',
                color: filterN === 0 ? 'white' : 'black',
              }}>
              Type
            </Text>
          </View>
          <View
            style={{
              height: 40,
              borderBottomWidth: 1,
              width: '100%',
              backgroundColor: filterN == 1 ? gray : white,
            }}
            onTouchEnd={() => {
              setFilterN(1);
              setFilterMenuVisible(false);
            }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                alignSelf: 'center',
                color: filterN === 1 ? 'white' : 'black',
              }}>
              Category
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: filterN == 2 ? gray : white,
            }}
            onTouchEnd={() => {
              setFilterN(2);
              setFilterMenuVisible(false);
            }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                alignSelf: 'center',
                color: filterN === 2 ? 'white' : 'black',
              }}>
              Name
            </Text>
          </View>
        </View>
      ) : null}
      <SafeAreaView>
        <FlatList
          data={dataSource}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: 15,
                margin: 10,
                borderRadius: 15,
              }}
              onTouchEnd={() =>
                navigation.navigate('ProductDetail', {
                  id: userId,
                  product: item,
                })
              }>
              <Image
                source={
                  item.product_data.album
                    ? {uri: `${albumUrl + item.product_data.album}`}
                    : require('./store1.png')
                }
                style={styles.imageThumbnail}
              />
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={styles.text}>
                        ${item.product_data.price}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>
                        {item?.product_data?.audio_name &&
                        item.product_data.audio_name.length > 10
                          ? `${item.product_data.audio_name.substring(
                              0,
                              10,
                            )}...`
                          : item.product_data.audio_name}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.text}>
                      {item?.product_data?.album_title &&
                      item?.product_data?.album_title.length > 15
                        ? `${item.product_data.album_title.substring(0, 15)}...`
                        : item.product_data.album_title}
                    </Text>
                  </View>
                </View>
                <View style={{marginLeft: 5}}>
                  <TouchableOpacity
                    onPress={() =>
                      addBookmark(item.product_data.id, item.user_bookmarked)
                    }>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                      }}>
                      {item.user_bookmarked === '1' ? (
                        <Image source={require('./i_heart_red.png')} />
                      ) : (
                        <Image source={require('./i_heart_white.png')} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
      {/* <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          height: width / 5,
          width: width,
          backgroundColor: 'white',
          opacity: 0.9,
          bottom: bottomNavBarHeight,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 20,
        }}>
        <Image
          source={Images.home}
          onTouchEnd={() => navigation.navigate('HomeScreen')}
        />
        <View onTouchEnd={() => navigation.navigate('Chatlist')}>
          <Image
            source={Images.message_tab}
            onTouchEnd={() => navigation.navigate('HomeScreen')}
          />
          <View style={styles.iconNumber}>
            <Text style={{fontSize: 7, color: 'white'}}>12</Text>
          </View>
        </View>
        <View onTouchEnd={() => navigation.navigate('Notification')}>
          <Image source={Images.alarm} />
          <View style={styles.iconNumber}>
            <Text style={{fontSize: 7, color: 'white'}}>12</Text>
          </View>
        </View>
        <Image
          source={Images.user_tab}
          onTouchEnd={() => navigation.navigate('EditProfile')}
        />
      </View> */}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
  },
  stylesProductContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  productsContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'column',
    // alignContent: 'flex-start',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  title: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
  text: {
    fontSize: 10,
  },
  iconNumber: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1,
  },
});
