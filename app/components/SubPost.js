import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import {Images} from '../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ReadMore from 'react-native-read-more-text';

const SubPost = props => {
  let {text} = props;
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. tellus ut dui tortor suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. Amet, sapien luctus amet nunc. Luctus aliquet nulla tellus ut dui tortor, elementum, natoquesodales. Pulvinar orci, scelerisque sit suscipit. tellus ut dui tortor suscipit.';
  const _renderTruncatedFooter = handlePress => {
    return (
      <Text style={{color: 'white', marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = handlePress => {
    return (
      <Text style={{color: 'white', marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const _handleTextReady = () => {
    // ...
  };
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderUserDetail}>
          <Avatar url={'https://mui.com/static/images/avatar/3.jpg'} />
          <View style={{padding: 10}}>
            <Text style={styles.text}>Featured_Talent(Rock Music)</Text>
            <Text style={styles.hint_text}>
              Based on your preferences here's an artist you may like
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: 15}}>
        <View style={[styles.postImage]}>
          <Image
            source={Images.desert1}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
        </View>
        <ReadMore
          numberOfLines={5}
          onReady={_handleTextReady}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}>
          <Text style={styles.text}>{text}</Text>
        </ReadMore>
      </View>
      <View style={styles.postFooter}>
        <View>
          <Image source={Images.heart} style={styles.postFooterImage} />
          <Text style={styles.text}>1.1k</Text>
        </View>
        <View>
          <Image source={Images.message} style={styles.postFooterImage} />
          <Text style={styles.text}>527</Text>
        </View>
        <View>
          <Image source={Images.tip} style={styles.postFooterImage} />
        </View>
      </View>
    </View>
  );
};

export default SubPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 'auto',
    maxWidth: '100%',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  postHeaderUserDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avartarImage: {
    width: 66,
    height: 66,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    padding: 15,
  },
  postFooterImage: {
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  hint_text: {
    color: 'gray',
    fontSize: 10,
  },
  displayForTest: {
    borderColor: 'white',
    borderWidth: 3,
  },
});
