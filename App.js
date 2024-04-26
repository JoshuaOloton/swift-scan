import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import UserProfile from './screens/UserProfile';
import ScanProduct from './screens/ScanProduct';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }

}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Gelasio': require('./assets/fonts/Gelasio/Gelasio-Regular.ttf'),
    'Gelasio-Bold': require('./assets/fonts/Gelasio/Gelasio-Bold.ttf'),
    'Merriweather': require('./assets/fonts/Merriweather/Merriweather-Regular.ttf'),
    'Merriweather-Bold': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf'),
    'Nunito Sans': require('./assets/fonts/NunitoSans/NunitoSans_7pt_Condensed-Regular.ttf'),
    'Nunito Sans-Bold': require('./assets/fonts/NunitoSans/NunitoSans_7pt_Condensed-Bold.ttf'),
    'Nanum Pen': require('./assets/fonts/NanumPen/NanumPenScript-Regular.ttf')
  })

  if (!fontsLoaded) {
    return <View />
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='ScanProduct' component={ScanProduct} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Login />
  );
}
