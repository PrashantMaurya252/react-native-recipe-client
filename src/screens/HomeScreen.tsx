import {useContext} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const {userId, token} = useContext(AuthContext);
  console.log(userId, token);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
