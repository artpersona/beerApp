import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import BlogScreen from "../screens/BlogScreen";
import OrderSummaryScreen from "../screens/OrderSummaryScreen/OrderSummaryScreen";
import Colors from "../shared/styles/Colors";
import CheckoutScreen from "../screens/CheckoutScreen/CheckoutScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen/OrderSuccessScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen/MyOrdersScreen";
import CustomDrawerContent from "../components/CustomDrawer/CustomDrawerContent";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const HomeRoute = ({}) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        options={{
          unmountInactiveRoutes: true,
        }}
        drawerPosition={"left"}
        openByDefault={false}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ animationEnabled: true, headerShown: false }}
        initialRouteName="Main"
      >
        <Drawer.Screen
          name="Main"
          options={{
            drawerLabel: "Main",
          }}
        >
          {(page) => <HomeStack {...page} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="My Orders"
          component={MyOrdersScreen}
          options={{
            drawerLabel: "My Orders",
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={OrderSuccessScreen}
          options={{
            drawerLabel: "Profile",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
          backgroundColor: Colors.background,
        },
        headerTitleAlign: "center",
        headerTintColor: Colors.white,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.name })}
        name="Shop"
        component={ShopScreen}
      />
      <Stack.Screen
        options={{
          // header: () => null,
          headerTitle: () => null,
        }}
        name="Blog"
        component={BlogScreen}
      />

      <Stack.Screen name="Order Summary" component={OrderSummaryScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Order Success" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};
