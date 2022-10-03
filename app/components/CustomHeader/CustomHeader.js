/* eslint-disable linebreak-style */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import { ConfigContext } from "../../shared/context/ConfigContext";
import { AppContext } from "../../shared/context/AppContext";
import { AuthContext } from "../../shared/context/AuthContext";
import LocationPickerModal from "../../components/LocationPickerModal/LocationPickerModal";
import { RFValue } from "react-native-responsive-fontsize";
import { Storage } from "../../utils";
import styles from "./styles";
import { Colors } from "../../config";
import { Badge } from "react-native-elements";

function CustomHeader({
  showBackButton,
  profilePress,
  storeName,

  setCartOrders,
  setPlaceHolderOrders,
  backPress,
  showTitle,
  showCart,
}) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { saveCustomerOrder, loggedUser } = useContext(AuthContext);
  const { currentLocation } = useContext(ConfigContext);
  const {
    placeholderOrders,
    tempTotalGoods,
    totalGoods,
    setOrders,
    copyQuantityFromOrdersToProducts,
    orders,
  } = useContext(AppContext);

  const navColor = "white";
  const handleBackPress = () => {
    if (placeholderOrders) {
      console.log("pasok 1");
      if (
        tempTotalGoods !== totalGoods ||
        placeholderOrders.length != orders.length
      ) {
        console.log("pasok 2");
        backPress(true);

        let orderList = [...placeholderOrders];
        orderList = orderList.map((item) => {
          item.key = item.item_key;
          return item;
        });
        setOrders(orderList);
        setCartOrders(orderList);
        setPlaceHolderOrders(orderList);
        if (loggedUser) saveCustomerOrder(orderList);
        Storage.save("orders", orderList);
        copyQuantityFromOrdersToProducts();

        setTimeout(function () {
          backPress(false);
          clearTimeout();
          navigation.goBack();
        }, 1500);
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };
  const navigateToOrderSummary = () => {
    navigation.navigate("OrderSummary");
  };
  return (
    <View style={[styles.container, { backgroundColor: Colors.primary }]}>
      <View style={styles.wrapper}>
        <View style={styles.action__wrapper}>
          {showBackButton && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={profilePress ? profilePress : handleBackPress}
            >
              <View style={styles.clickable__area}>
                <Icon3
                  name="chevron-thin-left"
                  size={RFValue(24)}
                  color={navColor}
                />
              </View>
            </TouchableOpacity>
          )}
          {!showBackButton && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{ padding: 5 }}
            >
              <View style={styles.clickable__area}>
                <Icon name="navicon" size={RFValue(26)} color={navColor} />
              </View>
            </TouchableOpacity>
          )}
          {showTitle && <Text style={styles.appName}>{showTitle}</Text>}
        </View>
        {showCart && (
          <TouchableOpacity onPress={navigateToOrderSummary}>
            <MaterialCommunityIcons
              name="cart"
              size={RFValue(24)}
              color="white"
            />
            <Badge
              status="error"
              containerStyle={{ position: "absolute", top: -5, right: -4 }}
              value={orders.length}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.store__name}>{storeName}</Text>
      </View>

      <LocationPickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        headerText={currentLocation == null ? "CATEGORY" : "DELIVER TO"}
        type={"location"}
        postEventFunction={() => setIsModalVisible(false)}
      />
    </View>
  );
}

CustomHeader.defaultProps = {
  showBackButton: false,
  isAboutUs: false,
};
export default CustomHeader;
