import {Image, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from '../types/DBTypes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: Props) => {
  // tai propsin sijasta hookilla const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched', item.title);
        navigation.navigate('Single Media', item);
      }}
    >
      {/* <Image style={{height: 300}} source={{uri: 'http:' + item.thumbnail}} /> */}
      <Text>{item.title}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
    </TouchableOpacity>
  );
};
export default MediaListItem;
