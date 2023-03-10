/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import {TabRouter} from 'react-navigation';
import {useSelector} from 'react-redux';
import {Images} from '../../assets/images';
import {imageUrl} from '@constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('screen');

export default function SettingScreen({navigation}) {
  const {user} = useSelector(state => state.auth.user);

  const {first_name, last_name, profile_pic, role} = user;

  const onClickLogOut = () => {
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => navigation.navigate('SignIn'),
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={Images.back}
          onTouchEnd={e => {
            {
              e.stopPropagation();
              navigation.navigate('HomeScreen');
            }
          }}
        />
        <Text style={styles.Txt432}>Setting</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginLeft: 10,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: profile_pic
              ? `${imageUrl}profile_pic/${profile_pic}`
              : Images.user1,
          }}
          style={{
            alignSelf: 'center',
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <View style={{flexDirection: 'column', marginLeft: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>
            {first_name}
          </Text>
          <Text style={{fontSize: 24, color: 'white'}}>{last_name}</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
          marginTop: 30,
        }}></View>
      <View
        style={{flexDirection: 'row', marginTop: 30}}
        onTouchEnd={() =>
          navigation.navigate('EditProfile', {
            accountType: role,
          })
        }>
        <Image source={require('./i_profile.png')} />
        <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
          Edit Profile
        </Text>
        <Image
          source={require('./i_right.png')}
          style={{position: 'absolute', right: 0}}
        />
      </View>
      <View
        style={{flexDirection: 'row', marginTop: 30}}
        onTouchEnd={() =>
          navigation.navigate('AccountSetting', {
            accountType: role,
            userData: user,
          })
        }>
        <Image source={require('./i_account.png')} />
        <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
          Account Setting
        </Text>
        <Image
          source={require('./i_right.png')}
          style={{position: 'absolute', right: 0}}
        />
      </View>
      {role == 1 && (
        <View
          style={{flexDirection: 'row', marginTop: 30}}
          onTouchEnd={() => navigation.navigate('Dashboard')}>
          <Image source={require('./i_dashboard.png')} />
          <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
            Dashboard
          </Text>
          <Image
            source={require('./i_right.png')}
            style={{position: 'absolute', right: 0}}
          />
        </View>
      )}
      {role == 1 && (
        <>
          <View
            style={{flexDirection: 'row', marginTop: 30}}
            onTouchEnd={() =>
              navigation.navigate('SubscriptionPlan', {id: user?.id})
            }>
            <Image source={require('./i_subscription.png')} />
            <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
              Subscriptions
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{position: 'absolute', right: 0}}
            />
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 30}}
            onTouchEnd={() => navigation.navigate('AddedProduct')}>
            {/* <Image source={require('./i_products.png')} /> */}
            <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
              Products
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{position: 'absolute', right: 0}}
            />
          </View>
        </>
      )}
      {role == 2 && (
        <>
          <View
            style={{flexDirection: 'row', marginTop: 30}}
            onTouchEnd={() => navigation.navigate('Favorites')}>
            <Image source={require('./i_favorites.png')} />
            <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
              Favorites
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{position: 'absolute', right: 0}}
            />
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 30}}
            onTouchEnd={() => navigation.navigate('EventCalendar')}>
            <Image source={require('./i_calendar.png')} />
            <Text style={{color: 'white', alignSelf: 'center', marginLeft: 30}}>
              Calendar
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{position: 'absolute', right: 0}}
            />
          </View>
        </>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 70,
          left: 30,
          backgroundColor: '#1455F5',
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onTouchEnd={() => onClickLogOut()}>
        <MaterialIcons name="logout" size={20} color="white" />
        <Text style={{color: 'white', marginLeft: 5}}>Log out</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,1)',
    width: width,
    height: height,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Group379: {
    position: 'absolute',
    left: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
});
