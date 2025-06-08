import {useContext, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import CreateRecipeForm from '../components/CreateRecipeForm';
import {Recipe, RecipeContext} from '../context/RecipeContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {userId, token, signOut} = useContext(AuthContext);
  const {createRecipe} = useContext(RecipeContext);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleOnCreateRecipe = async (
    newRecipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => {
    createRecipe(newRecipe);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Recipes ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setShowModal(true)}>
          <Text style={styles.iconBtnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* render all the recipies */}

      {/* Modal for creating new recipe */}
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <CreateRecipeForm
          onSubmit={handleOnCreateRecipe}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#007aff',
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 15,
  },
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: {
    fontSize: 20,
    color: '#0071ff',
  },
  logoutButton: {
    padding: 12,
    backgroundColor: '#0b0c0a',
    marginLeft: 12,
    borderRadius: 24,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default HomeScreen;
