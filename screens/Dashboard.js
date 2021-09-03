import { useTheme, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { connect } from "react-redux";
import { FlatList, StyleSheet, Image, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ShipmentEntry from "./Dashboard/ShipmentEntry";
import Chart from "./Dashboard/Chart";
import {
  getShipments,
  getMoreShipments,
} from "../api/shipment/shipmentActions";
import { getUsers } from "../api/user/userActions";

const Dashboard = ({
  shipmentList,
  getShipments,
  navigation,
  handleHeader,
  getUsers,
  clients,
}) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const [loader, setLoader] = React.useState(false);
  const [lowerColor, setLowerColor] = React.useState(
    theme["color-basic-transparent-100"]
  );

  const styles = StyleSheet.create({
    inactiveContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: Dimensions.get("window").height,
    },
    image: {
      width: "100%",
      height: 350,
    },
    gradient: {
      flex: 1,
      marginBottom: 70,
    },
    inactiveText: {
      color: theme["color-basic-400"],
      textAlign: "center",
      fontSize: 15,
      marginHorizontal: 50,
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const lowerColorToggle = () => {
    if (lowerColor !== theme["color-basic-100"])
      setLowerColor(theme["color-basic-100"]);
  };

  React.useEffect(() => {
    console.log("run ship");
    getShipments({ page }, () => {
      //TODO: need to implement pagination
      getUsers({ user: "" }, () => {
        setLoader(false);
        setPage(page + 1);
      });
    });
    setLoader(true);
  }, []);

  React.useEffect(() => {
    //to change header text
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Dashboard", "");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      colors={[theme["color-primary-500"], lowerColor]}
      locations={[0, 0.6]}
      style={styles.gradient}
    >
      {!loader ? (
        shipmentList.length < 1 ? (
          <View style={styles.inactiveContainer}>
            <Image
              source={require("../assets/dashboard_bg.png")}
              style={styles.image}
            />
            <Text style={styles.inactiveText}>
              No shipments found. Please add a shipment by clicking the + button
              below.
            </Text>
          </View>
        ) : (
          (() => {
            lowerColorToggle();
            return (
              <FlatList
                data={shipmentList}
                renderItem={({ item, index }) => {
                  if (index === 0) {
                    return (
                      <>
                        <Chart theme={theme} />
                        <ShipmentEntry
                          shipment={item}
                          navigation={navigation}
                          clientData={
                            clients &&
                            clients.find(
                              (client) => item.client === client.email
                            )
                          }
                        />
                      </>
                    );
                  }
                  return (
                    <ShipmentEntry
                      shipment={item}
                      navigation={navigation}
                      clientData={
                        clients &&
                        clients.find((client) => item.client === client.email)
                      }
                    />
                  );
                }}
                keyExtractor={(item) => item.pi}
                // onEndReachedThreshold={0.01}
                // onEndReached={() => loadMoreShipment()}
                // ListFooterComponent={
                //   loader && <Spinner size="small" status="primary" />
                // }
              />
            );
          })()
        )
      ) : (
        <View style={styles.loader}>
          <Spinner size="giant" status="basic" />
        </View>
      )}
    </LinearGradient>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    clients: userApi.clients,
  };
};

export default connect(mapStateToProps, {
  getShipments,
  getMoreShipments,
  getUsers,
})(Dashboard);
