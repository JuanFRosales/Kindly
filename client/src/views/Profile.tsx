import * as React from 'react';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import UserView from '../components/UserView';

//import {useUserContext} from '../hooks/ContextHooks';






const ProfileView= () => {
  //const {handleLogout, user} = useUserContext();
  //const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <ImageBackground
      source={require('./gradient.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <UserView

        />
      </ScrollView>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 50,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
});


export default ProfileView;
