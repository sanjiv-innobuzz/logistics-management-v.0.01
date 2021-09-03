import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  useTheme,
  Datepicker,
  Input,
  Divider,
} from "@ui-kitten/components";

import { shipmentScheduleUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
import ConfirmPopUp from "../common/ConfirmPopUp";

const ShipmentSchedule = ({
  shipmentScheduleUpdate,
  route,
  navigation,
  handleHeader,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    pi,
    estDeparture: new Date(),
    estArrival: new Date(),
    billLandingNo: "",
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
    shipmentScheduleUpdate(shipment, (uploadedData) => {
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
    navigation.addListener("focus", () => {
      handleHeader("Shipment Schedule Form", ""); //to set header
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
            progress={progress}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Datepicker
            label="Estimated Time of Departure"
            size="large"
            style={styles.input}
            date={shipment.estDeparture}
            // onSelect={(nextDate) => handleChange("estDeparture", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                estDeparture: date,
              }))
            }
          />
          <Datepicker
            label="Estimated Time of Arrival"
            size="large"
            style={styles.input}
            date={shipment.estArrival}
            // onSelect={(nextDate) => handleChange("estArrival", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                estArrival: date,
              }))
            }
          />
          <Divider style={styles.divider} />
          <Input
            style={styles.input}
            label="Bill of Lading No:"
            size="medium"
            placeholder="Please mention Packing Material"
            size="large"
            multiline={true}
            onChangeText={(bill) =>
              setShipment((previosData) => ({
                ...previosData,
                billLandingNo: bill,
              }))
            }
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { shipmentScheduleUpdate })(ShipmentSchedule);
