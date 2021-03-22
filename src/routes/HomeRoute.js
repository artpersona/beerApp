import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ShopsRoute } from "./ShopsRoute";
import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen";
import BlogScreen from "../screens/BlogScreen";
import Colors from "../shared/styles/Colors";

const Stack = createStackNavigator();

export const HomeRoute = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 50,
            backgroundColor: Colors.background,
          },
          // headerTitleAlign: "center",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
