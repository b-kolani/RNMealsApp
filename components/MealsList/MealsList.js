import { FlatList, StyleSheet, View } from "react-native";

import MealItem from "./MealItem";

function MealsList({items}) {
  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };

    /**Below we use mealItemProps as props on this MealItem component 
        by using this syntax {...mealItemProps}, which is standard javaScript
        syntax and standard in React, to distribute all the properties inside 
        this object here as props to that component it's the same as when you 
        sending prop one by one*/
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });
