import {
  View,
  Text,
  FlatList,
  Image,
  ToastAndroid,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import HotUsers from '@components/HotUsers';
import Post from '../../components/Post';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

let bottomPadding = width / 5 + 10;

const HomeScreen = props => {
  const {user} = useSelector(state => state.auth);
  console.log(user);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 20,
        }}>
        <HotUsers />
      </View>
      <View style={{paddingHorizontal: 10, paddingBottom: bottomPadding}}>
        <ScrollView>
          <SafeAreaView>
            <Post props={props} />
          </SafeAreaView>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.bottomPlusIcon}
        onPress={() => props.navigation.navigate('CreatePost')}>
        <Image
          source={require('./i_plus_white.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
    padding: 0,
    position: 'relative',
    height: height,
  },
  bottomPlusIcon: {
    position: 'absolute',
    bottom: 230,
    right: 40,
    backgroundColor: 'rgba(20, 85, 245, 0.6)',
    width: 58,
    height: 58,
    borderRadius: 29,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
