import React from "react";
import { Text } from "@ui-kitten/components";

const Error = ({ error, styles }) => {
  return (
    <Text status="danger" style={styles.errorMsg}>
      {error}
    </Text>
  );
};

export default Error;
