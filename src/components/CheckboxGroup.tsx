import React, { useEffect, useRef, useState } from "react";
import { Button } from ".";
import OptionButton from "./OptionButton";
import { Box, useTheme } from "./Theme";

interface CheckboxGroupProps {
  options: { id: number; name: string }[];
  radio?: boolean;
  selectedValue: any;
  setSelectedValue: any;
}

const CheckboxGroup = ({
  options,
  radio,
  selectedValue,
  setSelectedValue,
}: CheckboxGroupProps) => {
  const { spacing } = useTheme();
  // const [isSelected, setIsSelected] = useState(false);
  const isSelected = useRef(false);

  useEffect(() => {}, [selectedValue]);

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map((option, idx) => {
        // console.log("CheckboxGroup", selectedValue);
        const index = selectedValue.indexOf(option);
        // setIsSelected(index !== -1);
        isSelected.current = index !== -1;

        return (
          <OptionButton
            key={idx}
            variant={isSelected.current ? "primary" : "default"}
            onPress={() => {
              if (radio) {
                setSelectedValue([option]);
              } else {
                if (isSelected.current) {
                  selectedValue.splice(index, 1);
                } else {
                  selectedValue.push(option);
                }
                setSelectedValue([...selectedValue]);
              }
            }}
            label={option.name}
            style={{
              width: "auto",
              height: "auto",
              padding: 16,
              marginBottom: spacing.m,
              marginRight: spacing.s,
            }}
          />
        );
      })}
    </Box>
  );
};

export default CheckboxGroup;
