import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '@assets/images';
import {ImageBackground} from 'react-native';
import {imageUrl} from '../constants';

const imageURI = {uri: 'https://mui.com/static/images/avatar/1.jpg'};
export default function HotUserItem(props) {
  const {user} = props;
  return (
    <View style={{height: 'auto', maxHeight: 80, marginHorizontal: 5}}>
      <View
        style={styles.container}
        onTouchEnd={() => props.navigation.navigate('HomeScreen')}>
        <ImageBackground
          source={{uri: imageUrl + 'profile_pic/' + user.profile_pic}}
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 7}}
          resizeMode="cover">
          <View style={styles.imageInfor}>
            <Image source={Images.emojioneFire} />
            <View style={styles.hot_user_detail}>
              <Text style={styles.hot_user_name}>Crazy legs</Text>
              <Text style={styles.hot_user_link}>Rap</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    maxHeight: 75,
    padding: 3,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FF9D33',
    // position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    minWidth: 50,
    maxWidth: 85,
    height: '100%',
  },
  hotUserItem: {},
  imageInfor: {
    // position: 'absolute',
    flexDirection: 'column',
    // alignSelf: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 3,
  },
  hot_user_detail: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // flex: 1,
    width: '100%',
  },
  hot_user_name: {
    fontSize: 6,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 50,
    marginBottom: 1,
    padding: 1,
    margin: 'auto',
    textAlign: 'center',
  },
  hot_user_link: {
    fontSize: 6,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 50,
    margin: 'auto',
    textAlign: 'center',
  },
});
