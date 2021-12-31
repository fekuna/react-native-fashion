import React, { useState } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text, useTheme } from "../../components";

interface CategoryProps {
  categories: string[];
}

const CategoryList = ({ categories }: CategoryProps) => {
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  // console.log(categories);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setCategoryIndex(index)}
          style={{
            marginHorizontal: 15,
          }}
        >
          <Text
            color="body"
            variant="body"
            style={[
              categoryIndex === index && {
                color: theme.colors.primary,
                paddingBottom: 5,
                borderBottomWidth: 2,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;
