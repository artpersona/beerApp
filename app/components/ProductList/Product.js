/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/sort-styles */
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../config";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceHeight } from "../../utils/device.utility";
import ProductModal from "../ProductModal/ProductModal";
import { AppContext } from "../../shared/context/AppContext";
import { Image } from "react-native-expo-image-cache";
import { productPreview } from "../../utils/utils/preview.util";
import {
  getCurrentPrice,
  fetchActiveOptions,
} from "../../utils/product.utility";
export default function Product({ product, type }) {
  const { orders, setOrders, getShopInfo } = useContext(AppContext);
  const [currentPrice, setCurrentPrice] = useState(0);
  const preview = {
    uri: product?.preview ? product.preview : productPreview,
  };
  const uri = product?.file;

  const [visible, setVisible] = useState(false);
  var shopInfo = getShopInfo(product.store_id);

  const handleAddToCart = () => {
    setVisible(true);
  };

  const addToCart = () => {
    let tempProduct = { ...product };
    let tempOrders = [...orders];
    tempProduct.quantity = 1;
    tempOrders.push(tempProduct);
    setOrders(tempOrders);
  };

  useEffect(() => {
    if (product) {
      let tempOptionsActive = fetchActiveOptions(product);

      let currPrice = getCurrentPrice(product);
      if (tempOptionsActive.length > 0) {
        currPrice += parseInt(tempOptionsActive[0]?.amount);
      }

      setCurrentPrice(currPrice);
    }
  }, [product]);

  if (type == "single") {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.card}>
          <View style={styles.card__header}>
            <View style={styles.card__headerLeft}>
              <Image style={styles.card__avatar} {...{ preview, uri }} />

              <View>
                <Text style={styles.card__store}>{shopInfo?.name}</Text>
                <Text style={styles.card__handle}>
                  @{shopInfo?.name.split(" ").join("_")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.card__body}>
            {product.file && (
              <View style={styles.card__imageContainer}>
                <Image style={styles.card__image} {...{ preview, uri }} />
              </View>
            )}

            <Text style={styles.card__name}>{product.name}</Text>

            <Text style={styles.card__caption}>
              {product.description.replace(/(<([^>]+)>)/gi, "")}
            </Text>

            <Text style={styles.card__price}>
              <Text style={styles.card__label}>Price:</Text>
              {parseInt(currentPrice).toFixed(2)}
            </Text>

            <Text style={styles.card__price}>
              {/* <Text style={styles.card__label}>Stock:</Text> {product.stock} */}
            </Text>

            <TouchableOpacity onPress={handleAddToCart}>
              <View style={styles.card__button}>
                <Text style={styles.card__buttonText}>Add to Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ProductModal
            product={product}
            isVisible={visible}
            setIsVisible={setVisible}
            onPress={addToCart}
          />
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={[styles.container, { width: "95%", alignSelf: "center" }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.card, { height: deviceHeight / 1.95 }]}>
          <View style={[styles.card__header, { alignSelf: "center" }]}>
            <View
              style={[
                styles.card__headerLeft,
                { flexDirection: "column", alignItems: "center" },
              ]}
            >
              <Image
                style={[styles.card__avatar, { marginBottom: "5%" }]}
                {...{ preview, uri }}
              />

              <View>
                <Text style={[styles.card__store, { textAlign: "center" }]}>
                  {shopInfo?.name}
                </Text>
                <Text style={[styles.card__handle, { textAlign: "center" }]}>
                  @{shopInfo?.name.split(" ").join("_")}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card__body, { paddingVertical: 0 }]}>
            {product.file && (
              <View
                style={[
                  styles.card__imageContainer,
                  {
                    height: deviceHeight / 8,
                    width: deviceHeight / 8,
                    marginVertical: "6%",
                  },
                ]}
              >
                <Image
                  style={[styles.card__image, { marginBottom: "5%" }]}
                  {...{ preview, uri }}
                  resizeMode="contain"
                />
              </View>
            )}

            <Text style={[styles.card__name, { fontSize: RFValue(14) }]}>
              {product.name}
            </Text>

            <Text
              style={[styles.card__caption, { fontSize: RFValue(11) }]}
              numberOfLines={3}
            >
              {product.description.replace(/(<([^>]+)>)/gi, "")}
            </Text>
          </View>
          <View style={styles.bottom__container}>
            <Text style={[styles.card__price, { textAlign: "center" }]}>
              <Text style={styles.card__label}>Price:</Text>
              {parseInt(product.price).toFixed(2)}
            </Text>

            <Text style={styles.card__price}>
              {/* <Text style={styles.card__label}>Stock:</Text> {product.stock} */}
            </Text>

            <TouchableOpacity onPress={handleAddToCart}>
              <View style={styles.card__button}>
                <Text style={styles.card__buttonText}>Add to Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ProductModal
          product={product}
          isVisible={visible}
          setIsVisible={setVisible}
          onPress={addToCart}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 7,
    padding: 1,
    borderRadius: 5,
  },

  card: {
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    height: "100%",
  },
  card__store: {
    color: Colors.black,
    fontSize: 14,
  },
  card__handle: {
    textTransform: "lowercase",
    color: Colors.primary,
    fontSize: 10,
  },
  card__name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.black,
    // color: Colors.primary,
  },
  card__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  card__avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    margin: 5,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  // card__restaurant: {
  //   width: 25,
  //   height: 25,
  //   borderRadius: "50%",
  // },
  card__headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  card__body: {},
  card__caption: {
    fontSize: 15,
    paddingVertical: 10,
    // color: Colors.primary,
    textAlign: "center",
    color: Colors.black,
  },
  card__price: {
    fontSize: 15,
    // paddingVertical: 5,
    // color: Colors.primary,
    textAlign: "justify",
    color: Colors.black,
  },
  card__label: {
    fontWeight: "700",
  },
  card__imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
    height: deviceHeight / 3,
    width: deviceHeight / 3,
    alignSelf: "center",
  },
  card__image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  card__button: {
    backgroundColor: "purple",
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 10,
  },
  card__buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },

  bottom__container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignSelf: "center",
  },
});
