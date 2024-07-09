
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AppProvider } from "./context/AppContext";
import { PaperProvider } from "react-native-paper";
import { StackNavigator } from "./services/navigation";
import { View } from "react-native";


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Gelasio: require("./assets/fonts/Gelasio/Gelasio-Regular.ttf"),
    "Gelasio-Bold": require("./assets/fonts/Gelasio/Gelasio-Bold.ttf"),
    "Gelasio-Italic": require("./assets/fonts/Gelasio/Gelasio-Italic.ttf"),
    Merriweather: require("./assets/fonts/Merriweather/Merriweather-Regular.ttf"),
    "Merriweather-Bold": require("./assets/fonts/Merriweather/Merriweather-Bold.ttf"),
    "Nunito Sans": require("./assets/fonts/NunitoSans/NunitoSans_7pt_Condensed-Regular.ttf"),
    "Nunito Sans-Bold": require("./assets/fonts/NunitoSans/NunitoSans_7pt_Condensed-Bold.ttf"),
    "Nanum Pen": require("./assets/fonts/NanumPen/NanumPenScript-Regular.ttf"),
    Signika: require("./assets/fonts/Signika/Signika-Regular.ttf"),
    "Signika-Bold": require("./assets/fonts/Signika/Signika-Bold.ttf"),
    "Signika-Light": require("./assets/fonts/Signika/Signika-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <AppProvider>
      <PaperProvider>
        <NavigationContainer theme={MyTheme}>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
    // <Login />
  );
}
