import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './app/context/store';
import CameraScreen from './app/screens/CameraScreen';
import ResultsScreen from './app/screens/ResultsScreen';
import GalleryScreen from './app/screens/GalleryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen}
            options={{ title: 'Analyze Image' }}
          />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen}
            options={{ title: 'Mathematical Analysis' }}
          />
          <Stack.Screen 
            name="Gallery" 
            component={GalleryScreen}
            options={{ title: 'Gallery' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
