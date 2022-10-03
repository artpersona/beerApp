/* eslint-disable linebreak-style */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  // eslint-disable-next-line react-native/split-platform-components
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { Schema } from "./schema";

import { Input, Button } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import RadioButton2 from "../../components/RadioButton/RadioButton";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomHeader } from "../../components";
import { Theme, Colors } from "../../config";
import styles from "./styles";
import { AppContext } from "../../shared/context/AppContext";
import { AuthContext } from "../../shared/context/AuthContext";
import { ConfigContext } from "../../shared/context/ConfigContext";
import { PromoContext } from "../../shared/context/PromoContext";
import { CustomInput } from "../../components/Main";
import ModalView, { ModalLoading } from "../../components/ModalView/ModalView";
import OrderItemsModal from "../../components/OrderItemsModal/OrderItemsModal";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Feather";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import { RFValue } from "react-native-responsive-fontsize";
import {
  getOrderStoreIds,
  getStoreName,
  getTotalByStores,
} from "../../utils/product.utility";

import { isTablet } from "../../utils/device.utility";

function CheckOutScreen({ navigation, route }) {
  const { register, setValue, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
    defaultValues: {
      other_phone: "",
      order_notes: "",
      cod_notes: "",
      full_name: "",
      user_email: "",
      phone: "",
      full_address: "",
      address_notes: "",
    },
  });

  const {
    orders,
    totalGoods,
    totalShipping,
    handleCartSummary,
    submitOrder,
    setTotalShipping,
    allRestaurants,
    voucherTotal,
    setVoucherTotal,
    activeVouchers,
    setActiveVouchers,
  } = useContext(AppContext);

  const { applyPromoCode, promoCodes } = useContext(PromoContext);

  const { ordersWithSection } = route.params;
  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const [unavailableReson, setUnavailableReason] = useState("");

  const [store_ids, setStoreIds] = useState([]);
  const [displayRefLocations, setDisplayRefLocations] = useState([]);
  const [refLocations, setRefLocations] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  const ref = useRef(0);

  const { fetchRefLocations } = useContext(ConfigContext);

  const { loggedUser } = useContext(AuthContext);

  const [completeButtonFloating, setCompleteButtonFloating] = useState(false);

  const [modalState, setModalState] = useState({
    message: "",
    logoName: "",
    showModal: false,
  });

  const [deliveryModal, setDeliveryModal] = useState({
    message: "",
    logoName: "",
    showModal: false,
  });

  const [codNotes, setCodNotes] = useState("");
  const [branchKey, setBranchKey] = useState([]);

  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    Schema.map((field) =>
      register({ name: field.name }, { ...field.validations })
    );
  }, [register]);

  useEffect(() => {
    if (loggedUser) {
      setValue([
        { full_name: loggedUser.displayName },
        { user_email: loggedUser.email ? loggedUser.email : "" },
        { phone: loggedUser.phoneNumber },
        { other_phone: loggedUser.otherPhone ? loggedUser.otherPhone : "" },
        { full_address: loggedUser.fullAddress },
        { address_notes: loggedUser.addressNotes },
      ]);
    }
    handleCartSummary();
    const ids = getOrderStoreIds(orders);
    setStoreIds(ids);
    generateRefLocations(ids);
  }, []);

  const generateRefLocations = (store_ids) => {
    let refData = store_ids.map((item) => {
      return { store_id: item, data: fetchRefLocations(item) };
    });

    if (refData.length > 0) {
      setDisplayRefLocations(refData[0].data);
    }

    setRefLocations(refData);
  };

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  const [paymentMethodValue, setPaymentMethodValue] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);

  const saveInfo = (data) => {
    if (!data) return;
    setIsLoading(true);
    setTimeout(function () {
      const newData = {
        ...data,
        cod_notes: codNotes ? codNotes : "",
        payment_method: paymentMethodValue,
      };
      let keyStoreId = store_ids;
      submitOrder(newData, branchKey, keyStoreId, promoCodes).then(() => {
        setIsLoading(false);
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "OrderSuccessScreen" }],
        // });
        navigation.navigate("OrderSuccessScreen");
      });
    }, 10);
  };

  const errorCatch = (data) => {
    console.log("error catch executed!");
  };

  const PaymentMethodNotesComponent = () => {
    switch (paymentMethodValue.toUpperCase()) {
      case "GCASH":
        return (
          <View style={styles.paymentNotes}>
            <Text style={styles.paymentNoteHeader}>GCASH</Text>
            <Text>Gcash #: 09456231547</Text>
          </View>
        );
      case "PAYMAYA":
        return (
          <View style={styles.paymentNotes}>
            <Text style={styles.paymentNoteHeader}>PayMaya</Text>
            <Text>PayMaya #: 09456231547</Text>
          </View>
        );
      case "BANKTRANSFER":
        return (
          <View style={styles.paymentNotes}>
            <Text style={styles.paymentNoteHeader}>Sureplus</Text>
            <Text>Account Name: Sureplus Inc.</Text>
            <Text>Account #: 12345</Text>
          </View>
        );
    }
  };

  const handleRefLocationChange = (item) => {
    let value = 0;
    let branchKeys = [];
    let deliveryFees = [];
    let customerTotal = 0;
    const totalPerStores = getTotalByStores(orders);
    refLocations.map((arr) => {
      let refObj = arr.data.find((data) => data.name === item.label);

      if (refObj) {
        refObj.detail === "Free Delivery"
          ? (value += 0)
          : (value += parseInt(refObj.detail));
        let individualStoreTotal = totalPerStores.find(
          (data) => data.store_id === arr.store_id
        );
        let individualStoreDetails = allRestaurants.find(
          (data) => data.id === arr.store_id
        );

        let freeDelivery =
          parseInt(individualStoreTotal.total) >
          parseInt(individualStoreDetails.free_del_amount);

        freeDelivery
          ? (customerTotal += 0)
          : (customerTotal += parseInt(refObj.detail));

        branchKeys.push({
          store_id: arr.store_id,
          branch_key: refObj.primary_branch,
        });

        deliveryFees.push({
          store_id: arr.store_id,
          delivery_fee: refObj.detail,
          free_delivery: freeDelivery,
        });
      }
    });

    value = parseFloat(value).toFixed(2);
    customerTotal = parseFloat(customerTotal).toFixed(2);

    setTotalShipping({
      data: deliveryFees,
      cummulativeTotal: value,
      customerTotal: customerTotal,
    });
    setBranchKey(branchKeys);
    ToastAndroid.show("Delivery Fee Updated!", 3000);
  };

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={styles.panel__wrapper}>
        <RadioButton2
          selected={unavailableReson}
          setSelected={setUnavailableReason}
          label={"Remove it from my order"}
          value={"Remove it from my order"}
        />
        <RadioButton2
          selected={unavailableReson}
          setSelected={setUnavailableReason}
          label={"Cancel the entire order"}
          value={"Cancel the entire order"}
        />
        <RadioButton2
          selected={unavailableReson}
          setSelected={setUnavailableReason}
          label={"Call me"}
          value={"Call me"}
        />
        <View style={styles.input__container}>
          <TouchableOpacity
            style={styles.confirm__button}
            onPress={() => sheetRef.current.snapTo(0)}
          >
            <Text style={styles.confirm__text}>Apply </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => {
    return (
      <View style={{ overflow: "hidden", marginTop: 5 }}>
        <View style={styles.header}>
          <View style={styles.header__wrapper}>
            <Text style={styles.header__text}>If an item is not available</Text>
            <TouchableOpacity
              onPress={() => sheetRef.current.snapTo(1)}
              style={styles.close__icon}
            >
              <Icon name="close" size={23} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleApplyVoucher = () => {
    const result = applyPromoCode(store_ids, voucherCode, activeVouchers);
    if (result.status == "error") {
      let message = "";
      if (result.category == "expired") message = "Voucher is expired!";
      else if (result.category == "used") message = "Voucher already used";
      else if (result.category == "store_exists")
        message = "Voucher stacking is not allowed";
      else message = "Store voucher cannot be applied in this order";
      setModalState({
        showModal: true,
        logoName: "error",
        message: message,
      });
    } else {
      let tempActiveVouchers = [...activeVouchers];

      const voucherData = {
        key: result.key,
        code: result.code,
        name: result.name,
        store_id: result.store_id,
        store_name: result.store_name,
        value: result.value,
      };
      tempActiveVouchers.push(voucherData);
      setActiveVouchers(tempActiveVouchers);
      const total = voucherTotal + parseInt(result.value);
      setVoucherTotal(total);
      setModalState({
        showModal: true,
        logoName: "success",
        message: "Voucher used!",
      });
    }
  };

  return (
    <>
      {completeButtonFloating && (
        <View
          style={{
            height: isTablet ? 120 : 90,
            backgroundColor: "white",
            width: "100%",
            position: "absolute",
            zIndex: 10,
            bottom: 0,
            borderColor: "whitesmoke",
            borderTopWidth: 1,
          }}
        >
          {totalShipping?.cummulativeTotal !==
            "Sorry, we cannot deliver to this area" && (
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Button
                title="Complete Order"
                buttonStyle={Theme.buttonPrimary}
                containerStyle={styles.confirmOrderContainer}
                titleStyle={[Theme.center, styles.confirmOrder__text]}
                onPress={handleSubmit(saveInfo, errorCatch)}
                loading={isLoading}
                disabled={branchKey == ""}
                // onPress={() => navigation.navigate("OrderSuccessScreen")}
              />
            </View>
          )}
        </View>
      )}

      <ModalLoading visible={isLoading} loading />
      <ModalView
        visible={modalState.showModal}
        description={modalState.message}
        onClose={() => {}}
        onPress1={() => {
          setModalState({ showModal: false });
        }}
        width="65%"
        title={modalState.title}
        animation="bounceIn"
        logoName={modalState.logoName}
        logoColor="#ffdd00"
      />
      <ModalView
        visible={deliveryModal.showModal}
        description={deliveryModal.message}
        onClose={() => {}}
        onPress1={() => {
          setDeliveryModal({ showModal: false });
        }}
        width="65%"
        title={deliveryModal.title}
        animation="bounceIn"
        logoName={deliveryModal.logoName}
        logoColor="#ffdd00"
      />
      <ScrollView
        ref={ref}
        contentContainerStyle={{
          paddingBottom: isTablet ? 120 : 80,
          backgroundColor: "white",
        }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !completeButtonFloating) {
            setCompleteButtonFloating(true);
          }
        }}
      >
        <View style={Theme.screenContainer}>
          <CustomHeader showBackButton showTitle="Checkout" />
          <View style={styles.wrapper}>
            <Text style={[Theme.listTitle, { paddingHorizontal: 0 }]}>
              Delivery Information
            </Text>
            <Text style={styles.header__notes_text}>
              This serves as a MINIMUM ESTIMATE of the total price of your
              order. Should products sold per piece have a higher actual weight,
              the additional weight & corresponding price will reflect on the
              FINAL TOTAL PRICE billed to you by our delivery men. Orders worth
              at least 1,000 Pesos are free of delivery charge.
            </Text>

            <Text
              style={[
                Theme.listTitleSection,
                { paddingHorizontal: 0, marginTop: "5%" },
              ]}
            >
              Personal Information
            </Text>
            <View style={{ marginVertical: 20 }}>
              <CustomInput
                label="* Full Name"
                inputContainerStyle={[Theme.inputBorderedContainer]}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("full_name", input, true);
                }}
                errorMessage={errors.full_name?.message}
                value={watch("full_name")}
              />

              <CustomInput
                label="* Email"
                keyboardType="email-address"
                inputContainerStyle={
                  !loggedUser.email
                    ? [
                        Theme.inputBorderedContainer,
                        { backgroundColor: "#EFEFEF" },
                      ]
                    : Theme.inputBorderedContainer
                }
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("user_email", input, true);
                }}
                errorMessage={errors.user_email?.message}
                value={watch("user_email")}
                disabled={!loggedUser.email}
              />

              <CustomInput
                label="* Phone"
                keyboardType="number-pad"
                maxLength={11}
                inputContainerStyle={Theme.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("phone", input, true);
                }}
                errorMessage={errors.phone?.message}
                value={watch("phone")}
              />
              <CustomInput
                label="Other Phone Number"
                keyboardType="number-pad"
                maxLength={11}
                inputContainerStyle={Theme.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("other_phone", input, true);
                }}
                errorMessage={errors.other_phone?.message}
                value={watch("other_phone")}
              />
            </View>

            <Text style={[Theme.listTitleSection, { paddingHorizontal: 0 }]}>
              Delivery Information
            </Text>
            <View style={{ marginTop: 20 }}>
              <CustomInput
                label="* Full Address"
                inputContainerStyle={Theme.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("full_address", input, true);
                }}
                errorMessage={errors.full_address?.message}
                value={watch("full_address")}
              />

              <CustomInput
                label="* Note / Landmark"
                inputContainerStyle={Theme.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("address_notes", input, true);
                }}
                errorMessage={errors.address_notes?.message}
                value={watch("address_notes")}
              />
              <Text style={styles.refLoc__text}>Reference Location:</Text>
              <DropDownPicker
                items={displayRefLocations.map((item) => {
                  const newArray = {
                    label: item.name,
                    value: item.detail,
                    primary_branch: item.primary_branch,
                  };
                  return newArray;
                })}
                placeholder="Select Location"
                containerStyle={styles.refLoc__container}
                itemStyle={styles.refLoc__dropdown_text}
                globalTextStyle={
                  totalShipping
                    ? styles.refLoc__dropdown_text
                    : [styles.refLoc__dropdown_text, { color: "black" }]
                }
                dropDownStyle={
                  totalShipping
                    ? { backgroundColor: "#1080D0" }
                    : { backgroundColor: "#ffe8db" }
                }
                dropDownContainerStyle={{ backgroundColor: "red" }}
                onChangeItem={handleRefLocationChange}
                style={
                  totalShipping
                    ? { backgroundColor: "#1080D0" }
                    : { backgroundColor: "#ffe8db" }
                }
                arrowColor={totalShipping ? "white" : "black"}
              />
            </View>
            {totalShipping && (
              <View style={Theme.rowSpaceBetween}>
                <Text
                  style={[
                    Theme.listTitle,
                    {
                      paddingHorizontal: 0,
                      fontSize: RFValue(13),
                      marginBottom: "1%",
                    },
                  ]}
                >
                  Delivery Charge
                </Text>
                <Text
                  style={[
                    styles.subTotalValues,
                    { fontWeight: "bold", fontSize: RFValue(13) },
                  ]}
                >
                  Php
                  {isNumber(totalShipping && totalShipping.customerTotal)
                    ? parseFloat(totalShipping.customerTotal).toFixed(2)
                    : 0}
                </Text>
              </View>
            )}

            {totalShipping &&
              totalShipping.data.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={[Theme.rowSpaceBetween, { marginBottom: 5 }]}
                  >
                    <Text style={styles.subTotalValues}>
                      {getStoreName(item.store_id, allRestaurants)}
                    </Text>
                    <Text
                      style={
                        item.free_delivery
                          ? [styles.subTotalValues, { color: "green" }]
                          : styles.subTotalValues
                      }
                    >
                      {item.free_delivery
                        ? "Free Delivery"
                        : isNumber(item.delivery_fee)
                        ? `Php ${parseFloat(item.delivery_fee).toFixed(2)}`
                        : 0}
                    </Text>
                  </View>
                );
              })}
            <Text
              style={[
                Theme.listTitleSection,
                { paddingHorizontal: 0, paddingVertical: "2%" },
              ]}
            >
              Payment Method
            </Text>

            <View>
              <RadioButton.Group
                onValueChange={(newValue) => {
                  setPaymentMethodValue(newValue);
                }}
                value={paymentMethodValue}
              >
                <View style={[Theme.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="GCASH" />
                  <Text style={styles.payment__method_text}>GCASH</Text>
                </View>
                <View style={[Theme.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="Paymaya" />
                  <Text style={styles.payment__method_text}>Paymaya</Text>
                </View>

                <View style={[Theme.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="BankTransfer" />
                  <Text style={styles.payment__method_text}>Bank Transfer</Text>
                </View>

                <View style={[Theme.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="COD" />
                  <Text style={styles.payment__method_text}>
                    Cash on Delivery
                  </Text>
                </View>
              </RadioButton.Group>
            </View>

            {paymentMethodValue != "COD" && (
              <PaymentMethodNotesComponent setCodNotes={setCodNotes} />
            )}

            <View
              style={[
                Theme.rowSpaceBetween,
                { paddingTop: 35, paddingBottom: 5 },
              ]}
            >
              <Text style={[Theme.listTitle, { paddingHorizontal: 0 }]}>
                Subtotal
              </Text>
              <Text style={[Theme.listTitle, { paddingHorizontal: 0 }]}>
                Php {parseFloat(totalGoods).toFixed(2)}
              </Text>
            </View>

            <View style={Theme.rowSpaceBetween}>
              <Text style={[Theme.listTitle, { paddingHorizontal: 0 }]}>
                Delivery Charge
              </Text>
              <Text style={[styles.subTotalValues, { fontWeight: "bold" }]}>
                Php{" "}
                {isNumber(totalShipping && totalShipping.customerTotal)
                  ? parseFloat(totalShipping.customerTotal).toFixed(2)
                  : 0}
              </Text>
            </View>

            <View style={[Theme.rowSpaceBetween, { paddingTop: 5 }]}>
              <Text style={[Theme.listTitle, { paddingHorizontal: 0 }]}>
                Discount
              </Text>
              <Text style={[styles.subTotalValues, { fontWeight: "bold" }]}>
                Php 0
              </Text>
            </View>

            {activeVouchers &&
              activeVouchers.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={[Theme.rowSpaceBetween, { marginBottom: 5 }]}
                  >
                    <Text style={styles.subTotalValues}>{item.store_name}</Text>
                    <Text style={[styles.subTotalValues, { color: "green" }]}>
                      Php {item.value}
                    </Text>
                  </View>
                );
              })}

            <View style={Theme.rowSpaceBetween}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={[styles.totalText, { color: "green" }]}>
                Php{" "}
                {(
                  parseFloat(
                    parseInt(totalGoods) +
                      parseInt(
                        totalShipping && totalShipping.customerTotal
                          ? totalShipping.customerTotal
                          : 0
                      )
                  ) - voucherTotal
                ).toFixed(2)}
              </Text>
            </View>

            <KeyboardAvoidingView>
              <View style={[Theme.row, { paddingTop: 35 }]}>
                <View style={{ width: "60%" }}>
                  <Input
                    labelStyle={Theme.labelStyle}
                    inputContainerStyle={[
                      styles.inputContainer,
                      styles.voucher__component,
                    ]}
                    inputStyle={Theme.inputStyle}
                    containerStyle={{ paddingHorizontal: 0 }}
                    placeholder="Enter voucher"
                    onChangeText={(input) => {
                      setVoucherCode(input);
                    }}
                    value={voucherCode}
                  />
                </View>
                <View style={{ width: "40%" }}>
                  <Button
                    title="Apply"
                    buttonStyle={[
                      styles.buttonContainer,
                      { backgroundColor: Colors.primary },
                    ]}
                    // containerStyle={[styles.voucher__component]}
                    onPress={handleApplyVoucher}
                    titleStyle={styles.voucher__title}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            <View>
              <CustomInput
                label="Order Notes"
                inputContainerStyle={[
                  Theme.inputBorderedContainer,
                  { height: 100 },
                ]}
                multiline={true}
                // containerStyle={{marginHorizontal: 10}}
                numberOfLines={3}
                onChangeText={(input) => {
                  setValue("order_notes", input, true);
                }}
                errorMessage={errors.order_notes?.message}
                value={watch("order_notes")}
              />
            </View>

            <View style={styles.unavailable__container}>
              <Text style={styles.unavailable__header}>
                If an item is not available
              </Text>
              <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
                <View style={styles.options__container}>
                  <Text style={styles.options__text}>
                    Remove it from my order
                  </Text>
                  <Icon3
                    name="chevron-down"
                    size={RFValue(29)}
                    color={"#1080D0"}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <Button
              title="View Order Items"
              buttonStyle={Theme.buttonModal}
              containerStyle={styles.orderModalButtonContainer}
              titleStyle={[Theme.center, styles.confirmOrder__text]}
              onPress={() => setOrderModal(true)}
            />
          </View>
        </View>
        {!completeButtonFloating && (
          <View
            style={{
              height: isTablet ? 120 : 90,
              backgroundColor: "white",
              width: "100%",
              position: "absolute",
              zIndex: 10,
              bottom: 0,
              borderColor: "whitesmoke",
              borderTopWidth: 1,
            }}
          >
            {totalShipping?.cummulativeTotal !==
              "Sorry, we cannot deliver to this area" && (
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Button
                  title="Complete Order"
                  buttonStyle={
                    branchKey == "" ? Theme.buttonDisabled : Theme.buttonPrimary
                  }
                  containerStyle={styles.confirmOrderContainer}
                  titleStyle={[Theme.center, styles.confirmOrder__text]}
                  onPress={handleSubmit(saveInfo, errorCatch)}
                  loading={isLoading}
                  disabled={branchKey == ""}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <OrderItemsModal
        isVisible={orderModal}
        setIsVisible={setOrderModal}
        ordersWithSection={ordersWithSection}
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={["45%", 0]}
        initialSnap={1}
        borderRadius={30}
        enabledContentGestureInteraction={true}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
      />
    </>
  );
}

export default React.memo(CheckOutScreen);
