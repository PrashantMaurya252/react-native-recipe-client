import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Recipe} from '../context/RecipeContext';

interface CreateRecipeFormProps {
  onSubmit: (
    recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
  onCancel: () => void;
}

const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    'Easy',
  );

  const handleCreateRecipe = async () => {
    if (title && description) {
      onSubmit({title, description, difficulty});
    } else {
      Alert.alert('Invalid input', 'Please fill all the fields');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Recipe</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Recipe Title"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        placeholder="Recipe Description"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Difficulty</Text>
        <Picker
          selectedValue={difficulty}
          onValueChange={itemValue =>
            setDifficulty(itemValue as 'Easy' | 'Medium' | 'Hard')
          }
          style={styles.picker}>
          <Picker.Item label="Easy" value={'Easy'} />
          <Picker.Item label="Medium" value={'Medium'} />
          <Picker.Item label="Hard" value={'Hard'} />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText} onPress={onCancel}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText} onPress={handleCreateRecipe}>
            Create Recipe
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#007aff',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateRecipeForm;
