import {View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  RecipeDetails: {recipeId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootNavigation: React.FC = () => {
  const {isAuthenticated, isLoading, checkAuth} = useContext(AuthContext);

  console.log(isAuthenticated, isLoading);
  const navigation = useNavigation<NavigationProp>();
  // useEffect(() => {
  //   checkAuth();
  // }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }
  }, [isLoading, isAuthenticated, navigation]);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // screenOptions={{headerShown: true}}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
