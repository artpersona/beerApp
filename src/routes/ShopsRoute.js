import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Updates from "../screens/ShopScreen/Updates";
import Products from "../screens/ShopScreen/Products";
import Colors from "../shared/styles/Colors";

const Tab = createMaterialTopTabNavigator();

export const ShopsRoute = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.primary,
        activeBackgroundColor: "orange",
        style: {
          backgroundColor: Colors.background,
        },
        indicatorStyle: {
          backgroundColor: Colors.primary,
        },
        labelStyle: {
          fontSize: 14,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Updates"
        options={{ tabBarLabel: "All Updates" }}
        component={Updates}
      />
      <Tab.Screen name="Products" component={Products} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};
