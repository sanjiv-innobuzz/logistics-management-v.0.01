import React from "react";
import { Input, Datepicker, Divider } from "@ui-kitten/components";
// import BrandField from "./BrandField";

const ScheduleForm = ({ styles, handleChange, shipment, pi }) => {
  return (
    <>
      <Input
        style={styles.input}
        label="Quality"
        size="medium"
        placeholder="Please mention Quality"
        size="large"
        disabled={true}
        value={shipment?.quality}
        multiline={true}
        onChangeText={(quality) => handleChange({ ...shipment, quality })}
      />
      <Datepicker
        style={styles.input}
        label="Date"
        size="large"
        // style={styles.inputHalf}
        date={shipment.dateScheduled}
        onSelect={(dateScheduled) =>
          handleChange({ ...shipment, dateScheduled })
        }
      />
      <Input
        style={styles.input}
        label="Packing Material"
        size="medium"
        placeholder="Please mention Packing Material"
        size="large"
        disabled={true}
        value={shipment?.packingMatrial}
        multiline={true}
        onChangeText={(packingMatrial) =>
          handleChange({ ...shipment, packingMatrial })
        }
      />

      <Input
        style={styles.input}
        label="Pack Size and No."
        size="medium"
        disabled={true}
        placeholder="Please mention Pack Size and No."
        size="large"
        value={shipment?.packsize}
        multiline={true}
        onChangeText={(packsize) => handleChange({ ...shipment, packsize })}
      />

      <Divider style={styles.divider} />
      <Input
        style={styles.input}
        label="Brand"
        size="medium"
        disabled={true}
        placeholder="Please enter brand."
        size="large"
        value={shipment?.brand}
        // multiline={true}
        onChangeText={(packsize) => handleChange({ ...shipment, brand })}
      />

      {/* <BrandField
        styles={styles}
        handleChange={handleChange}
        shipment={shipment}
        pi={pi}
      /> */}
      <Input
        style={styles.input}
        label="Quantity"
        size="medium"
        keyboardType="number-pad"
        placeholder="Please mention Quantity"
        size="large"
        multiline={true}
        disabled={true}
        value={shipment?.quantity}
        onChangeText={(quantity) => handleChange({ ...shipment, quantity })}
      />
      <Divider style={styles.divider} />
      <Input
        style={styles.input}
        label="Destination Port"
        size="medium"
        placeholder="Please mention Destination Port"
        size="large"
        multiline={true}
        value={shipment?.destinationPort}
        onChangeText={(destinationPort) =>
          handleChange({ ...shipment, destinationPort })
        }
      />
      <Input
        style={styles.input}
        label="Schedule updted by"
        size="medium"
        disabled={true}
        placeholder="auto update"
        value={shipment.scheduleUpdate}
        size="large"
        multiline={true}
        onChangeText={(scheduleUpdate) =>
          handleChange({ ...shipment, scheduleUpdate })
        }
      />
    </>
  );
};

export default ScheduleForm;
