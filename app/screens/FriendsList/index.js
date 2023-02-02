import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const stableData = [
  {
    id: 1,
    name: 'Elizabeth Cole',
    avatar: {uri: 'https://mui.com/static/images/avatar/2.jpg'},
  },
  {
    id: 2,
    name: 'Jonsion',
    avatar: {uri: 'https://mui.com/static/images/avatar/3.jpg'},
  },
  {
    id: 3,
    name: 'Caroline Abbott',
    avatar: {uri: 'https://mui.com/static/images/avatar/4.jpg'},
  },
  {
    id: 4,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/5.jpg'},
  },
  {
    id: 5,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/6.jpg'},
  },
  {
    id: 6,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/1.jpg'},
  },
  {
    id: 7,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/7.jpg'},
  },
  {
    id: 8,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/2.jpg'},
  },
  {
    id: 9,
    name: 'Josefina Montoya',
    avatar: {uri: 'https://mui.com/static/images/avatar/3.jpg'},
  },
];

const FriendsList = props => {
  var friends = props.data;
  friends = stableData;
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Text style={styles.title}>Friends</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {friends.map(item => (
            <TouchableOpacity key={item.id} style={styles.friendItem}>
              <View style={styles.imageView}>
                <Image source={item.avatar} style={styles.image} />
              </View>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingTop: 35,
    paddingHorizontal: 15,
  },
  friendItem: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageView: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  title: {
    color: 'white',
    paddingBottom: 10,
    fontSize: 18,
  },
  text: {
    paddingLeft: 15,
    color: 'white',
  },
});
