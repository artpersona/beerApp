import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useOrderContext } from "../../context/OrderContext";
import OrderItems from "../../components/OrderItem/OrderItems";

import styles from "./styles";

function MyOrdersScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { orders } = useOrderContext();
  const renderLatestOrder = ({ item }) => {
    return <OrderItems order={item} />;
  };

  return (
    <>
      {/* <View style={Theme.screenContainer}> */}
      {/* <CustomHeader showBackButton /> */}
      {/* {isLoading ? (
          <Spinner />
        ) : ( */}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { paddingHorizontal: 0, marginVertical: "5%" },
          ]}
        >
          My Orders
        </Text>

        <View style={styles.latestContainer}>
          <FlatList
            data={orders}
            listKey={(item) => item.tracking_code.toString()}
            // keyExtractor={keyExtract}
            renderItem={renderLatestOrder}
            // ListEmptyComponent={<Empty message="No Latest Order found." />}
          />
        </View>
      </View>
      {/* )} */}
      {/* </View> */}
    </>
  );
}

export default React.memo(MyOrdersScreen);
