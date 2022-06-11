import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFirebaseContext } from "./FirebaseContext";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { database } = useFirebaseContext();

  useEffect(() => {
    fetchOrders();
    fetchAllStores();
  }, []);

  const fetchOrders = () => {
    database.ref("orders").on("value", (snapshot) => {
      const ordersObject = (snapshot && snapshot.val()) || {};

      let ordersArray =
        (ordersObject &&
          Object.entries(ordersObject) &&
          Object.entries(ordersObject).length &&
          Object.entries(ordersObject).map((item) => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      setOrders(ordersArray);
    });
  };

  const fetchAllStores = () => {
    database.ref("categories").on("value", (snapshot) => {
      const storesObject = (snapshot && snapshot.val()) || {};

      let storesArray =
        (storesObject &&
          Object.entries(storesObject) &&
          Object.entries(storesObject).length &&
          Object.entries(storesObject).map((item) => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      setAllRestaurants(storesArray);
    });
  };

  const payload = { orders, setOrders, allRestaurants };

  return (
    <OrderContext.Provider value={payload}>{children}</OrderContext.Provider>
  );
};

OrderProvider.defaultProps = {};

OrderProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useOrderContext = () => useContext(OrderContext);
