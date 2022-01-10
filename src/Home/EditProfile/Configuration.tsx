import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "../../components";
import CheckboxGroup from "../../components/CheckboxGroup";
import RoundCheckboxGroup from "../../components/RoundCheckboxGroup";

// const outfitTypes = [
//   { value: "men", label: "For men" },
//   { value: "women", label: "For women" },
//   { value: "both", label: "Both" },
// ];

const outfitTypesData = [
  { id: 1, name: "s" },
  { id: 2, name: "m" },
  { id: 3, name: "l" },
  { id: 4, name: "xl" },
  { id: 5, name: "xxl" },
];

const sizes = ["s", "m", "l", "xl", "xxl"];
// const sizes = [
//   { id: 1, name: "s" },
//   { id: 2, name: "m" },
//   { id: 3, name: "l" },
//   { id: 4, name: "xl" },
//   { id: 5, name: "xxl" },
// ];
const colors = ["#0C0D34", "#FF0058", "#50B9DE", "#00D99A", "#FE5E33"];
// const brands = [
//   { value: "adidas", label: "Adidas" },
//   { value: "nike", label: "Nike" },
//   { value: "converse", label: "Converse" },
//   { value: "tommy-hilfiger", label: "Tommy Hilfiger" },
//   { value: "billionaire-boys-club", label: "Billionaire Boys Club" },
//   { value: "jordan", label: "Jordan" },
//   { value: "le-coq-sportif", label: "Le Coq Sportif" },
// ];
const brandsData = [
  { id: 1, name: "adidas" },
  { id: 2, name: "nike" },
  { id: 3, name: "converse" },
  { id: 4, name: "tommy-hilfiger" },
  { id: 5, name: "billionaire-boys-club" },
  { id: 6, name: "jordan" },
  { id: 7, name: "le-coq-sportif" },
];

const Configuration = () => {
  const [outfitTypes, setOutfitTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  console.log({ outfitTypes, brands });

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">What type of outfits do you usually wear?</Text>
        <CheckboxGroup
          options={outfitTypesData}
          radio
          selectedValue={outfitTypes}
          setSelectedValue={setOutfitTypes}
        />

        <Text variant="body">What is your clothing size?</Text>
        <RoundCheckboxGroup options={sizes} />

        <Text variant="body">My prefered clothing colors</Text>
        <RoundCheckboxGroup options={colors} valueIsColor />

        <Text variant="body">My preferred brands</Text>
        <CheckboxGroup
          options={brandsData}
          selectedValue={brands}
          setSelectedValue={setBrands}
        />
      </Box>
    </ScrollView>
  );
};

export default Configuration;
