import { useLayoutEffect } from "react";
//import { useRoute } from "@react-navigation/native";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

/**Here the route prop is get in any component that is 
registered as a screen with react navigation.*/
function MealsOverviewScreen({ route, navigation }) {
  /**With this prop you get params property, which is actually an 
    object containing the parameters that you might have passed to 
    this screen.And the params object we get here is param
    object we set up when navigating to this screen.There 
    also an alternative for getting parameters that is the react 
    navigation hook useRoute as uses below but you don't have to as
    we already get params or information via route prop*/
  //const route = useRoute();
  //route.params;
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    /**Here we use indexOf to get the index of item.And we know that 
    if we have a index greater or equal than zero, a category is 
    part of that meal because if we would not find a given category 
    Id in that array indexOf would return minus one. */
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  /**The navigation prop has another method named setOptions.
  But set options directly in the component is not a proper 
  way, you will get warnings or errors, you should not do that.
  Instead you should use, useEffect.useEffect actually executes 
  this effect function after the component function was executed
  for the first time that is why you get an ugly behavior like 
  the display of the title that is not smooth.This can be fixed by 
  using the useLayoutEffect hook instead.You can use it in situations 
  like this where you typically have some king of ongoing animation
  and you wanna set or execute some side effect whilst this is still
  happening, and before the component has been rendered.So before this
  component function has finished execution.Or to be precise, you wanna
  run this effect simultaneously with the component function execution.*/
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]); /**The catId and navigation set as dependencies 
  are two external things we use inside the useEffect of this function
  Categories is also external, but not part of this component function it's 
  being imported instead */

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
