/* eslint-disable linebreak-style */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CustomDrawerContent from "../../components/CustomDrawer/CustomDrawerContent";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantListScreen from "../RestaurantListScreen/RestaurantListScreen";
import RestaurantScreen from "../RestaurantScreen/RestaurantScreen";
import SearchResultScreen from "../SearchResultScreen/SearchResultScreen";
import MapScreen from "../MapScreen/MapScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import MyOrdersScreen from "../MyOrdersScreen/MyOrdersScreen";
import ShopScreen from "../ShopScreen/ShopScreen";
import OrderSummaryScreen from "../OrderSummaryScreen/OrderSummaryScreen";
import ConfirmOrderScreen from "../ConfirmOrderScreen/ConfirmOrderScreen";
import CheckOutScreen from "../CheckOutScreen/CheckOutScreen";
import AboutUsScreen from "../AboutUsScreen/AboutUsScreen";
import SuccessOrderCard from "../CheckOutScreen/SuccessOrderCard";
import LoginScreen from "../Auth/LoginScreens/LoginScreen";
import ProductResult from "../RestaurantScreen/components/ProductFilterModal/ResultScreen/ResultScreen";
import CategoryFilterScreen from "../CategoryFilterScreen/CategoryFilterScreen";
import { AuthContext } from "../../shared/context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CategoryProductScreen from "../CategoryProductScreen/CategoryProductScreen";

import { Colors } from "../../config";
import { AppContext } from "../../shared/context/AppContext";

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Shop"
      screenOptions={{ animationEnabled: true, headerShown: false }}
    >
      <HomeStack.Screen name="Shop">
        {(page) => <ShopScreen {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RestaurantListScreen">
        {(page) => <RestaurantListScreen {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RestaurantScreen">
        {(page) => <RestaurantScreen {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Results">
        {(page) => <SearchResultScreen {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Map" component={MapScreen} />
      <HomeStack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <HomeStack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
      <HomeStack.Screen name="CheckOut" component={CheckOutScreen} />
      <HomeStack.Screen name="LogIn" component={LoginScreen} />
      <HomeStack.Screen name="ProductResult" component={ProductResult} />
      <HomeStack.Screen
        name="CategoryFilterScreen"
        component={CategoryFilterScreen}
      />

      <HomeStack.Screen
        name="OrderSuccessScreen"
        component={SuccessOrderCard}
      />
      <HomeStack.Screen
        name="CategoryProductScreen"
        component={CategoryProductScreen}
      />
    </HomeStack.Navigator>
  );
};

function HomeScreen() {
  return (
    <Drawer.Navigator
      options={{
        unmountInactiveRoutes: true,
      }}
      drawerPosition={"left"}
      openByDefault={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ animationEnabled: true, headerShown: false }}
      initialRouteName="Shop"
    >
      <Drawer.Screen
        name="Shop"
        options={{
          drawerLabel: "Shop",
        }}
      >
        {(page) => <HomeStackScreen {...page} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{
          drawerLabel: "My Orders",
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          drawerLabel: "About Us",
        }}
      />
    </Drawer.Navigator>
  );
}

const TabbedHomeScreen = () => {
  const { loggedUser } = useContext(AuthContext);
  const { orders } = useContext(AppContext);

  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }} labeled={false}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              color={Colors.lightGray}
              size={26}
            />
          ),
        }}
      />
      {loggedUser && (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome5
                name="user-alt"
                color={Colors.lightGray}
                size={20}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Cart"
        component={OrderSummaryScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cart"
              color={Colors.lightGray}
              size={26}
            />
          ),
          tabBarBadge: orders.length > 0 ? `${orders.length}` : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
