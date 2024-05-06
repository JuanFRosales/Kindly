import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useUserContext } from '../hooks/ContextHooks';
import Approvals from './Approvals';
import Comments from './Comments';
import { Image } from '@rneui/base';


const UserPost = ({ item }: { item: MediaItemWithOwner }) => {
  const { user } = useUserContext();
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: 'http:' + item.thumbnail }}
        style={styles.cardCover}
      />
      <Card.Content style={styles.content}>
        <View style={styles.userInfo}>
          <Image  source={{ uri: user?.profile_picture }} style={styles.avatar}/>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={styles.postInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </View>
      </Card.Content>
      <View style={styles.actions}>
    <Button  buttonStyle={styles.button} title="📝" onPress={handleToggleComments} />
        <Approvals item={item} />
      </View>
    <Modal
      visible={showComments}
      animationType="slide"
      onRequestClose={() => setShowComments(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Comments</Text>
          <Button buttonStyle={styles.button} title="Close" onPress={() => setShowComments(false)} />
        </View>
        <Comments item={item} /> {}
      </View>
    </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgba(255, 161, 146, 0.7)',
    padding: 20,
    borderColor: 'peachpuff',
    borderWidth: 4,

  },
  cardCover: {
    aspectRatio: 1,
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 'auto',
    alignSelf: 'center',
  },
  content: {
    padding: 10,
    margin: 'auto',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
    color: '#751102',
    textShadowColor: 'peachpuff',
    textShadowOffset: { width: 1, height: 1 },
  },
  description: {
    fontSize: 16,
    color: '#751102',
    textShadowColor: 'peachpuff',
    textShadowOffset: { width: 2, height: 1 },
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 28,
  },
  postInfo: {
    marginTop: 10,
    marginLeft : 10,
    flexDirection: 'column',
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'peachpuff',
    borderWidth: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'peachpuff',
    textShadowColor: '#751102',
    textShadowOffset: { width: 1, height: 1 },
  },
  actions: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  button: {
    backgroundColor: "rgba(255, 161, 146, 0.7)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 100,
    width: 100,
    margin: 'auto',
    justifyContent: 'center',
    padding: 4,
    marginRight: 20,

  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 161, 146, 0.9)',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'peachpuff',
    textShadowColor: '#751102',
    textShadowOffset: { width: 1, height: 1 },
  },
});

export default UserPost;
