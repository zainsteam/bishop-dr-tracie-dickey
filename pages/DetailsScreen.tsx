import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import FacebookVideoModal from '../components/Video';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Animated from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import RenderHTML from 'react-native-render-html';

type Comment = {
  id: string;
  comment: string;
  created_at: string;
  likes: number; // New property for likes
  liked_by_user: boolean; // Indicates if the current user has liked this comment
  user_device_id: any;
};

const primaryColor = '#2a0637';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // height: '100%',
    backgroundColor: '#fff',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  defaultImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    borderColor: '#0002',
    borderWidth: 1,
  },
  tinyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  videoButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  videoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: primaryColor,
    marginVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 16,
  },
  commentSection: {
    marginTop: 20,
    flex: 1,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: primaryColor,
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  commentText2: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#212529',
  },
  actionButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    color: primaryColor,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalView2: {
    height: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
  },
  closeButton: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
  },
});

const DetailsScreen = ({route}: any) => {
  const {item} = route.params;
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [isEditCommentVisible, setIsEditCommentVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        // Get the unique device ID
        const type = await DeviceInfo.getDeviceType();
        const id = await DeviceInfo.getUniqueId();
        setDeviceId('ANDROID' + id);
        setDeviceType(type);
      } catch (error) {
        console.error('Error fetching device ID:', error);
      }
    };

    fetchDeviceId();
    fetchComments();
  }, []);

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditedComment(currentText);
    setCurrentCommentId(commentId);
    setIsEditCommentVisible(true);
  };

  const handleSaveEditedComment = async () => {
    if (editedComment.trim()) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://bishopdrtraciedickeyadmin.com/api/v1/${item.categoryTitle}-update-comment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: currentCommentId,
              comment: editedComment,
              user_device_id: deviceId, // Replace with actual device ID if applicable
            }),
          },
        );
        const result = await response.json();
        if (result.status) {
          setComments(prevComments =>
            prevComments.map(comment =>
              comment.id === currentCommentId
                ? {...comment, comment: editedComment}
                : comment,
            ),
          );
          Alert.alert('Success', 'Your comment has been updated.');
          setIsEditCommentVisible(false);
        } else {
          Alert.alert('Error', result.message || 'Failed to update comment.');
        }
      } catch (error) {
        console.error('Error updating comment:', error);
        Alert.alert('Error', 'An error occurred while updating the comment.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Validation', 'Comment cannot be empty.');
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bishopdrtraciedickeyadmin.com/api/v1/${item.categoryTitle}-commentlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: item.id,
            limit: '10',
            orderby: 'created_at',
            order: 'DESC',
            user_device_id: deviceId,
            page: 1,
          }),
        },
      );
      const result = await response.json();
      setComments(result.data.data || []);
      // console.log(result.data.data, 'comments');
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://bishopdrtraciedickeyadmin.com/api/v1/${item.categoryTitle}-delete-comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: commentId,
            user_device_id: deviceId,
          }),
        },
      );
      const result = await response.json();
      if (result.status) {
        setComments(prevComments =>
          prevComments.filter(comment => comment['id'] !== commentId),
        );
        Alert.alert(result.message);
      } else {
        console.error('Failed to delete comment:', result.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = () => setIsVideoVisible(true);
  const handleCloseVideo = () => setIsVideoVisible(false);
  const handleWriteCommentPress = () => setIsWriteCommentVisible(true);
  const handleCloseWriteComment = () => setIsWriteCommentVisible(false);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://bishopdrtraciedickeyadmin.com/api/v1/${item.categoryTitle}-add-comment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: item.id,
              comment: newComment,
              user_device_id: deviceId, // Replace with actual device ID if applicable
            }),
          },
        );
        const result = await response.json();
        if (result.status) {
          setComments(prevComments => [result.data, ...prevComments]);
          Alert.alert('Success', 'Your comment has been added.');
          setNewComment('');
          handleCloseWriteComment();
        } else {
          Alert.alert('Error', result.message || 'Failed to add comment.');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        Alert.alert('Error', 'An error occurred while adding the comment.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Validation', 'Comment cannot be empty.');
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Animated.Image
              style={styles.tinyImage}
              src={item.image}
              // sharedTransitionTag={item.title + item.id}
            />
          ) : (
            <Animated.Image
              style={styles.defaultImage}
              source={require('../assets/images/defaultuser.png')}
              // sharedTransitionTag={item.title + item.id}
            />
          )}
          {item.youtube_url && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={handleVideoPress}>
              <Icon name="play" size={30} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? (
          <>
            <Text style={styles.text}>
              {item.description.replace(/<\/?[^>]+(>|$)|&[a-z]+;/g, '').trim()}
            </Text>
            {/* <RenderHTML
              // contentWidth={width}
              source={{html: item.description}}
              // tagsStyles={{
              //   p: styles.paragraph,
              //   h1: styles.title,
              //   h2: styles.subtitle,
              // }}
            /> */}
          </>
        ) : null}

        <View style={styles.actionButtonsContainer}>
          {/* <TouchableHighlight
            style={styles.actionButton}
            onPress={handleWriteCommentPress}>
            <Text style={styles.actionButtonText}>Like {item.likes}</Text>
          </TouchableHighlight> */}

          <TouchableHighlight
            style={styles.actionButton}
            onPress={handleWriteCommentPress}>
            <Text style={styles.actionButtonText}>Write a Comment</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.commentHeader}>Comments ({comments.length})</Text>
          {loading ? (
            <ActivityIndicator size="large" color={primaryColor} />
          ) : (
            <View>
              {comments.map(item => (
                <View key={item.id} style={styles.commentItem}>
                  <Text style={styles.commentText}>{item['comment']}</Text>
                  <Text style={styles.commentText2}>
                    {item['created_at'].split('T')[0]}
                  </Text>
                  {item.user_device_id == deviceId ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          handleEditComment(item.id, item.comment)
                        }>
                        <Text style={{color: primaryColor}}>Edit - </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(item.id)}>
                        <Text style={{color: primaryColor}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add Comment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isWriteCommentVisible}
          onRequestClose={handleCloseWriteComment}>
          <View style={styles.modalContent}>
            <View style={styles.modalView2}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseWriteComment}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.commentInput}
                placeholder="Write your comment here..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAddComment}>
                <Text style={styles.actionButtonText}>Post Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Video Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVideoVisible}
          onRequestClose={handleCloseVideo}>
          <View style={styles.modalContent}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseVideo}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <FacebookVideoModal
                url={item.youtube_url}
                onClose={handleCloseVideo}
              />
            </View>
          </View>
        </Modal>

        {/* Edit Comment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditCommentVisible}
          onRequestClose={() => setIsEditCommentVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalView2}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsEditCommentVisible(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.commentInput}
                placeholder="Edit your comment..."
                value={editedComment}
                onChangeText={setEditedComment}
              />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSaveEditedComment}>
                <Text style={styles.actionButtonText}>Save Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
