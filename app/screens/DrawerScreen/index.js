import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerScreen = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Content {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerScreen;

const gotoPage = action => {};

const Content = props => {
  return (
    <View style={styles.container}>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity>
          <Text style={styles.drawerItemText} onPress={() => props.navigation.navigate('EditProfile')}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Events')}>
          <Text style={styles.drawerItemText}>Calendar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Products')}> */}
        <TouchableOpacity onPress={() => props.navigation.navigate('Store')}>
          <Text style={styles.drawerItemText}>Store</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PurchasedProducts')}>
          <Text style={styles.drawerItemText}>Purchased Items</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity>
          <Text style={styles.drawerItemText} onPress={() => props.navigation.navigate('TermsOfUse')}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity>
          <Text style={styles.drawerItemText} onPress={() => props.navigation.navigate('PrivacyPolicy')}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Setting')}>
          <Text style={styles.drawerItemText}>Setting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
          <Text style={styles.drawerItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  drawerItemContainer: {
    paddingVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
