import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Text, Button, Icon } from "@ui-kitten/components";

const MiddelMenDetails = ({
  navigation,
  styles,
  userList = [],
  shipmentData,
}) => {
  const [middlemen, setMiddlemen] = React.useState({
    broker: null,
    agent: null,
  });

  React.useEffect(() => {
    if (userList != undefined) {
      userList?.clients.map((user) => {
        if (user.email == shipmentData.agent) {
          setMiddlemen((prevData) => ({
            ...prevData,
            agent: user,
          }));
        } else if (user.email == shipmentData.broker) {
          //   console.log("coming", user.email == shipmentData.broker);
          setMiddlemen((prevData) => ({
            ...prevData,
            broker: user,
          }));
        }
      });
    }
  }, [userList]);
  return (
    <>
      <Text category="p1">Middle Men</Text>
      <TouchableOpacity
        style={styles.clientContainer}
        //onPress={() => navigation.navigate("Shipment")}
      >
        {middlemen.broker ? (
          <>
            <Avatar
              source={require("../../assets/download.jpg")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.clientLabel}>Broker</Text>
              <Text category="s1">
                {middlemen.broker.fname + middlemen.broker.lname}
              </Text>
              <Text style={{ fontSize: 10 }} category="c2">
                {middlemen.broker && middlemen.broker.email}
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
        {middlemen.agent ? (
          <>
            <Avatar
              source={require("../../assets/download.jpg")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.clientLabel}>Agent</Text>
              <Text category="s1">
                {middlemen.agent.fname + middlemen.agent.lname}
              </Text>
              <Text style={{ fontSize: 10 }} category="c2">
                {middlemen.agent && middlemen.agent.email}
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </>
  );
};

// export default MiddelMenDetails;
const mapStateToProps = ({ userApi }) => {
  return {
    userList: userApi,
  };
};

export default connect(mapStateToProps, null)(MiddelMenDetails);
