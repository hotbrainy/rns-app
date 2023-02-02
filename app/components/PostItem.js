/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {imageUrl, postUrl} from '../constants';
import {Images} from '../assets/images';
import ReadMore from 'react-native-read-more-text';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchFollowers,
  fetchFriends,
  getPostById,
  getUserById,
  getAllPost,
  deletePost,
  updateLikes,
  updateBookmark,
  postComment,
} from '@actions';
import {calcTime} from '@util';
import { Dimensions } from 'react-native';

export default ({data, index, navigation, fetchPosts, postsLength}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [postMenu, setPostMenu] = useState(false);
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [likes, setLikes] = useState(data.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [bookMark, setBookmark] = useState(data.bookmark);
  const {width, height} = Dimensions.get('screen');

  useEffect(() => {
    let commentList = [];

    if (Array.isArray(data.comments)) {
      commentList = data.comments.concat();
    } else {
      for (const item in data.comments) {
        if (!isNaN(parseInt(item))) {
          commentList.push(data.comments[item]);
        }
      }
    }
    setComments(commentList);
  }, []);

  let postTime = calcTime(data.created);
  let displayTime =
    postTime[0] > 0
      ? postTime[0] + ' day ago'
      : postTime[1] > 0
      ? postTime[1] + ' hours ago'
      : postTime[2] > 0
      ? postTime[2] + ' minutes ago'
      : 'Just Now';

  const onEditPost = (key, content) => {
    navigation.navigate('CreatePost', {
      editMode: true,
      content: content,
      key: key,
    });
  };

  const sendRqPost = (action, key) => {
    if (action === 'del') {
      dispatch(
        deletePost(key, async res => {
          const data = res.data;
          // console.log('deleted post: ', data);
          if (data.error) {
            ToastAndroid.show(
              'Sorry, Failed. Try again later.',
              ToastAndroid.SHORT,
            );
          } else {
            ToastAndroid.show('Removed successfully', ToastAndroid.SHORT);
            fetchPosts();
          }
        }),
      );
    }
  };

  const onDeletePost = key => {
    // onTogglePostMenu(key);
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => sendRqPost('del', key),
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onUpdateLike = (index, postId, likes) => {
    let l = Number(likes) + 1;
    dispatch(
      updateLikes(user?.user?.id, postId, l, async res => {
        const data = res.data;
        setLikes(l);
      }),
    );
  };

  const onUpdateBookmark = (index, postId, bookmark) => {
    let b = Number(bookmark) + 1;
    // console.log('UpdateBookmark: ', b);
    dispatch(
      updateBookmark(user?.user?.id, postId, b, async res => {
        const data = res.data;
        setBookmark(b);
      }),
    );
  };

  const onPostComment = postId => {
    if (comment === '') {
      ToastAndroid.show('Please input the your comment', ToastAndroid.SHORT);
    } else {
      const lcb = 'comment';
      dispatch(
        postComment(user?.user?.id, postId, lcb, comment, async res => {
          const data = res.data;
          fetchPosts();
        }),
      );
    }
    // let indexOfComment = commentContents.findIndex(e => e.id == index);
    // if (indexOfComment === -1) {
    //   Alert.alert('Error', 'Enter Invalid');
    //   return;
    // }
    // let comment = commentContents[indexOfComment];
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 10,
      }}>
      {/* Post Item Header */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            alignSelf: 'center',
            width: 55,
            aspectRatio: 1,
            borderRadius: 50,
            borderColor: '#1455F5',
            borderWidth: 3,
            padding: 1,
            height: 'auto',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: imageUrl + 'profile_pic/' + data.userInfo?.profile_pic,
            }}
            style={{
              width: 47,
              aspectRatio: 1,
              borderRadius: 50,
              height: 'auto',
            }}
          />
        </View>
        <View style={{...styles.columnStyle, marginLeft: 10}}>
          <Text style={{color: 'white'}}>
            {data.userInfo?.first_name + ' ' + data.userInfo?.last_name}
            <Text style={{fontSize: 10}}>(Rack Music)</Text>
          </Text>
          <Text style={styles.Txt9010}>{displayTime}</Text>
        </View>
        <Image
          source={Images.i_three_dot}
          style={{position: 'absolute', right: 10}}
          onStartShouldSetResponder={() => setPostMenu(!postMenu)}
        />
      </View>
      {/* Post Item Edit */}
      <View>
        {postMenu ? (
          <View
            style={{
              ...styles.columnStyle,
              position: 'absolute',
              top: 0,
              backgroundColor: 'white',
              zIndex: 1,
              width: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 40,
            }}>
            <View
              style={{
                ...styles.rowStyle,
                padding: 10,
                marginVertical: 5,
              }}
              onTouchEnd={() => {
                setPostMenu(!postMenu);
                onEditPost(data.id, data.content);
              }}>
              <Image
                source={Images.i_edit}
                style={{
                  alignSelf: 'center',
                  width: 24,
                  height: 24,
                  tintColor: 'blue',
                }}
              />
              <View style={{...styles.columnStyle, marginLeft: 20}} on>
                <Text style={{fontSize: 14}}>Edit Post</Text>
              </View>
            </View>
            <View
              onTouchEnd={() => {
                setPostMenu(!postMenu);
                onDeletePost(data.id);
              }}
              style={{
                ...styles.rowStyle,
                padding: 10,
                marginVertical: 5,
              }}>
              <Image
                source={Images.i_warning}
                style={{alignSelf: 'center', tintColor: 'red'}}
              />
              <View style={{...styles.columnStyle, marginLeft: 20}}>
                <Text style={{fontSize: 14}}>Delete post</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
      {/* Post Item Content */}
      <View>
        <ReadMore
          numberOfLines={5}
          renderTruncatedFooter={handlePress => (
            <Text
              style={{color: 'white', textAlign: 'right', marginRight: 10}}
              onPress={handlePress}>
              Read more
            </Text>
          )}
          renderRevealedFooter={handlePress => (
            <Text
              style={{color: 'white', textAlign: 'right', marginRight: 10}}
              onPress={handlePress}>
              Show less
            </Text>
          )}>
          <Text style={[styles.text, {flexWrap: 'wrap'}]}>{data.content}</Text>
        </ReadMore>
        <Image source={Images.record} style={{width: '100%'}}/>
      </View>
      {/* Like, Comments, Bookmark */}
      <View
        style={{
          ...styles.rowStyle,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          marginTop: 5,
        }}>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              onUpdateLike(index, data.post_id, data.likes);
            }}>
            <Image source={Images.i_heart_white} style={styles.footerIcon} />
            <Text style={styles.text}>{likes}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={Images.message}
            style={styles.footerIcon}
            onTouchEnd={() => setShowCommentsList(!showCommentsList)}
          />
          <Text style={styles.text}>{comments.length}</Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              onUpdateBookmark(index, data.post_id, bookMark);
            }}>
            <Image
              source={Images.i_bookmark_white}
              style={{...styles.footerIcon, width: 40}}
            />
            <Text style={{color: '#fff', textAlign: 'center'}}>
              {bookMark}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Comments */}
      {showCommentsList ? (
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderColor: 'white',
          }}>
          {comments.map((comment, key) => {
            return (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  borderColor: 'white',
                  width: '100%',
                  padding: 10,
                }}>
                <Image
                  source={{
                    uri: imageUrl + 'profile_pic/' + comment.profile_pic,
                  }}
                  style={{
                    alignSelf: 'center',
                    width: 30,
                    aspectRatio: 1,
                    height: 'auto',
                    borderRadius: 50,
                  }}
                />
                <View
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 10,
                    marginLeft: 10,
                    paddingHorizontal: 10
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 14,
                      textAlignVertical: 'center',
                    }}>
                    {comment.first_name + ' ' + comment.last_name}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      flex: 1,
                      textAlignVertical: 'center',
                    }}>
                    {comment.comment.length > 0
                      ? comment.comment
                      : 'No Comment.'}
                  </Text>
                </View>
              </View>
            );
          })}
          <TextInput
            multiline={true}
            numberOfLines={1}
            style={{
              color: 'white',
              textAlignVertical: 'top',
              borderRadius: 10,
              borderColor: 'white',
              borderWidth: 1,
              width: '100%',
              marginTop: 20,
            }}
            placeholder=" Type here..."
            selectionColor={'orange'}
            placeholderTextColor={'#fff2f0'}
            onChangeText={e => setComment(e)}
          />
          <View
            style={{
              backgroundColor: '#1455F5',
              borderRadius: 15,
              width: '100%',
              marginBottom: 15,
              marginTop: 15,
            }}
            onTouchEnd={() => onPostComment(data.post_id)}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                paddingVertical: 10,
              }}>
              Post a Comment
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    maxWidth: '100%',
    paddingVertical: 15,
    marginBottom: 100,
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnStyle: {
    display: 'flex',
    flexDirection: 'column',
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
  image: {
    width: 66,
    height: 66,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'red',
    padding: 10,
  },
  postFooterImage: {
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    padding: 15,
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  hint_text: {
    color: 'gray',
    fontSize: 10,
  },
  Txt9010: {
    fontSize: 9,
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },
});
