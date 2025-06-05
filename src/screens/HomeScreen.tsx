import {useContext} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {userId, token, signOut} = useContext(AuthContext);
  console.log(userId, token);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },

      {
        text: 'Logout',
        onPress: async () => {
          await signOut();
          navigation.replace('Login');
        },
      },
    ]);
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
