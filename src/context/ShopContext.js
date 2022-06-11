import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { formatNewsfeed } from "../shared/utilities";
import { useFirebaseContext } from "../context/FirebaseContext";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { database } = useFirebaseContext();
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   getFeeds();
  // }, [shops, products]);

  const fetchShops = () => {
    database.ref("categories").on("value", (snapshot) => {
      let result = [];
      if (snapshot && snapshot.val()) {
        result = collectIdsAndDocs(snapshot.val());
      }
      setShops(result);
      setLoading(false);
    });
  };

  const fetchProducts = () => {
    database
      .ref("products")
      .orderByChild("newsfeed")
      .equalTo("on")
      .on("value", (snapshot) => {
        let result = [];
        if (snapshot && snapshot.val()) {
          result = collectIdsAndDocs(snapshot.val());
        }
        setProducts(result);
        setLoading(false);
      });
  };

  const getAllFeeds = () => {
    // var feedsFromShops = [];
    // shops.forEach((shop) => {
    //   var newsfeed = shop.newsfeed;
    //   if (newsfeed !== undefined) {
    //     var feedOne = formatNewsfeed(newsfeed, shop.key);
    //     feedsFromShops = feedsFromShops.concat(feedOne);
    //   }
    // });

    // feedsFromShops = feedsFromShops.filter(
    //   (item) => item.newsfeed_status === "Enabled"
    // );

    // var finalFeeds = feedsFromShops
    //   .concat(products)
    //   .sort(
    //     (x, y) => new Date(y.newsfeed_update) - new Date(x.newsfeed_update)
    //   );

    // setFeeds(finalFeeds);
    // console.log("FINAL FEEDS", finalFeeds);
    return products;
  };

  const getStoreFeeds = (id) => {
    var finalFeeds = products
      .sort((x, y) => new Date(y.newsfeed_update) - new Date(x.newsfeed_update))
      .filter((item) => item.store_id === id);

    return finalFeeds;
  };

  const getShopInfo = (id) => {
    if (id) {
      var shop = shops.find((shop) => shop.id === id);
      if (shop) return { name: shop.name, file: shop.file };
    }
  };

  const payload = {
    shops,
    feeds,
    products,
    loading,
    getShopInfo,
    getAllFeeds,
    getStoreFeeds,
  };

  return (
    <ShopContext.Provider value={payload}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
