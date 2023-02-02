import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Avatar from '../../components/Avatar';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {addPost} from '../../actions';

const K_OPTIONS = [
  {
    item: 'Photoshoot',
    id: 'photoshoot',
  },
  {
    item: 'Video',
    id: 'video',
  },
  {
    item: 'Audio',
    id: 'audio',
  },
  {
    item: 'Capture',
    id: 'capture',
  },
];

const Upload = props => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [contentText, setContentText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  function onChange() {
    return val => setSelectedTag(val);
  }

  function onPost() {
    console.log(contentText);
    console.log(selectedTag);
    if (contentText === '') {
      console.log('Please input content');
      return false;
    } else if (selectedTag === '' || selectedTag === null) {
      console.log('Please select tag');
    } else {
      if (Object.keys(user).length !== 0) {
        dispatch(
          addPost(user.user.id, contentText, selectedTag, res => {
            console.log(res.data);
          }),
        );
      }
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.avatar}>
          <Avatar url={'https://mui.com/static/images/avatar/2.jpg'} />
        </View>
        <Text style={[styles.text, {textAlign: 'center'}]}>Jon Doe</Text>
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Whats on your mind!"
          placeholderTextColor="grey"
          //   numberOfLines={30}
          //   multiline={true}
          value={contentText}
          onChangeText={e => setContentText(e)}
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'white',
        }}>
        <SelectBox
          label=""
          inputPlaceholder="Add a Tag"
          labelStyle={{color: 'white'}}
          optionsLabelStyle={{color: 'white'}}
          selectedItemStyle={{color: 'white'}}
          searchIconColor="blue"
          toggleIconColor="blue"
          arrowIconColor="blue"
          options={K_OPTIONS}
          value={selectedTag}
          onChange={onChange()}
          hideInputFilter={false}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <MaterialIcons name="settings-voice" size={30} color="white" />
        </View>
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <Feather name="camera" size={30} color="white" />
        </View>
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <Octicons name="device-camera-video" size={30} color={'white'} />
        </View>
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <Ionicons name="images-outline" size={30} color={'white'} />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={onPost}>
          <Text style={styles.text}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 15,
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textAreaContainer: {
    padding: 5,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    maxHeight: '100%',
    height: 'auto',
    resizeMode: 'cover',
  },
  textArea: {
    height: 200,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: 'white',
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
  },
});

export default Upload;
