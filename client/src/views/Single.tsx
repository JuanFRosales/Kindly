import {Image, Text, View} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import {MediaItemWithOwner} from '../types/DBTypes';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('&#x2F;');

  return (
    <View>
      <Text>{item.title}</Text>
      {fileType === 'image' ? (
        <Image style={{height: 500}} source={{uri: 'http:' + item.filename}} />
      ) : (
        <Video
          style={{height: 400}}
          source={{uri: 'http:' + item.filename}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
      <Text>{item.description}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      <Text>Owner: {item.username}</Text>
      <Text>
        Media type: {fileType} / {fileFormat}
      </Text>
      <Text>File size: {Math.round(item.filesize / 1024)} kB</Text>
    </View>
  );
};

export default Single;
