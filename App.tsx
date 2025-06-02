import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {StatusBar, StyleSheet} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
