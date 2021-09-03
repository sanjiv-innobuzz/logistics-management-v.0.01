import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  Input,
  useTheme,
  Layout,
  Datepicker,
  Text,
  Divider,
  Button,
} from "@ui-kitten/components";

import { addShipment } from "../api/shipment/shipmentActions";
import design from "./AddShipment/common/design";
import Slider from "../common/components/Slider";
import Footer from "./AddShipment/common/Footer";
import ConfirmPopUp from "./AddShipment/common/ConfirmPopUp";
import ClientField from "./AddShipment/ClientField";
import CountryField from "./AddShipment/CountryField";
import BrokerField from "./AddShipment/BrokerField";
import AgnetField from "./AddShipment/AgentField";
import OrderDetails from "./AddShipment/OrderDetails";

const AddShipment = ({ addShipment, navigation, handleHeader }) => {
  const initialShipment = {
    pi: "",
    date: "",
    client: "",
    agent: "",
    broker: "",
    country: "",
    destinationPort: "",
  };

  const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment);
  const [error, setError] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [orders, setOrders] = React.useState([1]);
  const [order, setOrder] = React.useState([
    {
      brand: "",
      quality: "",
      packingMaterial: "",
      packSize: "",
      quantity: 0,
    },
  ]);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      handleHeader("New Shipment", "");
    });
  }, [navigation]);

  React.useEffect(() => {
    setShipment({ ...shipment, order });
  }, [order]);

  const handleSubmit = (shipment) => {
    if (!loader) {
      setLoader(true);
      addShipment(shipment, (uploadedData) => {
        setLoader(false);
        if (uploadedData) {
          setShipment(initialShipment);
          navigation.navigate("Dashboard");
        } else {
          setError("Server Error");
        }
      });
    }
  };

  const handleChange = (key, value) => {
    setShipment({ ...shipment, [key]: value });
  };

  const handleOrder = (key, value, index) => {
    setOrder([
      ...order.map((singleOrder, i) =>
        i !== index ? singleOrder : { ...singleOrder, [key]: value }
      ),
    ]);
  };

  const handleAddItem = () => {
    setOrder([
      ...order,
      {
        brand: "",
        quality: "",
        packingMaterial: "",
        packSize: "",
        quantity: 0,
      },
    ]);
    setOrders([...orders, 1]);
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
            shipment={shipment}
            error={error}
            loader={loader}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Layout style={[styles.inputHorizontalGroup, styles.input]}>
            <Input
              style={styles.inputHalf}
              size="large"
              value={shipment.pi}
              label="PI Number"
              placeholder="Unique PI Number..."
              onChangeText={(nextValue) => handleChange("pi", nextValue)}
            />
            <Datepicker
              label="Date"
              size="large"
              style={styles.inputHalf}
              date={shipment.date}
              onSelect={(nextDate) => handleChange("date", nextDate)}
            />
          </Layout>

          <Layout
            style={[
              styles.itemBelowAutoCompleteFix,
              styles.inputGroup,
              styles.input,
              styles.agent,
            ]}
          >
            <AgnetField
              styles={styles}
              handleChange={handleChange}
              navigation={navigation}
            />
            <BrokerField
              styles={styles}
              handleChange={handleChange}
              navigation={navigation}
            />
          </Layout>

          <Layout style={[styles.inputGroup, styles.itemBelowAgent]}>
            <Text category="s1">Buyer Details</Text>
            <Divider style={styles.divider} style={styles.section} />
            <ClientField
              navigation={navigation}
              styles={styles}
              handleChange={handleChange}
            />
          </Layout>

          <Layout
            style={[
              styles.itemBelowAutoCompleteFix,
              styles.inputHorizontalGroup,
              styles.input,
            ]}
          >
            <Input
              style={[
                styles.inputHalf,
                styles.autoCompleteFix,
                styles.itemBelowAutoCompleteFix,
              ]}
              size="large"
              value={shipment.destinationPort}
              label="Destination Port"
              placeholder="port name..."
              onChangeText={(nextValue) =>
                handleChange("destinationPort", nextValue)
              }
            />
            <CountryField styles={styles} handleChange={handleChange} />
          </Layout>

          <Layout style={styles.dividerBelowAutoCompleteFix}>
            <Text category="s1">Order Details</Text>
            <Divider style={styles.divider} style={styles.section} />
          </Layout>

          {orders.map((orderS, index) => (
            <OrderDetails
              handleOrder={handleOrder}
              order={order}
              styles={styles}
              key={index}
              index={index}
            />
          ))}

          <Layout style={styles.inputGroup}>
            <Button status="warning" onPress={handleAddItem}>
              Add Item
            </Button>
          </Layout>
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { addShipment })(AddShipment);
