import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Avatar from './Avatar';
import {Images} from '../assets/images';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import {useSelector, useDispatch} from 'react-redux';
import {calcTime} from '@util';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import PostItem from './PostItem';

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
import {imageUrl, postUrl} from '../constants';

const {width, height} = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

// let like_num;
// let bookmark_num;

const Post = props => {
  let {post, route, navigation} = props.props;
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let userInfo = user.user;

  const [posts, setPosts] = useState([]);
  const [postMenuVisibles, setPostMenuvisibles] = useState([]);
  const [commentsVisibles, setCommentsVisibles] = useState([]);
  const [commentContents, setCommentContents] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0.0);
  const [uploadIndeterminate, setUploadIndeterminate] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // getPosts();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (route.params?.createPost) {
      animate();
    } else {
      fetchFriends();
    }
  }, [route]);

  const animate = () => {
    setUploadVisible(true);
    let progress = 0;
    setUploadProgress(progress);
    setTimeout(() => {
      setUploadIndeterminate(false);
      let timer = setInterval(() => {
        progress += Math.random() / 5.0;
        if (progress > 1) {
          progress = 1;
          setUploadVisible(false);
          fetchPosts();
          ToastAndroid.show(
            'Your post uploaded successfully.',
            ToastAndroid.SHORT,
          );
          clearInterval(timer);
        }
        setUploadProgress(progress);
      }, 500);
    }, 0);
  };

  const uploadScreen = () => {
    return (
      <>
        {uploadVisible ? (
          <Progress.Circle
            style={{
              margin: 10,
              zIndex: 1,
              position: 'absolute',
              top: deviceHeight / 2,
              left: width / 2.5,
            }}
            progress={uploadProgress}
            indeterminate={uploadIndeterminate}>
            <Text style={{color: 'black', marginLeft: 10}}>
              {Math.round(uploadProgress.toFixed(2) * 100)}%
            </Text>
          </Progress.Circle>
        ) : null}
      </>
    );
  };

  const fetchPosts = async () => {
    let followers = [];
    let friends = [];
    let postUsers = [];
    let _posts = [];
    let post_details = [];

    setIsLoadingPosts(true);
    if (Object.keys(user).length !== 0) {
      dispatch(
        fetchFollowers(user?.user?.id, async res => {
          const data = await res.data;
          if (!data.error) {
            for (let item in data.data) {
              if (!isNaN(item)) {
                followers.push(data.data[item]);
              }
            }
          }
        }),
      );
      dispatch(
        fetchFriends(user?.user?.id, async res => {
          const data = res.data;
          if (!data.error) {
            for (let item in data.data) {
              if (!isNaN(item)) {
                friends.push(data.data[item]);
              }
            }
          }
        }),
      );
    }

    postUsers = [
      ...followers.map(e => e.target_user),
      ...friends.map(e => e.target_user),
      userInfo.id,
    ];

    await Promise.all(
      postUsers.map(user => {
        dispatch(
          getAllPost(user, res => {
            const data = res.data;
            if (!data.error) {
              for (const item in data.data) {
                if (!isNaN(parseInt(item))) {
                  _posts.push(data.data[item]);
                }
              }
              let totalPostsLength = _posts.length;
              if (totalPostsLength > 0) {
                _posts.map(async (_post, index) => {
                  dispatch(
                    getPostById(_post.post_id, async res => {
                      var data = res.data;

                      let postData = {};
                      for (let i in data) {
                        if (i === '0') {
                          postData = data[i];
                        }
                      }
                      post_details.push({..._post, ...postData});
                      post_details.sort((a, b) => {
                        return (
                          new Date(b.modified).getTime() -
                          new Date(a.modified).getTime()
                        );
                      });

                      // total post details
                      let totalPostsDetailsLength = post_details.length;
                      if (totalPostsDetailsLength > 0) {
                        await post_details.map(async (post, indexDetail) => {
                          dispatch(
                            getUserById(post.user_id, res => {
                              var data = res.data;
                              let tempUser = {};
                              // for (let i in data) {
                              //   if (i === '0') {
                              //     tempUser = data[i];
                              //   }
                              // }
                              tempUser = data[0];
                              post_details[indexDetail].userInfo = {
                                ...tempUser,
                              };
                              post_details.sort((a, b) => {
                                return (
                                  new Date(b.modified).getTime() -
                                  new Date(a.modified).getTime()
                                );
                              });
                              if (
                                indexDetail === totalPostsDetailsLength - 1 &&
                                index === totalPostsLength - 1
                              ) {
                                // setPosts(
                                //   post_details.filter(
                                //     e => hideLists.findIndex(i => i == e.post_id) == -1,
                                //   ),
                                // );
                                console.log('setPosts 1');
                                setPosts(post_details);

                                setPostMenuvisibles(
                                  new Array(post_details.length).fill(false),
                                );
                                setCommentsVisibles(
                                  new Array(post_details.length).fill(false),
                                );
                                setIsLoadingPosts(false);
                              }
                            }),
                          );
                        });
                      } else {
                        if (index === totalPostsLength - 1) {
                          // setPosts(
                          //   post_details.filter(
                          //     e => hideLists.findIndex(i => i == e.post_id) == -1,
                          //   ),
                          // );
                          console.log('setPosts 2');
                          setPosts(post_details);
                          setPostMenuvisibles(
                            new Array(post_details.length).fill(false),
                          );
                          setCommentsVisibles(
                            new Array(post_details.length).fill(false),
                          );
                          setIsLoadingPosts(false);
                        }
                      }
                    }),
                  );
                });
              } else {
                // setPosts(
                //   post_details.filter(
                //     e => hideLists.findIndex(i => i == e.post_id) == -1,
                //   ),
                // );
                console.log('setPosts 3');
                setPosts(post_details);
                setPostMenuvisibles(new Array(post_details.length).fill(false));
                setCommentsVisibles(new Array(post_details.length).fill(false));
                setIsLoadingPosts(false);
              }
            }
          }),
        );
      }),
    ).then(() => {});
  };

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
  const onTogglePostMenu = (id = 0) => {
    // ...
    let oldPostMenuVisibles = postMenuVisibles.concat();
    if (oldPostMenuVisibles[id] === false) {
      oldPostMenuVisibles.fill(false);
    }
    oldPostMenuVisibles[id] = !oldPostMenuVisibles[id];
    setPostMenuvisibles(oldPostMenuVisibles);
  };

  const onUpdateLike = (index, postId, likes) => {
    let l = Number(likes) + 1;
    dispatch(
      updateLikes(user?.user?.id, postId, l, async res => {
        const data = res.data;
        // console.log('updateLike: ', data);
        fetchPosts();
      }),
    );
  };

  const onUpdateBookmark = (index, postId, bookmark) => {
    let b = Number(bookmark) + 1;
    // console.log('UpdateBookmark: ', b);
    dispatch(
      updateBookmark(user?.user?.id, postId, b, async res => {
        const data = res.data;
        // console.log('updateLike: ', data);
        fetchPosts();
      }),
    );
  };

  const onToggleComments = (id = 0) => {
    let oldCommentsVisibles = commentsVisibles.concat();
    if (oldCommentsVisibles[id] == false) {
      oldCommentsVisibles.fill(false);
    }
    oldCommentsVisibles[id] = !oldCommentsVisibles[id];
    setCommentsVisibles(oldCommentsVisibles);
  };

  const onEditPost = (key, content) => {
    // onTogglePostMenu(key);
    navigation.navigate('CreatePost', {
      editMode: true,
      content: content,
      key: key,
    });
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

  const getUserImage = uri => {
    if (uri != undefined && uri != '') {
      return (
        <Image
          source={{uri: imageUrl + 'profile_pic/' + uri}}
          style={{
            alignSelf: 'center',
            width: 20,
            aspectRatio: 1,
            height: 'auto',
            borderRadius: 50,
          }}
        />
      );
    } else {
      return (
        <Image
          source={Images.default_user}
          style={{
            alignSelf: 'center',
            width: 20,
            aspectRatio: 1,
            height: 'auto',
            borderRadius: 50,
          }}
        />
      );
    }
  };

  const onPostComment = postId => {
    // let indexOfComment = commentContents.findIndex(e => e.id == index);
    // if (indexOfComment === -1) {
    //   Alert.alert('Error', 'Enter Invalid');
    //   return;
    // }
    // let comment = commentContents[indexOfComment];
    const lcb = 'comment';
    dispatch(
      postComment(
        user?.user?.id,
        postId,
        lcb,
        // like_num,
        // bookmark_num,
        comment,
        async res => {
          const data = res.data;
          fetchPosts();
        },
      ),
    );
  };

  // const postItem = (data, key) => {
  //   let comments = [];
  //   if (Array.isArray(data.comments)) {
  //     comments = data.comments.concat();
  //   } else {
  //     for (const item in data.comments) {
  //       if (!isNaN(parseInt(item))) {
  //         comments.push(data.comments[item]);
  //       }
  //     }
  //   }

  //   let likes = data.likes;

  //   let postTime = calcTime(data.modified);
  //   let displayTime =
  //     postTime[0] > 0
  //       ? postTime[0] + ' day ago'
  //       : postTime[1] > 0
  //       ? postTime[1] + ' hours ago'
  //       : postTime[2] > 0
  //       ? postTime[2] + ' minutes ago'
  //       : 'Just Now';
  //   const userAvatar = (
  //     <View
  //       style={{
  //         alignSelf: 'center',
  //         width: 55,
  //         aspectRatio: 1,
  //         borderRadius: 50,
  //         borderColor: '#1455F5',
  //         borderWidth: 3,
  //         padding: 1,
  //         height: 'auto',
  //         alignItems: 'center',
  //       }}>
  //       <Image
  //         source={{
  //           uri: imageUrl + 'profile_pic/' + data.userInfo?.profile_pic,
  //         }}
  //         style={{
  //           width: 47,
  //           aspectRatio: 1,
  //           borderRadius: 50,
  //           height: 'auto',
  //         }}
  //       />
  //     </View>
  //   );
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'column',
  //       }}
  //       key={key}>
  //       <View
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           marginBottom: 10,
  //         }}>
  //         {userAvatar}
  //         <View style={{...styles.columnStyle, marginLeft: 10}}>
  //           <Text style={{color: 'white'}}>
  //             {data.userInfo?.first_name + ' ' + data.userInfo?.last_name }
  //             <Text style={{fontSize: 10}}>(Rack Music)</Text>
  //           </Text>
  //           <Text style={styles.Txt9010}>{displayTime}</Text>
  //         </View>
  //         <Image
  //           source={Images.i_three_dot}
  //           style={{position: 'absolute', right: 10}}
  //           onStartShouldSetResponder={() => onTogglePostMenu(key)}
  //         />
  //       </View>
  //       <View>
  //         {postMenuVisibles[key] ? (
  //           data.user_id != userInfo.id ? (
  //             <View
  //               style={{
  //                 ...styles.columnStyle,
  //                 position: 'absolute',
  //                 top: 0,
  //                 backgroundColor: 'white',
  //                 zIndex: 1,
  //                 width: '100%',
  //                 borderTopLeftRadius: 10,
  //                 borderTopRightRadius: 10,
  //                 alignItems: 'flex-start',
  //                 justifyContent: 'center',
  //                 paddingLeft: 40,
  //               }}
  //               onTouchEnd={() => onTogglePostMenu(key)}>
  //               <View style={{...styles.rowStyle, padding: 5}}>
  //                 <Image
  //                   source={Images.i_eyehide}
  //                   style={{alignSelf: 'center'}}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}}>
  //                   <Text>Hide Post</Text>
  //                   <Text style={{fontSize: 10}}>
  //                     See fewer posts like this.
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={{...styles.rowStyle, padding: 5}}>
  //                 <Image
  //                   source={Images.i_warning}
  //                   style={{alignSelf: 'center'}}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}}>
  //                   <Text>Report this post</Text>
  //                   <Text style={{fontSize: 10}}>
  //                     Tell us a problem with this post.
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={{...styles.rowStyle, padding: 5}}>
  //                 <Image
  //                   source={Images.i_minus}
  //                   style={{alignSelf: 'center'}}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}}>
  //                   <Text>Block</Text>
  //                   <Text style={{fontSize: 10}}>Block this user.</Text>
  //                 </View>
  //               </View>
  //               <View style={{...styles.rowStyle, padding: 5}}>
  //                 <Image
  //                   source={Images.i_user_delete}
  //                   style={{alignSelf: 'center'}}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}}>
  //                   <Text>Unfollow</Text>
  //                   <Text style={{fontSize: 10}}>
  //                     Stop seeing post from the user.
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //           ) : (
  //             <View
  //               style={{
  //                 ...styles.columnStyle,
  //                 position: 'absolute',
  //                 top: 0,
  //                 backgroundColor: 'white',
  //                 zIndex: 1,
  //                 width: '100%',
  //                 borderTopLeftRadius: 10,
  //                 borderTopRightRadius: 10,
  //                 alignItems: 'flex-start',
  //                 justifyContent: 'center',
  //                 paddingLeft: 40,
  //               }}>
  //               <View
  //                 style={{
  //                   ...styles.rowStyle,
  //                   padding: 10,
  //                   marginVertical: 5,
  //                 }}
  //                 onTouchEnd={() => {
  //                   onTogglePostMenu(key);
  //                   onEditPost(data.id, data.content);
  //                 }}>
  //                 <Image
  //                   source={Images.i_edit}
  //                   style={{
  //                     alignSelf: 'center',
  //                     width: 24,
  //                     height: 24,
  //                     tintColor: 'blue',
  //                   }}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}} on>
  //                   <Text style={{fontSize: 14}}>Edit Post</Text>
  //                 </View>
  //               </View>
  //               <View
  //                 onTouchEnd={() => {
  //                   onTogglePostMenu(key);
  //                   onDeletePost(data.id);
  //                 }}
  //                 style={{
  //                   ...styles.rowStyle,
  //                   padding: 10,
  //                   marginVertical: 5,
  //                 }}>
  //                 <Image
  //                   source={Images.i_warning}
  //                   style={{alignSelf: 'center', tintColor: 'red'}}
  //                 />
  //                 <View style={{...styles.columnStyle, marginLeft: 20}}>
  //                   <Text style={{fontSize: 14}}>Delete post</Text>
  //                 </View>
  //               </View>
  //             </View>
  //           )
  //         ) : null}
  //         <View style={{flexWrap: 'wrap'}}>
  //           <ReadMore
  //             numberOfLines={5}
  //             renderTruncatedFooter={_renderTruncatedFooter}
  //             renderRevealedFooter={_renderRevealedFooter}>
  //             <Text style={[styles.text, {flexWrap: 'wrap'}]}>
  //               {data.content}
  //             </Text>
  //           </ReadMore>
  //           {/* </Text> */}
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           ...styles.rowStyle,
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //           padding: 10,
  //           marginTop: 5,
  //         }}>
  //         <View>
  //           <TouchableOpacity
  //             activeOpacity={0.5}
  //             onPress={() => {
  //               onUpdateLike(key, data.post_id, data.likes);
  //             }}>
  //             <Image source={Images.i_heart_white} style={styles.footerIcon} />
  //             <Text style={styles.text}>{likes}</Text>
  //           </TouchableOpacity>
  //         </View>
  //         <View>
  //           <Image
  //             source={Images.message}
  //             style={styles.footerIcon}
  //             onTouchEnd={() => onToggleComments(key)}
  //           />
  //           <Text style={styles.text}>{comments?.length}</Text>
  //         </View>
  //         <View>
  //           <TouchableOpacity
  //             activeOpacity={0.5}
  //             onPress={() => {
  //               onUpdateBookmark(key, data.post_id, data.bookmark);
  //             }}>
  //             <Image
  //               source={Images.i_bookmark_white}
  //               style={{...styles.footerIcon, width: 40}}
  //             />
  //             <Text style={{color: '#fff', textAlign: 'center'}}>
  //               {data.bookmark}
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       {commentsVisibles[key] ? (
  //         <View
  //           style={{
  //             backgroundColor: '#262626',
  //             width: '100%',
  //             alignItems: 'flex-start',
  //             justifyContent: 'center',
  //             paddingHorizontal: 20,
  //             borderColor: 'white',
  //             borderRadius: 10,
  //             borderWidth: 2,
  //           }}>
  //           {comments.map((comment, key) => {
  //             return (
  //               <View
  //                 key={key}
  //                 style={{
  //                   flexDirection: 'row',
  //                   borderColor: 'white',
  //                   borderWidth: 2,
  //                   borderRadius: 10,
  //                   width: '100%',
  //                   marginVertical: 10,
  //                   padding: 10,
  //                 }}>
  //                 {getUserImage(comment.profile_pic)}
  //                 <Text
  //                   style={{
  //                     color: 'orange',
  //                     marginLeft: 10,
  //                     width: '20%',
  //                     fontSize: 12,
  //                     textAlignVertical: 'center',
  //                     textAlign: 'center',
  //                     fontStyle: 'italic',
  //                   }}>
  //                   {comment.first_name + ' ' + comment.last_name}
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     color: 'white',
  //                     marginLeft: 10,
  //                     fontSize: 12,
  //                     flex: 1,
  //                     textAlignVertical: 'center',
  //                   }}>
  //                   {comment.comment.length > 0
  //                     ? comment.comment
  //                     : 'No Comment.'}
  //                 </Text>
  //               </View>
  //             );
  //           })}
  //           <TextInput
  //             multiline={true}
  //             numberOfLines={5}
  //             style={{
  //               color: 'white',
  //               textAlignVertical: 'top',
  //               borderRadius: 10,
  //               borderColor: 'white',
  //               borderWidth: 3,
  //               width: '100%',
  //               marginTop: 20,
  //             }}
  //             placeholder=" Type here..."
  //             selectionColor={'orange'}
  //             placeholderTextColor={'#fff2f0'}
  //             onChangeText={e => setComment(e)}
  //           />
  //           <View
  //             style={{
  //               backgroundColor: '#1455F5',
  //               borderRadius: 15,
  //               width: '100%',
  //               marginBottom: 15,
  //               marginTop: 15,
  //             }}
  //             onTouchEnd={() => onPostComment(data.id)}>
  //             <Text
  //               style={{
  //                 color: 'white',
  //                 textAlign: 'center',
  //                 paddingVertical: 10,
  //               }}>
  //               Post a Comment
  //             </Text>
  //           </View>
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoadingPosts ? (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              height: height / 2,
            }}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{alignSelf: 'center'}}
            />
          </View>
        ) : (
          <ScrollView>
            {posts &&
              posts.map((post, index) => (
                <PostItem
                  key={index}
                  data={post}
                  index={index}
                  postsLength={posts.length}
                  navigation={navigation}
                  fetchPosts={fetchPosts}
                />
              ))}
            {/* {posts && posts.map((post, key) => postItem(post, key))} */}
            {posts.length === 0 && (
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  flex: 1,
                  marginTop: 200,
                  fontSize: 20,
                }}>
                No Posts
              </Text>
            )}
          </ScrollView>
        )}
        {uploadScreen()}
      </View>
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    maxWidth: '100%',
    paddingVertical: 15,
    marginBottom: 230,
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
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '400',
    color: 'rgba(116,116,116,1)',
  },
  // fontWhite: {
  //   color: 'white',
  // }
});
