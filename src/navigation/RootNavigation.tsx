import { View } from "react-native"
import {createNativeStackNavigator} from"@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";


export type  RootStackParamList = {
    Login:undefined;
    Signup:undefined;
    Home:undefined;
    RecipeDetails:{recipeId:string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigation:React.FC=()=>{
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default RootNavigation