import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, CheckBox, Divider, Text } from "@ui-kitten/components";

import { packagingMatrialStatus } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
import ConfirmPopUp from "../common/ConfirmPopUp";

const PackagingMatrialStatus = ({
  packagingMatrialStatus,
  route,
  navigation,
  handleHeader,
}) => {
  const { pi } = route.params;
  const initialShipment = () => ({
    artWorkUnderApproval: false,
    artWorkApproved: false,
    underPrinting: false,
    packagingMatrialReceived: false,
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
    navigation.navigate("Shipment", { pi });
  };

  const handleSubmit = (shipment) => {
    setLoader(true);
    shipment.pi = pi;
    packagingMatrialStatus(shipment, (uploadedData) => {
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
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("PACKAGING MATERIAL STATUS", ""); //to set header
    });
    return unsubscribe;
  }, [navigation]);

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
          <Text category="s1" style={styles.input}>
            Buyer Details
          </Text>
          <Divider style={styles.divider} />
          <CheckBox
            style={styles.input}
            checked={shipment.artWorkUnderApproval}
            onChange={(artWorkUnderApproval) =>
              handleChange({ ...shipment, artWorkUnderApproval })
            }
          >
            {`ART WORK UNDER APPROVAL`}
          </CheckBox>
          <CheckBox
            style={styles.input}
            checked={shipment.artWorkApproved}
            onChange={(artWorkApproved) =>
              handleChange({ ...shipment, artWorkApproved })
            }
          >
            {`ART WORK APPROVED`}
          </CheckBox>
          <Divider style={styles.divider} />
          <CheckBox
            style={styles.input}
            checked={shipment.underPrinting}
            onChange={(underPrinting) =>
              handleChange({ ...shipment, underPrinting })
            }
          >
            {`UNDER PRINTING`}
          </CheckBox>
          <CheckBox
            style={styles.input}
            checked={shipment.packagingMatrialReceived}
            onChange={(packagingMatrialReceived) =>
              handleChange({ ...shipment, packagingMatrialReceived })
            }
          >
            {`PACKAGING MATERIAL RECEIVED`}
          </CheckBox>
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { packagingMatrialStatus })(
  PackagingMatrialStatus
);
