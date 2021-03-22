import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopScreen from "../screens/ShopScreen";
import ProductScreen from "../screens/ProductScreen";

const Stack = createStackNavigator();

export const ShopsRoute = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // header: () => null,
        }
      }
      initialRouteName="HomeShop"
    >
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="HomeShop"
        component={ShopScreen}
      />
      <Stack.Screen
        options={{
          // header: () => null,
          headerTitle: () => null,
        }}
        name="Product"
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};
