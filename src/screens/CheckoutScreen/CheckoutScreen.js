import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { Schema } from "./schema";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import Icon3 from "react-native-vector-icons/Feather";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
import { Input, Button } from "react-native-elements";
import Colors from "./Colors";
const displayRefLocations = [
  { name: "Elenita", detail: 10 },
  { name: "Test", detail: 10 },
  { name: "Sto. Nino", detail: 10 },
];

function CheckoutScreen({ navigation }) {
  const ref = useRef(0);

  const [completeButtonFloating, setCompleteButtonFloating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethodValue, setPaymentMethodValue] = useState("COD");

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

  useEffect(() => {
    Schema.map((field) =>
      register({ name: field.name }, { ...field.validations })
    );
  }, [register]);

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

  return (
    <>
      {completeButtonFloating && (
        <View
          style={{
            height: 90,
            backgroundColor: "white",
            width: "100%",
            position: "absolute",
            zIndex: 10,
            bottom: 0,
            borderColor: "whitesmoke",
            borderTopWidth: 1,
          }}
        >
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Button
              title="Complete Order"
              buttonStyle={styles.buttonPrimary}
              containerStyle={styles.confirmOrderContainer}
              titleStyle={[styles.center, styles.confirmOrder__text]}
              onPress={() => navigation.navigate("Order Success")}
              loading={isLoading}
            />
          </View>
        </View>
      )}

      {/* <ModalLoading visible={isLoading} loading /> */}

      <ScrollView
        ref={ref}
        contentContainerStyle={{
          paddingBottom: 80,
          backgroundColor: "white",
        }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !completeButtonFloating) {
            setCompleteButtonFloating(true);
          }
        }}
      >
        <View style={styles.screenContainer}>
          {/* <CustomHeader showBackButton /> */}
          {/* <Text style={styles.page__header}>Checkout</Text> */}
          <View style={styles.wrapper}>
            <Text style={[styles.listTitle, { paddingHorizontal: 0 }]}>
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
                styles.listTitleSection,
                { paddingHorizontal: 0, marginTop: "5%" },
              ]}
            >
              Personal Information
            </Text>
            <View style={{ marginVertical: 20 }}>
              <CustomInput
                label="* Full Name"
                inputContainerStyle={[styles.inputBorderedContainer]}
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
                inputContainerStyle={styles.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("user_email", input, true);
                }}
                value={watch("user_email")}
              />

              <CustomInput
                label="* Phone"
                keyboardType="number-pad"
                maxLength={11}
                inputContainerStyle={styles.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("phone", input, true);
                }}
                value={watch("phone")}
              />
              <CustomInput
                label="Other Phone Number"
                keyboardType="number-pad"
                maxLength={11}
                inputContainerStyle={styles.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("other_phone", input, true);
                }}
                value={watch("other_phone")}
              />
            </View>

            <Text style={[styles.listTitleSection, { paddingHorizontal: 0 }]}>
              Delivery Information
            </Text>
            <View style={{ marginTop: 20 }}>
              <CustomInput
                label="* Full Address"
                inputContainerStyle={styles.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("full_address", input, true);
                }}
                value={watch("full_address")}
              />

              <CustomInput
                label="* Note / Landmark"
                inputContainerStyle={styles.inputBorderedContainer}
                labelStyle={{ color: Colors.primary }}
                onChangeText={(input) => {
                  setValue("address_notes", input, true);
                }}
                value={watch("address_notes")}
              />
              <Text style={styles.refLoc__text}>Reference Location:</Text>
              <DropDownPicker
                items={displayRefLocations.map((item) => {
                  const newArray = {
                    label: item.name,
                    value: item.detail,
                  };
                  return newArray;
                })}
                placeholder="Select Location"
                containerStyle={styles.refLoc__container}
                itemStyle={styles.refLoc__dropdown_text}
                globalTextStyle={[
                  styles.refLoc__dropdown_text,
                  { color: "black" },
                ]}
                dropDownStyle={{ backgroundColor: "#ffe8db" }}
                dropDownContainerStyle={{ backgroundColor: "red" }}
                // onChangeItem={handleRefLocationChange}
                style={{ backgroundColor: "#ffe8db" }}
                arrowColor={"black"}
              />
            </View>

            <View style={styles.rowSpaceBetween}>
              <Text
                style={[
                  styles.listTitle,
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
                Php 150
              </Text>
            </View>

            {/* {totalShipping &&
              totalShipping.data.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={[styles.rowSpaceBetween, { marginBottom: 5 }]}
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
              })} */}
            <Text
              style={[
                styles.listTitleSection,
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
                <View style={[styles.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="GCASH" />
                  <Text style={styles.payment__method_text}>GCASH</Text>
                </View>
                <View style={[styles.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="Paymaya" />
                  <Text style={styles.payment__method_text}>Paymaya</Text>
                </View>

                <View style={[styles.row, { alignContent: "flex-start" }]}>
                  <RadioButton value="BankTransfer" />
                  <Text style={styles.payment__method_text}>Bank Transfer</Text>
                </View>

                <View style={[styles.row, { alignContent: "flex-start" }]}>
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
                styles.rowSpaceBetween,
                { paddingTop: 35, paddingBottom: 5 },
              ]}
            >
              <Text style={[styles.listTitle, { paddingHorizontal: 0 }]}>
                Subtotal
              </Text>
              <Text style={[styles.listTitle, { paddingHorizontal: 0 }]}>
                Php 150
              </Text>
            </View>

            <View style={styles.rowSpaceBetween}>
              <Text style={[styles.listTitle, { paddingHorizontal: 0 }]}>
                Delivery Charge
              </Text>
              <Text style={[styles.subTotalValues, { fontWeight: "bold" }]}>
                Php 0
              </Text>
            </View>

            <View style={[styles.rowSpaceBetween, { paddingTop: 5 }]}>
              <Text style={[styles.listTitle, { paddingHorizontal: 0 }]}>
                Discount
              </Text>
              <Text style={[styles.subTotalValues, { fontWeight: "bold" }]}>
                Php 0
              </Text>
            </View>

            {/* {activeVouchers &&
              activeVouchers.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={[styles.rowSpaceBetween, { marginBottom: 5 }]}
                  >
                    <Text style={styles.subTotalValues}>{item.store_name}</Text>
                    <Text style={[styles.subTotalValues, { color: "green" }]}>
                      Php {item.value}
                    </Text>
                  </View>
                );
              })} */}

            {/* <View style={styles.rowSpaceBetween}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={[styles.totalText, { color: "green" }]}>
                Php{" "}
                {(
                  parseFloat(parseInt(totalGoods) + parseInt(0)) - voucherTotal
                ).toFixed(2)}
              </Text>
            </View> */}

            <KeyboardAvoidingView>
              <View style={[styles.row, { paddingTop: 35 }]}>
                <View style={{ width: "60%" }}>
                  <Input
                    labelStyle={styles.labelStyle}
                    inputContainerStyle={[
                      styles.inputContainer,
                      styles.voucher__component,
                    ]}
                    inputStyle={styles.inputStyle}
                    containerStyle={{ paddingHorizontal: 0 }}
                    placeholder="Enter voucher"
                    // onChangeText={(input) => {
                    //   setVoucherCode(input);
                    // }}
                    // value={voucherCode}
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
                    // onPress={handleApplyVoucher}
                    titleStyle={styles.voucher__title}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            <View>
              <CustomInput
                label="Order Notes"
                inputContainerStyle={[
                  styles.inputBorderedContainer,
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
              <TouchableOpacity>
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
              buttonStyle={styles.buttonModal}
              containerStyle={styles.orderModalButtonContainer}
              titleStyle={[styles.center, styles.confirmOrder__text]}
              // onPress={handleSubmit(saveInfo)}
              //   onPress={() => setOrderModal(true)}
            />
          </View>
        </View>
        {!completeButtonFloating && (
          <View
            style={{
              height: 90,
              backgroundColor: "white",
              width: "100%",
              position: "absolute",
              zIndex: 10,
              bottom: 0,
              borderColor: "whitesmoke",
              borderTopWidth: 1,
            }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Button
                title="Complete Order"
                buttonStyle={styles.buttonPrimary}
                containerStyle={styles.confirmOrderContainer}
                titleStyle={[styles.center, styles.confirmOrder__text]}
                onPress={() => navigation.navigate("Order Success")}
                loading={isLoading}
                // disabled={branchKey == ""}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {/* <OrderItemsModal
        isVisible={orderModal}
        setIsVisible={setOrderModal}
        ordersWithSection={ordersWithSection}
      /> */}
    </>
  );
}

export default CheckoutScreen;
