import React from "react";
import { CheckBox,Text,Input,Divider } from "@ui-kitten/components";

const PackageMaterialArrivedForm = ({ styles, handleChange, shipment }) => {
 
  return (
    <>
       
          
          <CheckBox
            style={styles.input}
            checked={shipment.telex}
            onChange={telex => handleChange({ ...shipment, telex })}>
            {`ART WORK UNDER APPROVAL`}
          </CheckBox>
        
          <Text category="s1" style={styles.input}>Documents Dispatch </Text>
          <Divider style={styles.divider} />
          <CheckBox
            style={styles.input}
            checked={shipment.toBuyer}
            onChange={toBuyer => handleChange({ ...shipment, toBuyer })}>
            {`To Buyer`}
          </CheckBox>
          <CheckBox
            style={styles.input}
            checked={shipment.toBank}
            onChange={toBank => handleChange({ ...shipment, toBank })}>
            {`To Bank`}
          </CheckBox>
          <Input
                style={styles.input}
                label="DHL No:"
                size="medium"
                placeholder="Please mention Packing Material"
                size="large"
                multiline={true}
                onChangeText={dhl => handleChange({ ...shipment, dhl })
                }
            />
    </>
  );
};

export default PackageMaterialArrivedForm;
