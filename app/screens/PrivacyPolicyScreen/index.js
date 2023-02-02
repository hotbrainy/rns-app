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
import {getPages} from '../../actions';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('screen');

export default function ({navigation}) {
  const dispatch = useDispatch();
  const [privacyContent, setPrivacyContent] = useState('');
  const [policyContent, setPolicyContent] = useState('');
  dispatch(
    getPages(res => {
      setPrivacyContent(res.data.data.find(el => el.title === 'Privacy').content.replace(/<[^>]+>/g, ''));
      setPolicyContent(res.data.data.find(el => el.title === 'Policies').content.replace(/<[^>]+>/g, ''));
    }),
  );

  return (
    <View style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={require('./Group.png')}
          onTouchEnd={() => navigation.goBack()}
        />
        <Text style={styles.Txt432}>Privacy Policy</Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: 'white',
            marginTop: 20,
            fontSize: 14,
          }}>
          {privacyContent}
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: 20,
            fontSize: 14,
          }}>
          {policyContent}
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
