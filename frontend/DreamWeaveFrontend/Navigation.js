import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import DreamRecordingScreen from './screens/DreamRecordingScreen'; 

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DreamRecording" component={DreamRecordingScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;