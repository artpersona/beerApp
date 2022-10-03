/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable linebreak-style */
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import TabSectionList from "./components/TabSectionList";
import { Colors } from "../../config";
import { CustomHeader, Empty, ProductItem } from "../../components";
import { AppContext } from "../../shared/context/AppContext";

import {
  groupProducts,
  getProductCategories,
  splitArray,
} from "../../utils/product.utility";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import { FAB } from "react-native-paper";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import ProductFilterModal from "./components/ProductFilterModal/ProductFilterModal";
import { Spinner } from "../../components";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import CachedImage from "react-native-expo-cached-image";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { deviceWidth, isTablet } from "../../utils/device.utility";
import { RFValue } from "react-native-responsive-fontsize";
import Product from "../../components/ProductList/Product";
const RestaurantScreen = ({ route, navigation }) => {
  const [scrollY] = React.useState(new Animated.Value(0));

  const [restaurantProducts, setRestaurantProducts] = useState(null);
  const [restaurantProductsDouble, setRestaurantProductsDouble] =
    useState(null);
  const [searchProducts, setSearchProducts] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterSort, setFilterSort] = useState("product_category_name");

  const [currentStore, setCurrentStore] = useState("");
  const [state, setState] = useState({ open: false });

  const [modalVisible, setModalVisible] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const [image, setImage] = useState(null);

  const testDATA = [
    { uri: "https://insidemanila.ph/images/i/TosNhLb/" },
    {
      uri: "https://cupcommunity.com/wp-content/uploads/2019/03/Bubble-MIlk-Tea-1200x900.jpg",
    },
    {
      uri: "https://res.klook.com/image/upload/fl_lossy.progressive/q_65/c_fill,w_1360/blogen/2018/07/IMG_3110-1.jpg",
    },
    {
      uri: "https://upload.wikimedia.org/wikipedia/commons/7/77/Coupe_D%C3%A4nemark_2.jpg",
    },
  ];

  const [confirmAlert, setConfirmAlert] = useState(false);
  const [viewStyle, setViewStyle] = useState("one");
  const { orders, products, fetchStore, addOrderImage } =
    useContext(AppContext);

  const keyExtract = (item, index) => index;

  const uploadOnPress = () => {
    setModalVisible(false);
    setImage(null);
  };

  const checkIsActiveStore = () => {
    let tempProduct = [];
    if (route.params) {
      products
        .filter((e) => e.store_id === route.params.id && parseInt(e.price, 10))
        .forEach((row) => {
          tempProduct = [...tempProduct, row];
        });
    }

    setSearchProducts(tempProduct);

    let newProducts = [];
    //  Refactor here!
    if (filterCategories.length != 0) {
      const filteredProdCat = tempProduct.map(
        (item) => filterCategories.includes(item.product_category_name) && item
      );

      newProducts = groupProducts(filteredProdCat, filterSort);
    } else {
      newProducts = groupProducts(tempProduct, filterSort);
    }
    const prodCategories = getProductCategories(tempProduct);

    let tempProducts = [...newProducts];
    tempProducts = tempProducts.map((item) => {
      return { ...item, data: splitArray(item.data) };
    });

    setRestaurantProductsDouble(tempProducts);
    setRestaurantProducts(newProducts);
    setProductCategories(prodCategories);
  };

  useEffect(() => {
    fetchStore(route.params.id)
      .then((res) => setCurrentStore(res))
      .catch(() => {});

    checkIsActiveStore();
  }, [products, orders, filterSort, filterCategories]);

  const renderItemDouble = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", wudth: "100%" }}>
        <View style={{ width: "50%" }}>
          <Product key={index} product={item[0]} />
        </View>
        {item.length > 1 && (
          <View style={{ width: "50%" }}>
            <Product key={index} type={"double"} product={item[1]} />
          </View>
        )}
      </View>
    );
  };

  const renderItemSingle = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Product key={index} type={"single"} product={item} />
      </View>
    );
  };

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      setUploadModal(false);
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        setImage(data);
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      setUploadModal(false);
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        setImage(data);
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  const handleAddOrderImage = () => {
    addOrderImage(image, currentStore)
      .then(() => {
        setConfirmAlert(false);
        setImage(null);
        ToastAndroid.show(`Photo Added!`, 3000);
      })
      .catch((e) => Alert.alert("Sorry something went wrong", e.message));
  };

  const closeUploadModal = () => {
    setUploadModal(false);
  };

  const mapNavigate = () => {
    navigation.navigate("Map", route.params);
  };

  const modalVisiblePress = (visibility) => {
    setModalVisible(visibility);
  };

  const animScroll = useRef(new Animated.Value(0)).current;

  const headerTop = animScroll.interpolate({
    inputRange: [0, RFValue(300)],
    outputRange: [RFValue(83), RFValue(-240)],
    extrapolate: "clamp",
  });

  const tabTop = animScroll.interpolate({
    inputRange: [0, RFValue(240)],
    outputRange: [RFValue(360), RFValue(83)],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, zIndex: -10 }}>
      <CustomHeader
        showBackButton
        isShopScreen={true}
        storeName={route.params.name}
        primaryColor={true}
        showCart={true}
      />
      <FAB
        style={styles.fab2}
        icon={viewStyle == "two" ? "view-grid-outline" : "view-day-outline"}
        small
        onPress={() => {
          return viewStyle == "two" ? setViewStyle("one") : setViewStyle("two");
        }}
        color={"white"}
      />
      <Animated.View
        style={{
          translateY: headerTop,
          zIndex: -1,
          height: RFValue(240),
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <View style={{ height: "100%" }}>
          <SwiperFlatList
            autoplay={true}
            autoplayDelay={3}
            autoplayLoop
            paginationStyleItem={{
              height: "100%",
              width: "100%",
              backgroundColor: "blue",
            }}
            paginationDefaultColor="#fff"
            index={0}
            data={
              // currentStore?.store_banners
              //   ? currentStore.store_banners.filter((item) => item?.uri)
              //   :
              testDATA
            }
            removeClippedSubviews={false}
            renderItem={({ item }) => {
              if (item?.uri) {
                return (
                  <View style={{ width: deviceWidth }}>
                    <CachedImage
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      isBackground={true}
                      source={{
                        uri: item.uri,
                      }}
                    >
                      <LinearGradient
                        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
                        style={styles.info__container}
                      >
                        <View style={styles.top__container}>
                          <View style={styles.info_icon__container}>
                            <Icon3
                              name="exclamation"
                              size={RFValue(20)}
                              color="black"
                              style={styles.icon}
                              onPress={mapNavigate}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </CachedImage>
                    {/* <View style={styles.bottom__container}>
                      <View style={styles.logo__container}>
                        <Image
                          source={coverImage}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 50,
                          }}
                        />
                      </View>
                      <View style={styles.text__container}>
                        <Text style={styles.name__text}>
                          {route.params.name}
                        </Text>
                        <Text style={styles.handler__text}>
                          @{route.params.name.split(" ").join("_")}
                        </Text>
                      </View>
                    </View> */}
                  </View>
                );
              }
            }}
          />
          <View style={styles.text__container}>
            <Text style={styles.handler__text}>
              {`${currentStore.name} - (${String(
                currentStore.store_barangay
              ).toUpperCase()}), Davao City`}
            </Text>
          </View>
        </View>
      </Animated.View>

      <TabSectionList
        style={styles.sectionList}
        sections={
          viewStyle == "two"
            ? restaurantProductsDouble || []
            : restaurantProducts || []
        }
        keyExtractor={keyExtract}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={5}
        tabBarStyle={[
          styles.tabBar,
          {
            zIndex: 9999999999999,
            translateY: tabTop,
            backgroundColor: "white",
            elevation: 2,
          },
        ]}
        renderTab={({ title, isActive }) => (
          <View
            style={isActive ? styles.activeTabItem : styles.inactiveTabItem}
          >
            <Text style={[styles.tabText, { color: "black" }]}>{title}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        )}
        renderItem={viewStyle == "two" ? renderItemDouble : renderItemSingle}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animScroll,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        ListEmptyComponent={
          restaurantProducts == null ? (
            <Spinner />
          ) : (
            <Empty message="No product item found." />
          )
        }
        renderAboveItems={() => (
          <View
            style={{
              marginTop: RFValue(280),
              backgroundColor: "white",
              elevation: 2,
              paddingTop: 0,
            }}
          />
        )}
      />

      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => modalVisiblePress(false)}
      >
        <View style={styles.modal__container}>
          <View style={styles.header__container}>
            <Text style={styles.modal__header}>Upload Image</Text>
            <TouchableOpacity onPress={uploadOnPress}>
              <Icon2 name="x" size={24} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>
          <View style={styles.modal__content}>
            <View style={styles.image__container}>
              {/* if conditionals here later */}
              {image == null ? (
                <>
                  <Icon2
                    name="plus"
                    size={40}
                    color={Colors.secondary}
                    onPress={() => {
                      setUploadModal(true);
                    }}
                  />
                  <Text>Click to add</Text>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => setUploadModal(true)}
                    style={{ width: "100%" }}
                  >
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.upload__image}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity
              style={
                image != null
                  ? styles.photoOrder__button
                  : [
                      styles.photoOrder__button,
                      { backgroundColor: Colors.darkGray },
                    ]
              }
              disabled={image == null}
              onPress={() => setConfirmAlert(true)}
            >
              <Text style={styles.photoOrder__text}>Add Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={uploadModal}
        // backdropTransitionOutTiming={0}
        animationInTiming={1}
        animationOutTiming={1}
        backdropOpacity={0.2}
        onBackdropPress={closeUploadModal}
        onBackButtonPress={closeUploadModal}
      >
        <View style={styles.upload__container}>
          <TouchableOpacity
            style={styles.upload__medium}
            onPress={pickFromCamera}
          >
            <Icon
              name="camera"
              size={25}
              color={Colors.lightGray}
              style={styles.upload__icon}
            />
            <Text>Take from camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upload__medium}
            onPress={pickFromGallery}
          >
            <Icon
              name="image"
              size={25}
              color={Colors.lightGray}
              style={styles.upload__icon}
            />
            <Text>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ProductFilterModal
        isVisible={filterModal}
        setIsVisible={setFilterModal}
        categories={productCategories}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        filterSort={filterSort}
        setFilterSort={setFilterSort}
        products={searchProducts}
      />

      <AwesomeAlert
        show={confirmAlert}
        showProgress={false}
        title="Confirm Order"
        message="Selected Images would serve as an order item"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Accept Order"
        confirmButtonColor="#63a34b"
        onCancelPressed={() => {
          setConfirmAlert(false);
        }}
        onConfirmPressed={() => {
          setModalVisible(false);
          handleAddOrderImage();
        }}
      />
    </View>
  );
};

export default React.memo(RestaurantScreen);

RestaurantScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
