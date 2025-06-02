import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {StatusBar, StyleSheet} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <RootNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
