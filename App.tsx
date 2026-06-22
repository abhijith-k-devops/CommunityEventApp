
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ThemeProvider from './src/core/contexts/ThemeContext';
import AppNavigation from './src/core/navigation/AppNavigation';
import React from 'react';
import { EventContextProvider } from './src/presentation/viewmodels/contexts/EventsContext';
import { RSVPContextProvider } from './src/presentation/viewmodels/contexts/RSVPContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <SafeAreaProvider style={styles.root}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.root}>
          <AppContent />
        </View>
      </SafeAreaProvider>
  );
}

function AppContent() {

  return (
    <ThemeProvider>
      <View style={styles.root}>
        <NavigationContainer>
          <EventContextProvider>
            <RSVPContextProvider>
              <AppNavigation />
            </RSVPContextProvider>
          </EventContextProvider>
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
