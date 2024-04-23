import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

type UserPostProps = {
  mode?: 'elevated',
  title: string,
  subtitle: string,
  onPress?: () => void,
};

const UserPost: React.FC<UserPostProps> = ({ mode = 'elevated', title, subtitle, onPress }) => {
  return (
    <Card mode={mode} onPress={onPress} style={styles.card}>
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">{subtitle}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    marginBottom: 10,
    borderRadius: 30,
    borderColor: '#f6a192',
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default UserPost;
