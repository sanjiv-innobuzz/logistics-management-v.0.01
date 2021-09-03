import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme } from "@ui-kitten/components";

import { documentStatusUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
import ConfirmPopUp from "../common/ConfirmPopUp";
import DocumentStatusForm from "./4_DocumentStatus/DocumentStatusForm";

const DocumentStatus = ({
  documentStatusUpdate,
  route,
  navigation,
  handleHeader,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    underApproval: false,
    documentApproved: false,
    documentIssued: false,
    pi,
  });

  const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState(false);

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
    documentStatusUpdate(shipment, (uploadedData) => {
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
      handleHeader("Document Status Form", "");
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
            progress={progress}
            loader={loader}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView
          contentContainerStyle={styles.iDocumentStatusFormerContainer}
        >
          <DocumentStatusForm
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

export default connect(null, { documentStatusUpdate })(DocumentStatus);
