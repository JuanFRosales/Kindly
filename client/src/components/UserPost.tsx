import {Card, Icon, ListItem, Button, Avatar, Text} from '@rneui/base';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import Approvals from './Approvals';



type Props = {
  item: MediaItemWithOwner;

};

const UserPost = ({item }: Props) => {
  const {user} = useUserContext();
  return (
    <Card>
      <Card.Image
        style={{aspectRatio: 1, height: 300}}
        source={{uri: 'http:' + item}}
      />
      <Card.Divider />
      <ListItem.Swipeable
        onSwipeBegin={(evt) => {
          console.log(evt);
        }}
        leftContent={(reset) => (
          <ListItem>
            {user && user.user_id === item.user_id ? (
              <>
                <Button
                  color="error"
                  onPress={() => {
                    console.log('delete');
                  }}
                >
                  {' '}
                  <Icon type="ionicon" name="trash" color="white" />
                </Button>
              </>
            ) : (
              <ListItem.Content>
                <ListItem.Title>Kukkuu</ListItem.Title>
              </ListItem.Content>
            )}
          </ListItem>
        )}
      >
        {user && user.user_id === item.user_id && (
          <ListItem.Chevron
            color="black"
            style={{transform: 'rotate(180deg)'}}
          />
        )}
        <Avatar
          size={50}
          icon={{
            name: item.media_type.includes('image') ? 'image' : 'film',
            type: 'ionicon',
            color: '#333',
          }}
        />
        <ListItem.Content>
          <Text h4>{item.title}</Text>
          <Text>
            By: {item.username}, at:{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </Text>
        </ListItem.Content>

        <Approvals item={item} />
      </ListItem.Swipeable>
    </Card>
  );
};
export default UserPost;
