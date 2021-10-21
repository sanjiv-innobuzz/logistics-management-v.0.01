// import React from "react";
// import { connect } from "react-redux";
// import { View } from "react-native";
// import { Text, Button } from "@ui-kitten/components";
// import { getCurrentUser } from "../../../api/user/userActions";

// const UpdateSchedule = ({
//   navigation,
//   handleHeader,
//   shipmentList,
//   route,
//   getCurrentUser,
// }) => {
//   const { pi } = route.params;
//   const [shipment, setShipment] = React.useState([]);
//   const [progress, setProgress] = React.useState(false);
//   console.log("pi n-----", pi);

//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       handleHeader("Delivery Scheduling", "");
//     });
//     return unsubscribe;
//   }, []);

//   React.useEffect(() => {
//     setProgress(true);
//     getCurrentUser({}, (currentUser) => {
//       const filteredShipment =
//         shipmentList &&
//         shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
//       if (filteredShipment.length > 0) {
//         console.log("filtered data ", filteredShipment);

//         setShipment(filteredShipment[0]);
//         setProgress(false);
//       } else {
//         setProgress(false);
//       }
//     });
//     return () => setShipment([]);
//   }, [pi]);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text
//         category="c2"
//         style={{
//           color: "white",
//           textTransform: "uppercase",
//           marginBottom: 10,
//           fontSize: 17,
//         }}
//       >
//         schaduling pi : {pi} orders
//       </Text>
//       <Button
//         onPress={() =>
//           navigation.navigate("ShipmentNav", {
//             screen: "SelectableSchedule",
//             params: { shipmentData: shipment },
//           })
//         }
//         style={{
//           backgroundColor: "red",
//         }}
//       >
//         Add Schedule
//       </Button>
//     </View>
//   );
// };

// const mapStateToProps = ({ shipmentApi, userApi }) => {
//   return {
//     shipmentList: shipmentApi,
//     userList: userApi,
//   };
// };
// export default connect(mapStateToProps, { getCurrentUser })(UpdateSchedule);

import React, { useState } from "react";
import { connect } from "react-redux";
import { View, FlatList, TouchableHighlight } from "react-native";
import { Text, useTheme, CheckBox, Button } from "@ui-kitten/components";
import { getCurrentUser } from "../../../api/user/userActions";

const UpdateSchedule = ({
  navigation,
  handleHeader,
  route,
  getCurrentUser,
  shipmentList = [],
}) => {
  const { pi } = route.params;
  const theme = useTheme();
  const [checked, setChecked] = useState({});
  const [order, setOrder] = useState([]);
  const [progress, setProgress] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setOrder(route && route.params.shipmentData.order);
      handleHeader("Select Order to Scheduled", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setOrder([]);
      navigation.navigate("Shipment", {
        pi: route && route.params?.shipmentData?.pi,
      });
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setProgress(true);
    getCurrentUser({}, (currentUser) => {
      const filteredShipment =
        shipmentList &&
        shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
      if (filteredShipment.length > 0) {
        // console.log("filtered data ", filteredShipment);

        setOrder(filteredShipment[0].order);
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
    return () => setOrder([]);
  }, [pi, shipmentList]);

  const handleScheduling = (order) => {
    navigation.navigate("ShipmentNav", {
      screen: "ScheduleForm",
      params: { order: order, pi: pi },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme["color-basic-300"] }}>
      {progress ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading</Text>
        </View>
      ) : (
        <FlatList
          data={order}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handleScheduling(item)}
              disabled={item?.isScheduled}
            >
              <>
                {/* {item?.isScheduled ? (
                <View
                  style={{
                    flex: 1,
                    maxWidth: 200,
                    borderRadius: 5,
                    maxHeight: 25,
                    backgroundColor: "red",
                    marginBottom: -15,
                    padding: 5,
                    marginLeft: 10,
                    zIndex: 777,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "white" }}>
                    Already scheduled
                  </Text>
                </View>
              ) : (
                <></>
              )} */}
                <View
                  style={{
                    flexDirection: "row",
                    //   flex: 1,
                    height: "auto",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    marginHorizontal: 5,
                    backgroundColor: item?.isScheduled
                      ? theme["color-success-transparent-500"]
                      : theme["color-danger-transparent-500"],
                    borderRadius: 5,
                  }}
                >
                  <>
                    <View style={{ flex: 3 }}>
                      {/* <Text category="c2">{"PI : #" + item._id}</Text> */}
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        PI
                      </Text>
                      <Text style={{ fontSize: 14 }}>{pi}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Brand
                      </Text>
                      <Text style={{ fontSize: 14 }}>{item.brand}</Text>
                      {/* <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                  Quality
                </Text>
                <Text category="label">{" " + item.quality}</Text>
              </View> */}
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Size
                      </Text>
                      <Text style={{ fontSize: 13 }}>{item.packSize}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Material
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {item.packingMaterial}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Quality
                      </Text>
                      <Text style={{ fontSize: 13 }}>{item.quality}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Quntity
                      </Text>
                      <Text style={{ fontSize: 14 }}>{item.quantity}</Text>
                    </View>
                    <View>
                      <Text>{item?.isScheduled.toString()}</Text>
                      {/* {console.log("select --== ", item)} */}
                      {/* <CheckBox
                    checked={item?.isScheduled}
                    onChange={(nextChecked) => handleSelcet(item._id)}
                  ></CheckBox> */}
                    </View>
                  </>
                </View>
              </>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};
export default connect(mapStateToProps, { getCurrentUser })(UpdateSchedule);
