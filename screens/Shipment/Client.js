import React from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Avatar, Text, Button, Icon } from "@ui-kitten/components";

const Client = ({ navigation, styles, userList = [], shipmentData }) => {
  const [client, setClient] = React.useState({
    client: null,
  });

  React.useEffect(() => {
    if (userList != undefined) {
      userList?.clients.map((user) => {
        if (user.email == shipmentData?.client) {
          setClient((prevData) => ({
            ...prevData,
            client: user,
          }));
        }
      });
    }
  }, [userList, shipmentData]);
  return (
    <>
      <Text category="h5">Tracking</Text>
      <TouchableOpacity
        style={styles.clientContainer}
        onPress={() => navigation.navigate("Shipment")}
      >
        <Avatar
          source={require("../../assets/download.jpg")}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.clientLabel}>Client</Text>
          <Text category="s1">{client.client && client.client.fname}</Text>
          <Text style={{ fontSize: 10 }} category="c2">
            {client.client && client.client.company}
          </Text>
        </View>
        <Button
          style={styles.actionButton}
          status="basic"
          accessoryLeft={(props) => <Icon {...props} name="email" />}
        ></Button>
        {/* <Button
          style={styles.actionButton}
          status="basic"
          accessoryLeft={(props) => <Icon {...props} name="phone" />}
        ></Button> */}
      </TouchableOpacity>
    </>
  );
};

// export default Client;
const mapStateToProps = ({ userApi }) => {
  return {
    userList: userApi,
  };
};

export default connect(mapStateToProps, null)(Client);
