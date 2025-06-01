

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import {
  
  StyleSheet,
 
} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';



function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
