import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme } from "@ui-kitten/components";

import { register } from "../api/user/userActions";
import design from "./AddClient/design";
import Slider from "../common/components/Slider";
import Footer from "./AddClient/Footer";
import ConfirmPopUp from "./AddClient/ConfirmPopUp";
import ClientForm from "./AddClient/ClientForm";

const AddClient = ({ register, navigation }) => {
  const [warning, setWarning] = React.useState(false);
  const [client, setClient] = React.useState({
    name: "",
    email: "",
    ext: "",
    phone: "",
    role: "",
    company: "",
    password: "",
  });

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  const handleSubmit = (client) => {
    register(client, true);
    navigation.navigate("AddShipment");
  };

  const handleChange = (updateClient) => {
    setClient(updateClient);
  };

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
            client={client}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />
        <ScrollView>
          <ClientForm
            styles={styles}
            handleChange={handleChange}
            client={client}
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { register })(AddClient);
