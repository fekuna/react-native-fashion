import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text, useTheme } from "../../components";

interface CategoryProps {
  categories: any;
  categoryIndex: any;
  changeCategory: any;
}

const CategoryList = ({
  categories,
  categoryIndex,
  changeCategory,
}: CategoryProps) => {
  const theme = useTheme();
  // const [categoryIndex, setCategoryIndex] = useState(0);
  // console.log(categories);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => changeCategory(index)}
            style={{
              marginHorizontal: 15,
            }}
          >
            <Text
              color="body"
              variant="body"
              textTransform="uppercase"
              style={[
                categoryIndex === index && {
                  color: theme.colors.primary,
                  paddingBottom: 5,
                  borderBottomWidth: 2,
                  borderColor: theme.colors.primary,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
