import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  const handleLogin = async () => {
    if (email && password) {
      const result = await signIn(email, password);
      if (result) {
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Login Failed',
          'Please check your credentials and try again',
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {/* <TextInput style={styles.input} /> */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>New here ? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#056edd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: '#007aff',
  },
});

export default LoginScreen;
