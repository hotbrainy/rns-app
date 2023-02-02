import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Images} from '@assets/images';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState, useRef} from 'react';
import {httpHeaders, imageUrl, accountUrl} from '@constants';
import {getUserById} from '../../actions/app';
import {ToastAndroid} from 'react-native';
import {LOGIN_SUCCESS} from '../../constants';

const {width, height} = Dimensions.get('screen');

function StyledInput({
  label,
  type,
  onChangeText,
  value,
  autoFocus,
  width,
  editable = false,
  multiline,
  numberOfLines,
}) {
  return (
    <View style={styles.Group4}>
      <Text style={styles.Txt066}>{label}</Text>
      <View style={{...styles.Rectangle17_, width: width}} />
      <View style={styles.Rectangle14_}>
        <TextInput
          style={{color: 'white', textAlignVertical: 'top'}}
          autoFocus={autoFocus}
          textContentType={type}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          editable={editable}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
}

export default function ({navigation}) {
  const {id} = useSelector(state => state.auth.user.user);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [filePath, setFilePath] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(
      getUserById(id, res => {
        console.log('user===>>>', JSON.stringify(res.data, null, 4));
        const data = res.data[0];
        // console.log('user data : ', data);
        setEmail(data.email);
        setPhone(data.phone);
        setLocation(data.location);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setProfilePic(`${imageUrl}profile_pic/${data.profile_pic}`);
      }),
    );
  }, []);

  const onlaunchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        //  alert(response.customButton);
      } else {
        const assets = response && response.assets ? response.assets : null;
        const file = assets && assets.length > 0 ? assets[0] : null;
        const source = file && file.uri ? file.uri : null;
        setProfilePic(source);
        setFilePath(assets);
        console.log('response', JSON.stringify(response));
      }
    });
  };

  // const getUserData = async () => {
  //   const obj = ConvertToUrlForm({
  //     func: 'fetchUser',
  //     id: userId,
  //   });
  //   await fetch(accountUrl, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: obj,
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const data =
  //         responseData && responseData.data ? responseData.data[0] : null;
  //       if (responseData['error'] == false && data) {
  //         setUserData(data);
  //         signInWithEmailAndPassword(auth, data.email, data.email).catch(
  //           error => {
  //             const errorMessage = error.message;
  //             alert(errorMessage);
  //           },
  //         );

  //         auth.currentUser.updateProfile({
  //           displayName: fname + ' ' + lname,
  //         });
  //       }
  //       return responseData?.data;
  //     })
  //     .catch(err => {
  //       console.log('catch', err);
  //     });
  // };

  const onSave = () => {
    setIsLoading(true);
    var formdata = new FormData();
    formdata.append('func', 'update_profile');
    formdata.append('email', email);
    // formdata.append('first_name', first_name);
    // formdata.append('last_name', last_name);
    formdata.append('phone', phone);
    formdata.append('location', location);
    // formdata.append('gender', gender);
    // formdata.append('dob', dob);
    if (filePath && filePath.length > 0) {
      formdata.append('profile_pic', {
        name: filePath[0].fileName,
        type: filePath[0].type,
        uri:
          Platform.OS === 'ios'
            ? filePath[0].uri.replace('file://', '')
            : filePath[0].uri,
      });
      formdata.append('profile_pic', filePath[0], filePath[0].uri);
    }

    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
      redirect: 'follow',
    };

    fetch(accountUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        // if (result['error'] == false) {
        //   getUserData();
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Profile updated successfully 👋.',
        //   });
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: result.msg,
        //     // text2: ''
        //   });
        // }
        // console.log('result===>>>', result);
        ToastAndroid.show(
          'Profile updated successfully 👋.',
          ToastAndroid.SHORT,
        );
        dispatch(
          getUserById(id, res => {
            console.log(res.data.data);
          }),
        );
      })
      .catch(error => {
        setIsLoading(false);
        ToastAndroid.show('Request failed', ToastAndroid.SHORT);
        console.log('error===>>>', error);
      });
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <Image
          style={styles.Group379}
          source={Images.back}
          onStartShouldSetResponder={e => true}
          onTouchEnd={e => {
            {
              navigation.goBack();
            }
          }}
        />
        <Text style={styles.Txt432}>Profile</Text>
      </View>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onlaunchCamera}>
            <Image
              source={{
                uri: profile_pic,
              }}
              style={{
                alignSelf: 'center',
                marginTop: 20,
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <Image
              source={require('./i_online.png')}
              style={{position: 'absolute', bottom: 0, right: 0}}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {first_name + ' ' + last_name}
            </Text>
          </View>
        </View>
        <StyledInput
          label={'Email'}
          editable={true}
          value={email}
          // type={'email'}
          onChangeText={e => setEmail(e)}
          width={80}
        />
        <StyledInput
          label={'Phone Number'}
          editable={true}
          value={phone}
          // type={'telephoneNumber'}
          onChangeText={e => setPhone(e)}
          width={80}
        />
        <StyledInput
          label={'Address'}
          editable={true}
          value={location}
          // type={'location'}
          onChangeText={e => setLocation(e)}
          width={80}
        />
        <TouchableOpacity onPress={() => (isLoading ? null : onSave())}>
          <View
            style={{
              backgroundColor: '#1455F5',
              borderRadius: 51,
              marginTop: 20,
              marginHorizontal: 10,
              marginBottom: 70,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {isLoading && <ActivityIndicator size="small" color="yellow" />}
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                alignSelf: 'center',
                paddingVertical: 10,
              }}>
              {isLoading ? 'Loading' : 'Update Profile'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,1)',
    height: '100%',
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
  Group4: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  Rectangle14_: {
    display: 'flex',
    backgroundColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#23437D',
    width: width - 100,
    borderRadius: 2,
  },
  Rectangle17_: {
    position: 'absolute',
    top: -5,
    left: 15,
    backgroundColor: 'black',
    height: 20,
    zIndex: 1,
  },
  Txt066: {
    position: 'absolute',
    top: -15,
    left: 15,
    fontSize: 12,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    color: '#23437D',
    height: 50,
    zIndex: 2,
  },
  dropdown2: {
    paddingHorizontal: 8,
    color: 'white',
    marginRight: 20,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
  },
});
