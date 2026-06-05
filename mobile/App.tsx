import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EnrollmentScreen} from './src/screens/EnrollmentScreen';
import {FaceVerificationScreen} from './src/screens/FaceVerificationScreen';
import {LivenessVerificationScreen} from './src/screens/LivenessVerificationScreen';
import {SettingsScreen} from './src/screens/SettingsScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import {SuccessScreen} from './src/screens/SuccessScreen';
import {SyncStatusScreen} from './src/screens/SyncStatusScreen';
import {RootStackParamList} from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {backgroundColor: '#12343b'},
          headerTintColor: '#ffffff',
          headerTitleStyle: {fontWeight: '700'},
          contentStyle: {backgroundColor: '#f6f8f7'},
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Enrollment" component={EnrollmentScreen} />
        <Stack.Screen name="Liveness" component={LivenessVerificationScreen} />
        <Stack.Screen name="FaceVerification" component={FaceVerificationScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="SyncStatus" component={SyncStatusScreen} options={{title: 'Offline Sync'}} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
