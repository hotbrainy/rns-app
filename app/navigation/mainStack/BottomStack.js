/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Image, Dimensions, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/Home';
// import HomeScreen from '@screens/HomeScreen';
import {Images} from '@assets/images';
import PurchasedProducts from '../../screens/PurchasedProducts';
import {TouchableOpacity} from 'react-native';
import FriendsList from '@screens/FriendsList';
import Upload from '@screens/Home/Upload';
import CreatePost from '../../screens/Home/CreatePost';
import BottomTab from '../../components/BottomTab';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

const screenArr = [
  {
    route: 'HomeScreen',
    component: HomeScreen,
  },
  {
    route: 'PurchasedProducts',
    component: PurchasedProducts,
  },
  {
    route: 'FriendsList',
    component: FriendsList,
  },
  {
    route: 'Upload',
    component: Upload,
  },
];

const BottomStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTab {...props} />}>
      {screenArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomStack;

const tabStyle = StyleSheet.create({
  // btn: {
  //   width: width / 6,
  //   height: width / 6,
  //   borderRadius: 50,
  //   borderWidth: 2,
  //   borderColor: 'lightgray',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    justifyContent: 'center',
    // flex: 1,
  },
});
