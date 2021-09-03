import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, Text } from "@ui-kitten/components";

import { scheduleUpdate } from "../../../api/shipment/shipmentActions";
import { getCurrentUser } from "../../../api/user/userActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
import ConfirmPopUp from "../common/ConfirmPopUp";
// import { upload } from "../../../common/util/fileUtil";

import ScheduleForm from "./2_Schedule/Schedule";

const Schedule = ({
  scheduleUpdate,
  route,
  navigation,
  handleHeader,
  getCurrentUser,
}) => {
  const { pi } = route.params;
  const initialShipment = () => ({
    pi,
    quality: "",
    dateScheduled: new Date(),
    packingMatrial: "",
    packsize: "",
    brand: "",
    quantity: "",
    destinationPort: "",
    scheduleUpdate: "",
  });

  const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState({});

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  const handleSubmit = (shipment) => {
    setLoader(true);

    shipment.pi = pi;
    console.log("ship", shipment);
    scheduleUpdate(shipment, (uploadedData) => {
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment);
        setProgress({});

        navigation.navigate("Shipment", { pi });
      } else {
        setError("Server Error");
      }
    });
  };

  const handleChange = (updateShipment) => {
    setShipment(updateShipment);
  };

  React.useEffect(() => {
    getCurrentUser({}, (currentUser) => {
      setShipment({
        scheduleUpdate: currentUser && currentUser.user.email,
      });
    });
  }, []);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      handleHeader("Delivery Schedule Form", "");
    });
  }, []);

  return (
    <>
      <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
      />

      <Card
        disabled={true}
        style={styles.container}
        footer={() => (
          <Footer
            styles={styles}
            setWarning={setWarning}
            handleSubmit={handleSubmit}
            shipment={shipment}
            error={error}
            loader={loader}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <ScheduleForm
            styles={styles}
            handleChange={handleChange}
            shipment={shipment}
            theme={theme}
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { scheduleUpdate, getCurrentUser })(Schedule);
