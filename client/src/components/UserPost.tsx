import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useUserContext } from '../hooks/ContextHooks';
import Approvals from './Approvals';
import UserAvatar from './UserAvatar';
import Comments from './Comments';
import { Image } from '@rneui/base';

const UserPost = ({ item }: { item: MediaItemWithOwner }) => {
  const { user } = useUserContext();

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
        <Text style={styles.description}> {item.description}</Text>
      <Approvals item={item} />
        </View>
      </Card.Content>
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
    overflow: 'visible',
  },
  cardCover: {
    aspectRatio: 1,
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
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
    marginLeft : 78,
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
    justifyContent: 'flex-end',
  },
});

export default UserPost;
