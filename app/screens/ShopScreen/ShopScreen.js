import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Theme, Layout, Colors } from "../../config";
import {
  CustomHeader,
  Spinner,
  Advertisements,
  ShopList,
  ProductList,
  SortModal,
} from "../../components";

import styles from "./styles";
import { AppContext } from "../../shared/context/AppContext";
import { AuthContext } from "../../shared/context/AuthContext";
import { ConfigContext } from "../../shared/context/ConfigContext";
import ModalView from "../../components/ModalView/ModalView";
import NetInfo from "@react-native-community/netinfo";
import FeaturedResto from "./FeaturedRestaurant/FeaturedRestaurant";
import { isTablet } from "../../utils/device.utility";
import { FAB } from "react-native-paper";

function ShopScreen({ navigation }) {
  const {
    featuredRestaurants,
    allRestaurants,
    fetchAllRestaurants,
    newsFeed,
    beerCategories,
  } = useContext(AppContext);

  const { currentLocation, currentCityCategory, currentMiniCategory } =
    useContext(ConfigContext);

  const { loggedUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef();

  // For Bottom Ref Sorting

  let y = 0;
  const [modalState, setModalState] = useState({
    logoName: "",
    showModal: false,
    description: "",
  });
  const [noNetModal, setNoNetModal] = useState(false);

  const [viewStyle, setViewStyle] = useState("one");

  //  For Sorting
  const [sortModal, setSortModal] = useState(false);
  const [choices, setChoices] = useState([
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "ascending" },
    { name: "Price: High to Low", value: "descending" },
  ]);
  const [activeChoice, setActiveChoice] = useState(choices[0].value);

  const [sortedTopPicks, setSortedTopPicks] = useState(newsFeed);

  useEffect(() => {
    console.log("activeChoice", activeChoice);
    let tempData = JSON.parse(JSON.stringify(newsFeed));

    if (activeChoice === "none") {
      setSortedTopPicks(newsFeed);
    } else {
      if (activeChoice == "ascending") {
        tempData = tempData?.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      } else {
        tempData = tempData?.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
      }

      setSortedTopPicks(tempData);
    }
  }, [activeChoice, newsFeed]);

  // Internet Connectivity Checking

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setNoNetModal(true);
      } else {
        if (currentLocation != null) fetchAllRestaurants();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentLocation, currentCityCategory, currentMiniCategory, loggedUser]);

  useEffect(() => {
    checkProfile();
  }, [loggedUser]);

  const getNetInfo = () => {
    setNoNetModal(false);

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setNoNetModal(true);
      } else {
        if (currentLocation != null) fetchAllRestaurants();
        setNoNetModal(false);
      }
    });
  };

  const checkProfile = () => {
    if (
      loggedUser &&
      (loggedUser?.phoneNumber == undefined ||
        loggedUser?.location_key == undefined)
    ) {
      setModalState({
        showModal: true,
        title: `Hey ${
          loggedUser && loggedUser.displayName !== null
            ? loggedUser.displayName
            : "there"
        }!`,
        description: `Please complete your personal details for a better experience!`,
      });
    }
  };

  const renderFeaturedRestaurant = ({ item, index }) => {
    return (
      <FeaturedResto
        imageUri={item.imageUri}
        name={item.name}
        onPress={() => {
          navigation.navigate("RestaurantScreen", item);
        }}
      />
    );
  };

  const moveToProfile = () => {
    setModalState({ showModal: false });
    navigation.navigate("Profile");
  };

  const handleScroll = (event) => {
    y = event.nativeEvent.contentOffset.y;
  };

  const DATA = [
    { title: "all", data: [1], name: "Restaurants near you" },
    { title: "featured", data: [0], name: "Shop by Category" },
    { title: "product", data: [2], name: "Top Picks" },
  ];

  const renderItem = ({ section, item }) => {
    if (section.title == "featured") {
      return (
        <>
          {allRestaurants == null ? (
            <Spinner />
          ) : (
            <>
              <View>
                {allRestaurants.length == 0 ? (
                  <Text
                    style={[
                      Theme.center,
                      { marginVertical: 30, color: Colors.darkGray },
                    ]}
                  >
                    No Restaurants Found
                  </Text>
                ) : (
                  <ShopList shops={beerCategories} />
                )}
              </View>
            </>
          )}
        </>
      );
    } else if (section.title == "all") {
      return (
        <>
          {allRestaurants == null ? (
            <Spinner />
          ) : (
            <>
              <View>
                {allRestaurants.length == 0 ? (
                  <Text
                    style={[
                      Theme.center,
                      { marginVertical: 30, color: Colors.darkGray },
                    ]}
                  >
                    No Restaurants Found
                  </Text>
                ) : (
                  <FlatList
                    contentContainerStyle={[
                      styles.categoryScrollView,
                      { paddingHorizontal: 10 },
                    ]}
                    // data={shuffle(featuredRestaurants)}
                    data={featuredRestaurants}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFeaturedRestaurant}
                    legacyImplementation={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={!isTablet}
                    snapToAlignment={"center"}
                    scrollEventThrottle={32}
                  />
                )}
              </View>
            </>
          )}
        </>
      );
    } else if (section.title == "ads") {
      return <Advertisements />;
    } else {
      return (
        <>
          {newsFeed == null ? (
            <Spinner />
          ) : newsFeed.length > 0 ? (
            <View style={{ paddingHorizontal: 10 }}>
              <ProductList feeds={sortedTopPicks} columns={viewStyle} />
            </View>
          ) : (
            <Text
              style={[
                Theme.center,
                { marginVertical: 30, color: Colors.darkGray },
              ]}
            >
              No Featured Products Found
            </Text>
          )}
        </>
      );
    }
  };

  const renderSectionHeader = ({ section: { title, name } }) => {
    if (title != "all" && title != "ads") {
      return (
        <Text
          style={[Theme.listTitle, { marginTop: title == "product" ? 20 : 10 }]}
        >
          {name}
        </Text>
      );
    } else if (title != "ads") {
      return (
        <View style={[Theme.rowSpaceBetween, { marginTop: 20 }]}>
          <Text style={Theme.listTitle}>Specials</Text>
          <View style={styles.viewAll__container}>
            <Text
              style={Theme.listTitleSmall}
              onPress={() => navigation.navigate("RestaurantListScreen", {})}
            >
              View All
            </Text>
          </View>
        </View>
      );
    }
  };

  setTimeout(function () {
    setIsLoading(false);
    clearTimeout();
  }, 500);

  if (isLoading) {
    return (
      <>
        <CustomHeader
          isShopScreen={true}
          primaryColor={true}
          showTitle="Beer App"
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#1080D0" />
        </View>
      </>
    );
  } else {
    return (
      <>
        <ModalView
          visible={modalState.showModal}
          description={modalState.description}
          ok_text="Ok"
          onPress1={() => moveToProfile()}
          width="85%"
          title={modalState.title}
          animation="bounceIn"
          // logoName={modalState.logoName}
          logoColor="#ffdd00"
        />

        <ModalView
          visible={noNetModal}
          description="Can't connect to internet. Please refresh the app or try again later."
          // description="The server encountered an unexpected error. Please refresh the app or try again later."
          ok_text="Refresh"
          onPress1={getNetInfo}
          width="85%"
          title="Opps, something went wrong"
          animation="bounceIn"
          logoName="error"
          logoColor="#ffdd00"
        />

        <CustomHeader
          isShopScreen={true}
          primaryColor={false}
          showTitle="Beer App"
          showCart={true}
        />
        <View style={styles.container} renderToHardwareTextureAndroid={true}>
          <SectionList
            stickyHeaderIndices={[0]}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            sections={DATA}
            ref={scrollRef}
            onScroll={handleScroll}
            // keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <FAB
          style={styles.fab2}
          icon={viewStyle == "two" ? "view-grid-outline" : "view-day-outline"}
          onPress={() => {
            return viewStyle == "two"
              ? setViewStyle("one")
              : setViewStyle("two");
          }}
          color={"white"}
        />

        <FAB
          style={styles.fab}
          icon="sort"
          onPress={() => setSortModal(true)}
          active={false}
        />

        <SortModal
          isVisible={sortModal}
          setIsVisible={setSortModal}
          choices={choices}
          activeChoice={activeChoice}
          setActiveChoice={setActiveChoice}
        />
      </>
    );
  }
}

export default React.memo(ShopScreen);
