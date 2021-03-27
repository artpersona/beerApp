import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { useFirebaseContext } from "../context/FirebaseContext";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { database } = useFirebaseContext();
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, []);

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
        console.log("PRODUCTS", result);
      });
  };

  const payload = {
    shops,
    products,
    loading,
  };

  return (
    <ShopContext.Provider value={payload}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
