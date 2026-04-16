import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import HomeScreen from './src/screens/HomeScreen';
import InferiorScreen from './src/screens/InferiorScreen';
import SuperiorScreen from './src/screens/SuperiorScreen';
import EjerciciosScreen from './src/screens/EjerciciosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import RutinaScreen from './src/screens/RutinaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inferior" component={InferiorScreen} />
        <Stack.Screen name="Superior" component={SuperiorScreen} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Rutina" component={RutinaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
