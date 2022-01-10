import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box, Text, TextInput } from "../../components";
import CheckboxGroup from "../../components/CheckboxGroup";

// const genders = [
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
// ];
const gendersData = [
  { id: 1, name: "male" },
  { id: 2, name: "female" },
];

const PersonalInfo = () => {
  const [genders, setGenders] = useState([]);

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Account Information
        </Text>
        <Box marginBottom="m">
          <TextInput
            icon="lock"
            placeholder="Enter your password"
            autoCompleteType="password"
            autoCapitalize="none"
            secureTextEntry
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="map-pin"
            placeholder="Address"
            autoCapitalize="none"
            autoCompleteType="street-address"
          />
        </Box>
        <CheckboxGroup
          options={gendersData}
          radio
          selectedValue={genders}
          setSelectedValue={setGenders}
        />
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
