import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CreateRecipeForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Recipe</Text>
      <TextInput style={styles.input} placeholder="Recipe Title" />
      <TextInput style={styles.input} placeholder="Recipe Description" />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Difficulty</Text>
        <Picker>
          <Picker.Item label="Easy" value={'Easy'} />
          <Picker.Item label="Medium" value={'Medium'} />
          <Picker.Item label="Hard" value={'Hard'} />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>Create Recipe</Text>
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
  label: {},
  pickerContainer: {},
  buttonContainer: {},
  button: {},
  cancelButton: {},
  submitButton: {},
  buttonText: {},
});

export default CreateRecipeForm;
