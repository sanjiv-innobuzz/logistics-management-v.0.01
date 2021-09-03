import React from "react";
import { Autocomplete, AutocompleteItem, Layout } from "@ui-kitten/components";

const movies = [
  { title: "Star Wars" },
  { title: "Back to the Future" },
  { title: "The Matrix" },
  { title: "Inception" },
  { title: "Interstellar" },
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

export const BrandField = ({ styles, handleChange, shipment }) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    setValue(movies[index].title);
    const brand = movies[index].title;
    handleChange({ ...shipment, brand });
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter((item) => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      style={styles.autoCompleteItemAction}
    />
  );

  return (
    <Layout style={styles.input}>
      <Autocomplete
        placeholder="Choose your brand"
        size="large"
        style={[styles.autoCompleteFix, styles.itemBelowAutoCompleteFix]}
        value={value}
        onSelect={onSelect}
        onChangeText={onChangeText}
      >
        {data.map(renderOption)}
      </Autocomplete>
    </Layout>
  );
};
