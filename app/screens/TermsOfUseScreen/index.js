import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getPages} from '../../actions';

const {width, height} = Dimensions.get('screen');

export default function ({navigation}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  dispatch(
    getPages(res => {
      setContent(
        res.data.data
          .find(el => el.title === 'Terms')
          .content.replace(/<[^>]+>/g, ''),
      );
    }),
  );

  return (
    <View
      style={styles.PrivacyPolicy}
      onTouchEnd={() => {
        navigation.navigate('OnBoarding');
      }}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('../PrivacyPolicyScreen/Group.png')}
          onStartShouldSetResponder={e => true}
          onTouchEnd={e => {
            {
              e.stopPropagation();
              navigation.goBack();
            }
          }}
        />
        <Text style={styles.Txt432}>Terms of Use</Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: 'white',
            marginTop: 20,
            fontSize: 14,
            alignContent: 'center',
          }}>
          {content}
        </Text>
      </ScrollView>
    </View>
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
