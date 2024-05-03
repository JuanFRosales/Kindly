import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';






const UploadButton = () => (
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => console.log('Pressed')}
    color='peachpuff'
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 500,
    backgroundColor: '#f6a192',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'peachpuff',
    opacity: 0.8,
  },
})

export default UploadButton;
