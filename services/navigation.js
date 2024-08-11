import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CartScreen from "../screens/Customer/CartScreen";
import Home from "../screens/Customer/Home";
import AdminLogin from "../screens/Admin/AdminLogin";
import AdminTest from "../screens/Admin/AdminTest";
import AdminRegister from "../screens/Admin/AdminRegister";
import AdminPaymentReceipt from "../screens/Admin/AdminPaymentReceipt";
import AdminScan from "../screens/Admin/AdminScan";
import ScanSuccess from "../screens/Admin/ScanSuccess";
import RegisterProduct from "../screens/Admin/RegisterProduct";
import ScanReceipt from "../screens/Admin/ScanReceipt";
import Inventory from "../screens/Admin/Inventory";
import Login from "../screens/Customer/Login";
import AdminProfile from "../screens/Admin/AdminProfile";
import Checkout from "../screens/Customer/Checkout";
import UserProfile from "../screens/Customer/UserProfile";
import ScanProduct from "../screens/Customer/ScanProduct";
import ViewProduct from "../screens/Customer/ViewProduct";
import PaymentReceipt from "../screens/Customer/PaymentReceipt";
import PaymentQRSuccess from "../screens/Customer/PaymentQRSuccess";
import Signup from "../screens/Customer/Signup";
import Welcome from "../screens/Welcome";
import Orders from "../screens/Customer/Orders";
import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

import { useApp } from "../context/AppContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator()
const Tab = createMaterialBottomTabNavigator();

// Home Nav is the navigation between supermarkets gallery and scan product
const HomeNav = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <HomeNav.Screen name="Home" component={Home} />
      <HomeNav.Screen name="ScanProduct" component={ScanProduct} />
      <HomeNav.Screen name="ViewProduct" component={ViewProduct} />
      <HomeNav.Screen name="Checkout" component={Checkout} />
      <HomeNav.Screen name="PaymentQRSuccess" component={PaymentQRSuccess} />      
      <HomeNav.Screen name="PaymentReceipt" component={PaymentReceipt} />      

    </HomeNav.Navigator>
  );
};

const AdminNav = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminNav.Navigator
      initialRouteName="AdminScan"
      screenOptions={{ headerShown: false }}
    >
      <AdminNav.Screen name="AdminTest" component={AdminTest} />
      <AdminNav.Screen name="AdminScan" component={AdminScan} />
      <AdminNav.Screen name="RegisterProduct" component={RegisterProduct} />
      <AdminNav.Screen name="ScanSuccess" component={ScanSuccess} />
    </AdminNav.Navigator>
  );
};

const StackNavigator = () => {
  const { currentUser, userRole } = useApp();
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      {currentUser ? (
        userRole === "customer" ? (
          <Stack.Screen name="CustomerHome" component={TabNavigator} />
        ) : (
          <Stack.Screen name="AdminHome" component={AdminTabNavigator} />
        )
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />

          {/* Admin Screens */}
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminRegister" component={AdminRegister} />
        </>
      )}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { cart } = useApp();

  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(cart.map((item) => item.quantity).reduce((a, b) => a + b, 0));
  }, [cart]);

  return (
    <Tab.Navigator
      initialRouteName="Stores"
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      activeColor="#e91e63"
      inactiveColor="#69424f"
      shifting={true}
    >
      <Tab.Screen
        name="Stores"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Supermarkets",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: "My Orders",
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCart"
        component={CartScreen}
        options={{
          tabBarLabel: "My Cart",
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <Feather name="shopping-cart" size={24} color={color} />
              <View 
                style={{
                    height: 18,
                    width: 18,
                    borderRadius: 18 / 2,
                    backgroundColor: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ translateX: -10 }, { translateY: -5 }],
                    textAlign: "center",
                  }}>
                <Text style={{ color: "#fff", fontSize: 10 }}>
                  {cartItems}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="user" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ScanReceiptNav = createNativeStackNavigator();

const ScanReceiptNavigator = () => {
  return (
    <ScanReceiptNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <ScanReceiptNav.Screen name="ScanReceipt" component={ScanReceipt} />
      <ScanReceiptNav.Screen name="AdminPaymentReceipt" component={AdminPaymentReceipt} />

    </ScanReceiptNav.Navigator>
  );
};

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      activeColor="#e91e63"
      inactiveColor="#69424f"
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={AdminNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanReceiptNavigator"
        component={ScanReceiptNavigator}
        options={{
          tabBarLabel: "Scan Receipt",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="receipt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inventory" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { StackNavigator };

const styles = StyleSheet.create({
  badge: {
    fontSize: 10,
    color: "#fff",
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: "#f00",
    zIndex: 1,
    transform: [{ translateX: -10 }],
    borderWidth: 1,
  },
});
