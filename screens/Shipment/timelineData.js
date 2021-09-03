import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";

const timelineData = (shipment, styles, theme) => {
  const { date, quantity, rate, stage } = shipment;
  const timelineData = [];

  const timelineComponent = (title, descp, iconName, date) => ({
    title: ({ styles }) => (
      <View>
        <Text style={{ fontSize: 10, color: "#999", marginBottom: 7 }}>
          {moment(date).format("lll")}
        </Text>
        <Text
          style={[
            styles,
            { marginBottom: 0, color: theme["color-primary-500"] },
          ]}
        >
          {title}
        </Text>
      </View>
    ),
    description: {
      content: descp,
    },
    icon: {
      content: iconName,
      style: styles.iconStyle,
    },
  });

  for (let i = 0; i <= stage; i++) {
    switch (i) {
      case 0:
        timelineData.push(
          timelineComponent(
            "Shipment Created",
            `total ${quantity} units ordered @ $${rate}`,
            "qrcode",
            date,
            styles
          )
        );
        break;

      case 1:
        timelineData.push(
          timelineComponent(
            "PACKAGING MATERIAL STATUS",
            `Doces included are List, the, documents, here`,
            "pencil-square-o",
            date,
            styles
          )
        );
        break;

      case 2:
        timelineData.push(
          timelineComponent(
            "SCHEDULE",
            `Design name will be displayed here`,
            "object-ungroup",
            date,
            styles
          )
        );
        break;

      case 3:
        // let { designApproved } = shipment;
        // const { finalApproval } =
        //   typeof designApproved !== "undefined"
        //     ? designApproved
        //     : (designApproved = false);
        timelineData.push(
          timelineComponent(
            `PRODUCTION AND DISPATCH SCHEDULE`,
            `Comments will appear here`,
            "object-group",
            date,
            styles
          )
        );
        break;

      case 4:
        timelineData.push(
          timelineComponent(
            `DOCUMENT STATUS`,
            `$234`,
            "dollar",
            date,
            styles
          )
        );
        break;

      case 5:
        timelineData.push(
          timelineComponent(
            `SHIPMENT SCHEDULE`,
            "expected to arrive on ${date}",
            "cubes",
            date,
            styles
          )
        );
        break;

      case 6:
        timelineData.push(
          timelineComponent(
            `DOCUMENTS DISPATCH STATUS`,
            "arrive on ${date}",
            "cube",
            date,
            styles
          )
        );
        break;

      default:
        break;
    }
  }

  return timelineData.length >= 1 ? timelineData : [];
};

export default timelineData;
