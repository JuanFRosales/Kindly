import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AvatarExample from './ProfilePicture';
import { text } from 'stream/consumers';

type UserPostProps = {
  mode?: 'elevated',
  title: string,
  description: string,
  onPress?: () => void,
};

const UserPost: React.FC<UserPostProps> = ({ mode = 'elevated', title, description, onPress }) => {
  return (
    <Card mode={mode} onPress={onPress} style={styles.card}>
      <Card.Title
        title={null} // Add user name here
        left={(props) => <AvatarExample {...props}  />}
      />
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/400' }} />
      <Card.Actions>
        <Button style={styles.button}>❤️‍🔥</Button>
        <Button style={styles.button}>&#128172;</Button>
      </Card.Actions>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(246, 161, 146, 0.7)',
    marginBottom: 10,
    borderRadius: 30,
    borderColor: '#f6a192',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#de6752',
    marginRight: 10,
    borderWidth: 0,
  },
});

export default UserPost;
