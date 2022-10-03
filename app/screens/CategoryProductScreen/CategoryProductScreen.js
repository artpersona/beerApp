import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { CustomHeader, SortModal } from "../../components";
import { AppContext } from "../../shared/context/AppContext";
import { FAB } from "react-native-paper";
import styles from "./styles";
import Product from "../../components/ProductList/Product";
import { splitArray } from "../../utils/product.utility";
function CategoryProductScreen({ route }) {
  const { category } = route.params;
  const { products } = useContext(AppContext);
  const [productSingle, setProductSingle] = useState([]);
  const [productDouble, setProductDouble] = useState([]);
  const [viewStyle, setViewStyle] = useState("one");

  //  For Sorting
  const [sortModal, setSortModal] = useState(false);
  const [choices, setChoices] = useState([
    { name: "Alphabetically", value: "alphabetically" },
    { name: "Price: Low to High", value: "ascending" },
    { name: "Price: High to Low", value: "descending" },
  ]);
  const [activeChoice, setActiveChoice] = useState(choices[0].value);

  const [sortedTopPicks, setSortedTopPicks] = useState(products);

  useEffect(() => {
    let tempData = JSON.parse(JSON.stringify(products));

    if (activeChoice === "alphabetically") {
      setSortedTopPicks(products);
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
  }, [activeChoice, products]);

  useEffect(() => {
    if (category) {
      let tempProducts = JSON.parse(JSON.stringify(sortedTopPicks));
      tempProducts = tempProducts.filter(
        (product) => product.main_category_name === category.name
      );

      let splittedArray = splitArray(tempProducts);
      setProductDouble(splittedArray);
      setProductSingle(tempProducts);
    }
  }, [sortedTopPicks]);

  const renderItemSingle = ({ item }) => {
    return <Product key={item.key} product={item} type="single" />;
  };

  const renderItemDouble = ({ item, index }) => {
    return (
      <View
        style={{ flexDirection: "row", width: "100%" }}
        key={`${item[0].key} - ${item[1].key}`}
      >
        <View style={{ width: "50%" }}>
          <Product key={item[0].key} product={item[0]} />
        </View>
        {item.length > 1 && (
          <View style={{ width: "50%" }}>
            <Product key={item[1].key} type={"double"} product={item[1]} />
          </View>
        )}
      </View>
    );
  };
  return (
    <>
      <CustomHeader
        showBackButton={true}
        showTitle={`Category: ${category.name}`}
        showCart={true}
      />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <FlatList
            data={viewStyle == "one" ? productSingle : productDouble}
            initialNumToRender={7}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => {
              return item.key;
            }}
            renderItem={
              viewStyle == "one"
                ? renderItemSingle || []
                : renderItemDouble || []
            }
          />
        </View>
      </View>

      <FAB
        style={styles.fab2}
        icon={viewStyle == "two" ? "view-grid-outline" : "view-day-outline"}
        onPress={() => {
          return viewStyle == "two" ? setViewStyle("one") : setViewStyle("two");
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

export default CategoryProductScreen;
