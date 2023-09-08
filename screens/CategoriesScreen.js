import { FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTitle from "../components/CategoryGridTitle";

/**This component will output all those categories
Now, there will be different ways of outputting the 
categories here.We could for example use a FlatList 
to output all the categories.And you could do that 
if categories would be a list with a lot of items,
or a dynamic list where you don't know in advance 
how many items will be in there unlike static content.
And then, for performance benefits, you wanna use a 
FlatList, which renders elements lazily.But here, 
actually, categories list which we wanna to output here 
is a limited amount of categories and in this case 
it's also some static data which is not going to change
thus you can use ScrollView instead of FlatList.
Nonetheless, for the reasons mentioned, we will use FlatList*/

/**The navigation prop here is provided automatically by 
react navigation as we used this component as a screen in 
Stack.Screen */
function CategoriesScreen({ navigation }) {
  /**This helper function which is totally optional, not something 
you have to do, it will help us to render categories item in a 
custom way.And then here I wanna return the jSX code for a single 
item.And I'm just doing this to keep the JSX code in the FlatList a 
bit leaner.That's the only reason, you would not have to define a 
separate function like this.*/
  /**Here the itemData parameter below is not up to you 
since it provided automatically  by the FlatList component in the end.
The navigate method provided by the navigation object take as a second 
argument an object which holds parameters that will be passed between 
screens to be used in the destination screen. */
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", { categoryId: itemData.item.id });
    }

    return (
      <CategoryGridTitle
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
