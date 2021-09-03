import React from "react";
import { Image } from "react-native";
import {
  Input,
  Layout,
  Divider,
  Autocomplete,
  AutocompleteItem,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";

import extCodes from "./extCodes";
import SingalImageUpload from "../EditUserDetails/SingalImageUpload";

const ClientForm = ({ styles, handleChange, client, editUser = false }) => {
  const roles = ["Agent", "Broker", "Client", "Admin"];
  const [country, setCountry] = React.useState(null);
  const [filteredCountries, setFilteredCountries] = React.useState(extCodes);

  const [roleIndex, setRoleIndex] = React.useState(roles.indexOf(client.role));

  React.useEffect(() => {
    handleChange({ ...client, role: roles[roleIndex] });
  }, [roleIndex]);

  React.useEffect(() => {
    setRoleIndex(roles.indexOf(client.role));
  }, [client]);

  const filter = (item, query) => item.includes(query);

  const countryFlag = (country) => {
    return (
      <Image
        style={styles.flag}
        source={{
          uri: `https://flagcdn.com/w40/${country.toLocaleLowerCase()}.png`,
        }}
      />
    );
  };

  const handleExtChange = (query) => {
    setFilteredCountries(extCodes.filter((item) => filter(item.Ext, query)));
    setCountry({ Ext: query, Code: null });
  };

  const handleSelect = (index) => {
    setCountry(filteredCountries[index]);
    handleChange({ ...client, ext: filteredCountries[index].Ext });
  };

  return (
    <>
      <Layout>
        <Input
          style={styles.input}
          label="Contact Info"
          placeholder="Full Name"
          size="large"
          value={client.name}
          onChangeText={(name) => handleChange({ ...client, name })}
        />
      </Layout>
      <Input
        style={styles.input}
        placeholder="Email"
        disabled={editUser}
        size="large"
        value={client.email}
        onChangeText={(email) => handleChange({ ...client, email })}
      />
      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Autocomplete
          style={[styles.input145, styles.autoCompleteFix]}
          placeholder="ext."
          size="large"
          value={country ? country.Ext : ""}
          accessoryLeft={
            country
              ? country.Code
                ? () => countryFlag(country.Code)
                : null
              : null
          }
          onSelect={handleSelect}
          onChangeText={(query) => handleExtChange(query)}
        >
          {filteredCountries.map((ext, index) => {
            return (
              <AutocompleteItem
                style={styles.autoCompleteItemAction}
                key={index}
                accessoryLeft={() => countryFlag(ext.Code)}
                title={ext.Ext}
              />
            );
          })}
        </Autocomplete>

        <Input
          style={styles.input66}
          placeholder="phone number"
          size="large"
          value={client.phone}
          onChangeText={(phone) => handleChange({ ...client, phone })}
        />
      </Layout>
      <Divider style={styles.divider} />
      <Layout style={styles.inputGroup}>
        <RadioGroup
          style={styles.inputGroupRadio}
          selectedIndex={roleIndex}
          // disabled={editUser}
          onChange={(index) => setRoleIndex(index)}
        >
          <Radio>Agent</Radio>
          <Radio>Broker</Radio>
          <Radio>Client</Radio>
          <Radio>Admin</Radio>
        </RadioGroup>
      </Layout>

      <Input
        style={[styles.input, styles.dividerStatusBar]}
        label="Company"
        placeholder="Business Name"
        size="large"
        value={client.company}
        onChangeText={(company) => handleChange({ ...client, company })}
      />

      <Divider style={styles.divider} />

      <Input
        style={styles.input}
        label="Create Password"
        placeholder="Password..."
        size="large"
        onChangeText={(password) => handleChange({ ...client, password })}
      />
      {editUser ? (
        <SingalImageUpload
          styles={styles}
          handleChange={handleChange}
          client={client}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ClientForm;
