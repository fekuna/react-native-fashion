// import React from "react";
// import { TextInput as RNTextInput } from "react-native";
// import { Feather as Icon } from "@expo/vector-icons";
// import { useState } from "react";
// import { Box } from "../../../components";
// import theme from "../../../components/Theme";

// interface TextInputProps {
//   placeholder: string;
//   icon: any;
//   validator?: (input: string) => boolean;
// }

// const SIZE = theme.borderRadii.m * 2;
// const Valid = true;
// const Invalid = false;
// const Prestine = null;

// type InputState = typeof Valid | typeof Invalid | typeof Prestine;

// const TextInput = ({ icon, placeholder }: TextInputProps) => {
//   const [valid, setValid] = useState<InputState>(Prestine);

//   return (
//     <Box flexDirection="row" alignItems="center">
//       <Icon name={icon} />
//       <RNTextInput
//         underlineColorAndroid="transparent"
//         placeholderTextColor="#151624"
//         {...{ placeholder }}
//       />
//     </Box>
//   );
// };

// export default TextInput;
