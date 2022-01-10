import React, { useState } from "react";
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

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map((option, idx) => {
        const index = selectedValue.indexOf(option);
        const isSelected = index !== -1;

        return (
          <OptionButton
            key={idx}
            variant={isSelected ? "primary" : "default"}
            onPress={() => {
              if (radio) {
                setSelectedValue([option]);
              } else {
                if (isSelected) {
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
