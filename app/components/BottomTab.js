import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Images} from '@assets/images';

export default ({navigation}) => {
  const TabArr = [
    {
      route: 'HomeScreen',
      id: 1,
      label: 'Home',
      name: 'HomeScreen',
      image: Images.home,
    },
    {
      route: '',
      id: 2,
      name: 'message',
      label: 'Message',
      image: Images.message_tab,
      component: null,
    },
    {
      route: '',
      label: 'Notification',
      id: 3,
      name: 'notification',
      image: Images.alarm,
      component: null,
    },
    {
      route: '',
      id: 4,
      label: 'profile',
      name: 'Profile',
      image: Images.user_tab,
      component: null,
    },
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: 'white',
      }}>
      {TabArr.map((item, index) => {
        console.log(item.route);
        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            activeOpacity={1}
            style={{justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate(item.route);
            }}>
            <Image source={item.image} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
