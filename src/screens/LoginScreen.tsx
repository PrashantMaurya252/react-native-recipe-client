import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Sign Screen"
        onPress={() => navigation.navigate('Signup')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:Platform.OS === 'android' ?
    paddingTop: 20,
  },
});

export default LoginScreen;
