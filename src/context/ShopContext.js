import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { useFirebaseContext } from "../context/FirebaseContext";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { database } = useFirebaseContext();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = () => {
    console.log("fetching..");

    database.ref("categories").on("value", (snapshot) => {
      let result = [];
      if (snapshot && snapshot.val()) {
        result = collectIdsAndDocs(snapshot.val());
      }
      setShops(result);
      setLoading(false);
      console.log(result);
    });
  };

  const payload = {
    shops,
    loading,
  };

  return (
    <ShopContext.Provider value={payload}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
