import React from "react";
import { View, ScrollView } from "react-native";
import {
  Card,
  Button,
  Text,
  useTheme,
  Spinner,
  Icon,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import Slider from "../common/components/Slider";
import Timeline from "../common/components/Timeline";
import design from "./Shipment/design";
import Client from "./Shipment/Client";
import ShipmentCard from "./Shipment/ShipmentCard";
import timelineData from "./Shipment/timelineData";
import { getShipmentDetails } from "../api/shipment/shipmentActions";
import MiddelMenDetails from "./Shipment/MiddelMenDetails";
// import formStep from "../config/formStep.json";
// import Loader from "../common/Loader";

const Shipment = ({
  route,
  navigation,
  getShipmentDetails,
  handleHeader,
  shipmentList,
}) => {
  const theme = useTheme();
  const styles = design(theme);
  const { pi, role } = route.params;
  const [loader, setLoader] = React.useState(true);
  const [fetch, setFetch] = React.useState(true);
  const [shipment, setShipment] = React.useState(route.params);
  const [stageAction, setStageAction] = React.useState(
    "PackagingMatrialStatus"
  );
  const [buttonVisibility, setButtonVisibility] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Shipment", pi);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    // if (loader && fetch) {
    getShipmentDetails({ pi }, () => {
      // setLoader(false);
      // setFetch(false);
    });
    // } else {
    const shipmentObj = shipmentList.find((shipment) => shipment.pi === pi);
    // console.log("ship--", shipmentObj);
    setShipment(shipmentObj);
    // }
  }, [shipmentList]);

  const buttonText = (stage) => {
    switch (stage) {
      case 0:
        if (stageAction !== "PackagingMatrialStatus")
          setStageAction("PackagingMatrialStatus");

        return role == "Admin"
          ? "Packaging Matrial Status"
          : setButtonVisibility(false);

      case 1:
        if (stageAction !== "Schedule") {
          setStageAction("Schedule");
        }

        return "Schedule";
      case 2:
        if (stageAction !== "ProductionSchedule")
          setStageAction("ProductionSchedule");
        return role == "Admin"
          ? "Production Schedule"
          : setButtonVisibility(false);

      case 3:
        if (stageAction !== "DocumentStatus") setStageAction("DocumentStatus");
        return role == "Admin"
          ? "Add Document Status"
          : setButtonVisibility(false);

      case 4:
        if (stageAction !== "ShipmentSchedule")
          setStageAction("ShipmentSchedule");
        return role == "Admin"
          ? "Shipment Schedule Update"
          : setButtonVisibility(false);

      case 5:
        if (stageAction !== "DocumentDispatchStatus")
          setStageAction("DocumentDispatchStatus");
        return role == "Admin"
          ? "Add Document Dispatch Status"
          : setButtonVisibility(false);

      case 6:
        return setButtonVisibility(false);

      default:
        return "Add";
    }
  };

  const addStage = () => {
    navigation.navigate("ShipmentNav", {
      screen: stageAction,
      params: { pi },
    });
  };

  return (
    // loader ? (
    //   <Spinner />
    // ) :
    shipment ? (
      <Card disabled={true} style={styles.container}>
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView style={styles.scrollView}>
          <Client
            navigation={navigation}
            styles={styles}
            shipmentData={shipment}
          />
          <MiddelMenDetails
            navigation={navigation}
            styles={styles}
            shipmentData={shipment}
          />

          <ShipmentCard
            styles={styles}
            shipmentData={shipment}
            navigation={navigation}
          />

          <Text category="h5">History</Text>

          <View style={styles.timelineContainer}>
            <Timeline
              data={timelineData(shipment, styles, theme, navigation)}
              contentContainerStyle={styles.contentContainerStyle}
              timeContainerStyle={styles.timeContainerStyle}
              iconContainerStyle={styles.iconContainerStyle}
              touchable={true}
            />
          </View>

          {buttonVisibility ? (
            <Button
              status="basic"
              style={styles.addBtn}
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  style={styles.addBtnIcon}
                  name="plus-circle-outline"
                  fill={theme["color-basic-800"]}
                />
              )}
              onPress={addStage}
            >
              {buttonText(shipment.stage)}
            </Button>
          ) : null}

          {/* <View style={{ flex: 1, marginBottom: 90 }}>
          {stage && stage === 12 ? (
            <></>
          ) : (
            <Button
              status="info"
              onPress={() => {
                console.log(
                  formStep[(Object.keys(shipmentDatas).length + 1).toString()]
                );
                navigation.navigate("ShipmentNav", {
                  screen:
                    formStep[
                      (Object.keys(shipmentDatas).length + 1).toString()
                    ],
                  params: { pi: pi },
                });
              }}
            >
              {formStep[stage]}
            </Button>
          )}
        </View> */}
        </ScrollView>
      </Card>
    ) : (
      <Spinner />
    )
  );
};

const mapStateToProps = ({ shipmentApi }) => {
  return {
    shipmentList: shipmentApi,
  };
};

export default connect(mapStateToProps, { getShipmentDetails })(Shipment);
