import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import styles from '../styles';
import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector, useDispatch} from 'react-redux';
import {Images} from '@assets/images';
import HotUserItem from './HotUserItem';
import {accountUrl, imageUrl} from '../constants';
import {httpRequestPost} from '@services';

const {width, height} = Dimensions.get('screen');

export default function HotUsers(props) {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userData = user.user;
  const [hot5, setHot5] = useState([]);

  useEffect(() => {
    // if (userData == undefined) {
    //   SweetAlert.showAlertWithOptions({
    //     style: 'error',
    //     title: 'Sorry, your account data is removed. Sign In again.',
    //   });
    //   navigation.navigate('SignIn');
    // }
    getHot5();
  }, []);

  const getHot5 = async () => {
    const params = {
      func: userData.role === 1 ? 'hot5_talent' : 'hot5_users',
      user_id: userData.id,
    };

    httpRequestPost('users.php', params).then(res => {
      if (res && res.data) {
        var data = res.data;
        console.log(data, '=============hot users==============');
        if (data.error) {
          Toast.show({
            type: 'error',
            text1: 'Sorry, try again.',
          });
        } else {
          setHot5(data.data);
          // var temp = [];
          // temp.push(userData);
          // temp.push(userData);
          // temp.push(userData);
          // temp.push(userData);
          // temp.push(userData);
          // setHot5(temp);
        }
      }
    });
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginBottom: 15,
          paddingTop: 15,
          paddingLeft: 15,
        }}>
        <Text
          style={[
            styles.text,
            styles.text_color_white,
            styles.tf14,
            styles.text_bold,
          ]}>
          Hot5 &nbsp;
        </Text>
        <Image source={Images.emojioneFire} style={{width: 15, height: 15}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          height: 'auto',
          paddingHorizontal: 3,
        }}>
        {hot5 &&
          hot5.map((user, index) => <HotUserItem user={user} key={index} />)}
        {!hot5 && (
          <Text
            style={[
              styles.text,
              styles.text_color_white,
              {paddingHorizontal: 15},
            ]}>
            No data...
          </Text>
        )}
      </View>
    </View>
  );
}

const mystyles = StyleSheet.create({
  Home: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,1)',
    shadowColor: 'rgba(0,0,0,0.25)',
    elevation: 0,
    shadowOffset: {width: 0, height: 4},
    padding: 10,
    width: width,
    height: height,
  },
  HomeMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width,
    height: height,
    paddingTop: width / 3.5,
  },
  Group496: {
    position: 'absolute',
    bottom: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    /*  linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)),url(https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/tkx4f9zuvda-2343%3A3994?alt=media&token=0d34018b-0de5-46a0-8c80-063f340dad0d) */
    width: width / 1.1,
  },
  Vector: {
    position: 'absolute',
    bottom: 150,
    right: 50,
    width: 21.74,
    height: 21.86,
    backgroundColor: 'blue',
    zIndex: 3,
  },
  Group499: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: 106,
    height: 16,
  },
  Group362: {
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 2,
    borderRadius: 8,
    left: width / 3,
    backgroundColor: 'rgba(255,0,0,1)',
    width: 16,
    height: 16,
  },
  Txt594: {
    fontSize: 7.06,
    // // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },

  Group163: {
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 2,
    borderRadius: 8,
    left: width / 1.85,
    backgroundColor: 'rgba(255,0,0,1)',
    width: 16,
    height: 16,
  },
  Txt594: {
    fontSize: 7.06,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },

  NavBar: {
    position: 'absolute',
    bottom: 20,
    width: width,
    height: 75,
    zIndex: -1,
  },
  Group5377: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: '81.4%',
    bottom: '11.42%',
    left: '80.8%',
    right: '3.74%',
    borderRadius: 51,
    backgroundColor: 'white',
    /*  linear-gradient(136.42deg, rgba(20,85,245,0.6) 0%, rgba(20,85,245,0.29) 100%, )  */
    // backdropFilter: "blur(20px)",
    width: 60,
    height: 60,
  },

  Group279: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
  },
  ThemeLightNotchFalseCallInTrueWifiTrueBackFalse: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 4,
    paddingLeft: 19,
    paddingRight: 18,
    marginBottom: 18,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  Service: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 66,
  },
  Reception: {
    width: 16.5,
    height: 10,
    marginRight: 4,
  },
  Txt512: {
    fontSize: 12,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '700',
    lineHeight: 12,
    letterSpacing: -0.12,
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 4,
  },
  Wifi: {
    width: 16.62,
    height: 12,
  },

  Time: {
    width: 31.8,
    height: 8.88,
    marginRight: 125,
  },
  Battery: {
    width: 26.5,
    height: 11.5,
  },

  Group1089: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  BxMenu: {
    width: 38,
    height: 38,
  },
  Group1: {
    width: 54,
    height: 54,
    aspectRatio: 1,
  },
  Frame162: {
    marginTop: 10,
    width: 22,
    aspectRatio: 1,
  },

  Group48095695: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 7,
    paddingLeft: 10,
  },
  Txt840: {
    fontSize: 13,
    fontFamily: 'Nunito, sans-serif',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 10,
    marginRight: 5,
  },

  EmojioneFire: {
    width: 17,
    height: 17,
  },

  Frame74: {
    marginHorizontal: 10,
    width: width / 1.05,
    height: 77,
    marginBottom: 32,
  },
  Group979: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 11,
    paddingLeft: 15,
  },
  Group5457: {
    width: 43,
    height: 43,
    marginRight: 6,
  },
  // multiple1: {
  //   main: "Txt471",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },

  // multiple2: {
  //   main: "Txt948",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },
  Group205: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 14,
    position: 'absolute',
    top: 450,
    justifyContent: 'space-around',
    width: width,
  },
  Group312: {
    display: 'flex',
    flexDirection: 'column',
  },
  Frame160: {
    width: 26,
    height: 24,
    marginBottom: 2,
  },
  Txt188: {
    fontSize: 10,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },

  Group453: {
    display: 'flex',
    flexDirection: 'column',
  },
  Frame157: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  Txt188: {
    fontSize: 10,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },

  BytesizeFlag: {
    width: 30,
    height: 30,
  },

  Group322: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 500,
    left: 15,
  },
  Group5455: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 30,
  },
  // multiple3: {
  //   main: "Txt6510",
  //   seg1: "[object Object]",
  //   seg2: "[object Object]",
  // },
  Txt580: {
    fontSize: 9,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },

  CarbonOverflowMenuVertical: {
    width: 60,
    height: 60,
  },

  CarbonOverflowMenuVertical1: {
    width: 40,
    height: 40,
  },

  CarbonOverflowMenuVertical2: {
    width: 30,
    height: 30,
  },
  hotImage: {
    width: (width - 100) / 5 + 10,
    height: width / 6 + 28,
    borderRadius: 14,
  },

  hotBack: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnStyle: {
    display: 'flex',
    flexDirection: 'column',
  },

  Txt9010: {
    fontSize: 9,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },
  footerIcon: {
    width: 26,
    height: 25,
  },
  fontWhite: {
    color: 'white',
    alignSelf: 'center',
  },
  fontBlack: {
    color: 'black',
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
  bottomPlusIcon: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: 'rgba(20, 85, 245, 0.6)',
    width: 58,
    height: 58,
    borderRadius: 29,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 120,
    right: width / 10,
    width: width / 1.2,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: 1,
  },
  fontMenu: {
    fontSize: 32,
    color: 'black',
    lineHeight: 50,
  },
  bottomMenuItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 80,
    width: '100%',
    paddingHorizontal: 50,
  },
  alignItems: 'center',
});
