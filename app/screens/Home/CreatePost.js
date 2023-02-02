/* eslint-disable react/self-closing-comp */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';
import SweetAlert from 'react-native-sweet-alert';
import {connect} from 'react-redux';
import {httpHeaders, imageUrl, postUrl} from '@constants';
import {ConvertToUrlForm} from '@util';
import Tags from 'react-native-tags';
import AudioRecord from 'react-native-audio-record';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {Images} from '../../assets/images';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'audio.wav', // default 'audio.wav'
};
AudioRecord.init(options);

const {width, height} = Dimensions.get('screen');

function CreatePost({navigation, route}) {
  const {user} = useSelector(state => state.auth);
  const userData = user.user;
  const dispatch = useDispatch();

  const textInputRef = React.useRef();
  const [postContent, setPostContent] = useState('');
  const [mode, setMode] = useState(0); // 0: create, 1: edit
  const [audio, setAudio] = useState('');
  const [video, setVideo] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);

  const MyTagInput = () => (
    <Tags
      initialText=""
      textInputProps={{
        placeholder: '+ Add Tags',
        placeholderTextColor: '#777',
      }}
      style={{backgroundColor: 'black', paddingVertical: 3}}
      initialTags={tags}
      onChangeTags={tags => {
        setTags(tags);
      }}
      onTagPress={(index, tagLabel, event, deleted) => {
        setTags(tags.filter((tag, i) => i !== index));
      }}
      containerStyle={{
        backgroundColor: '#262626',
        borderColor: '#646464',
        borderTopWidth: 0.5,
      }}
      inputStyle={{
        backgroundColor: '#262626',
        borderRadius: 8,
        color: '#fff',
        placeholderTextColor: '#262626',
      }}
      renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: '#222',
            paddingVertical: 5,
            paddingHorizontal: 15,
            margin: 5,
          }}
          key={`${tag}-${index}`}
          onPress={onPress}>
          <Text style={{color: '#fff'}}>{tag} &nbsp;x</Text>
        </TouchableOpacity>
      )}
    />
  );

  useEffect(() => {
    textInputRef.current?.focus();
    if (route.params?.editMode) {
      setMode(1);
      setPostContent(route.params?.content);
    }
  }, [route]);

  const onClickPost = () => {
    console.log('onclick post....');
    if (postContent.length < 30) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'You have to type at least 30 characters',
      //   });
      ToastAndroid.show(
        'You have to type at least 30 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    if (mode == 0) {
      let details = {
        func: 'new_post',
        content: postContent,
        tags: tags,
        user_id: userData.id,
        audio: audio,
        video: video,
        image: image,
      };
      let formBody = ConvertToUrlForm(details);
      fetch(postUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: formBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          console.log('new post', responseData, formBody);
          if (responseData['error'] == false) {
            navigation.navigate('HomeScreen', {createPost: true});
          } else {
            SweetAlert.showAlertWithOptions({
              title: responseData.msg,
              subTitle: '',
              confirmButtonTitle: 'Ok',
              confirmButtonColor: '#000',
              style: 'error',
              cancellable: true,
            });
          }
        })
        .catch(error => {
          console.log('Error', error);
          SweetAlert.showAlertWithOptions({
            title: 'Sorry, Failed retry.',
            subTitle: '',
            confirmButtonTitle: 'Ok',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true,
          });
        });
    } else {
      let details = {
        func: 'update_post',
        content: postContent,
        tags: tags,
        user_id: userData.id,
        audio: audio,
        video: video,
        image: image,
        id: route.params?.key,
      };
      console.log('=================================================', details);

      let formBody = ConvertToUrlForm(details);
      fetch(postUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: formBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          console.log('update post', responseData);
          if (responseData['error'] == false) {
            navigation.navigate('HomeScreen', {createPost: true});
          } else {
            SweetAlert.showAlertWithOptions({
              title: responseData.msg,
              subTitle: '',
              confirmButtonTitle: 'Ok',
              confirmButtonColor: '#000',
              style: 'error',
              cancellable: true,
            });
          }
        })
        .catch(error => {
          console.log('Error', error);
          SweetAlert.showAlertWithOptions({
            title: 'Sorry, Failed retry.',
            subTitle: '',
            confirmButtonTitle: 'Ok',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true,
          });
        });
    }
    // navigation.navigate('Home', { createPost: true });
  };

  const onClickMic = () => {
    AudioRecord.start();

    Alert.alert('Voice Recording', 'Now, recording voice', [
      {
        text: 'Stop',
        onPress: async () => {
          // AudioRecord.stop();
          // or to get the wav file path
          var audioFile = await AudioRecord.stop();
          setAudio(audioFile);
        },
        style: 'cancel',
      },
      // {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const onClickCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        // if (Array.isArray(res)) {

        // } else {
        //   var temp = [];
        //   temp.push(res);
        //   setImage(temp);
        // }
        setImage(res.assets);
        console.log('response', JSON.stringify(res));
        console.log('image[0]?.uri', image[0]?.uri);
      }
    });
  };

  const onClickGallery = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      setImage(res);
      console.log('Images res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onClickVideo = async () => {
    let options = {
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'videos',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setVideo(res);
        console.log('response', JSON.stringify(res));
      }
    });
  };

  const userAvatar = userData.profile_pic ? (
    <Image
      source={{uri: imageUrl + 'profile_pic/' + userData.profile_pic}}
      style={{
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 30,
        width: 100,
        aspectRatio: 1,
        height: 'auto',
      }}
    />
  ) : (
    <Image
      source={Images.default_user}
      style={{
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 50,
        width: 100,
        aspectRatio: 1,
        height: 'auto',
      }}
    />
  );

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
        <Text style={styles.Txt432}>Create Post</Text>
        <View
          style={{
            backgroundColor: '#1455F5',
            borderRadius: 8,
            width: 70,
            height: 30,
            position: 'absolute',
            right: 20,
            top: 20,
          }}
          onTouchEnd={() => onClickPost()}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              marginTop: 5,
              fontSize: 12,
            }}>
            {mode ? 'Update' : 'Post'}
          </Text>
        </View>
      </View>
      <View>
        {userAvatar}
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 14}}>
          {userData.first_name} {userData.last_name}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 20,
          color: 'white',
          justifyContent: 'flex-start',
          //   padding: 10,
        }}>
        <TextInput
          multiline={true}
          numberOfLines={1}
          ref={textInputRef}
          style={{
            color: 'white',
            backgroundColor: '#2d2d2d',
            textAlignVertical: 'top',
          }}
          placeholder="Type here..."
          selectionColor={'orange'}
          placeholderTextColor={'#fff2f0'}
          value={postContent}
          onChangeText={e => setPostContent(e)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 30,
          }}>
          {image && (
            <>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: 200}}
                source={{uri: image[0]?.uri}}
                // source={Images.default_user}
              />
            </>
          )}
          {video && (
            <Video
              source={{uri: video[0]?.uri}}
              style={{width: '100%', height: 200}}></Video>
          )}
          {audio && (
            <View
              style={{
                display: 'flex',
                flexDirectrion: 'column',
                backgroundColor: '#242424',
                borderRadius: 8,
                padding: 8,
              }}>
              <Text style={{color: '#fff'}}>{audio}</Text>
            </View>
          )}
        </View>
        <MyTagInput />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderColor: '#646464',
            borderTopWidth: 0.5,
          }}>
          <TouchableOpacity
            style={{margin: 10}}
            activeOpacity={0.1}
            onPress={() => {
              onClickMic();
            }}>
            <Feather name="mic" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 10}}
            activeOpacity={0.1}
            onPress={() => {
              onClickCamera();
            }}>
            <Feather name="camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 10}}
            activeOpacity={0.1}
            onPress={() => {
              onClickGallery();
            }}>
            <Feather name="image" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 10}}
            activeOpacity={0.1}
            onPress={() => {
              onClickVideo();
            }}>
            <Feather name="video" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    backgroundColor: 'rgba(0,0,0,1)',
    width: width,
    height: height,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  Group379: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 33.57,
    height: 33.57,
    borderRadius: 16,
    zIndex: 1,
  },
  Group380: {
    position: 'absolute',
    right: 0,
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
  iconNumber: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1,
  },
});

// const mapStateToProps = state => ({
//   userData: state.accounts.userData,
// });

// const mapDispatchToProps = dispacth => ({});
export default CreatePost;
