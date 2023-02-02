import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useRoute} from '@react-navigation/native';
import DrawerScreen from '@screens/DrawerScreen';
import {Images} from '../../assets/images';
import BottomStack from './BottomStack';

const Drawer = createDrawerNavigator();

export default props => {
  const route = useRoute();
  return (
    <Drawer.Navigator
      drawerContent={DrawerScreen}
      >
      <Drawer.Screen
        name="HOME_STACK"
        component={BottomStack}
        options={{
          headerShown: true,
          headerTitle: () => <Image source={Images.logo} />,
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerRight: () => <Image source={Images.search} />,
          headerRightContainerStyle: {
            paddingRight: 15,
          },
          drawerStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});
