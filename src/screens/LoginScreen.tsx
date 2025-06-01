import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;

  interface LoginScreenProps{
    navigation : LoginScreenNavigationProp
  }
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title='Go to Sign Up' onPress={()=>navigation.navigate('Signup')}/>
    </View>
  );
};

export default LoginScreen;
