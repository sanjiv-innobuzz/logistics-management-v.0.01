import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, Text, Datepicker } from "@ui-kitten/components";

import { productionScheduleUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
import ConfirmPopUp from "../common/ConfirmPopUp";

const ProductionSchedule = ({
  productionScheduleUpdate,
  route,
  navigation,
  handleHeader,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    productionSchedule: new Date(),
    dispatchSchedule: new Date(),
    pi,
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
    productionScheduleUpdate(shipment, (uploadedData) => {
      console.log("production sechedule update ", uploadedData);
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
      handleHeader("Production Schedule Form", ""); //to set header
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
          <Datepicker
            label="Production Schedule"
            size="large"
            style={styles.input}
            date={shipment.productionSchedule}
            // onSelect={(nextDate) => handleChange("productionSchedule", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                productionSchedule: date,
              }))
            }
          />
          <Datepicker
            label="Dispatch Schedule"
            size="large"
            style={styles.input}
            date={shipment.dispatchSchedule}
            // onSelect={(nextDate) => handleChange("dispatchSchedule", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                dispatchSchedule: date,
              }))
            }
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { productionScheduleUpdate })(ProductionSchedule);
