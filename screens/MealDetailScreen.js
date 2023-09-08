import { useContext, useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
//import { FavoritesContext } from "../store/context/favorites-context";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }) {
  /**The useContext will give us a context, in this 
  case the favorite meal context or favorite meals 
  context.So we passing our context object into the 
  useContext hook.*/
  //const favoriteMealsCtx = useContext(FavoritesContext);

  /**we can get the favorite meals ids by passing a function 
  to useSelector.A function which will be executed for us by 
  React-Redux, and a function which should accept a state 
  parameter because that will be provided by React-Redux when
  it executes this function.So into state.favoriteMeals.ids 
  and that gives us all these favorite IDs managed by that Redux 
  Slice.*/
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  /**This simply below returns a dispatch object, a dispatch function to be
  precise, which we can execute to dispatch an action.*/
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  //const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      //favoriteMealsCtx.removeFavorite(mealId);
      /**The dispatch function will dispatch action.In 
      this case the removeFavorite action.This below will
      create an action object which is then dispatched, and 
      that's all done under the hook by the Redux Toolkit.
      To this function which we're executing here, removeFavorite,
      we can pass the data that we would like to have in our 
      action payload.And in our action payload, I expect to get an ID
      property.Therefore, we should pass such an object to remove favorite
      and set the ID property to meal ID like this.*/
      dispatch(removeFavorite({ id: mealId }));
    } else {
      //favoriteMealsCtx.addFavorite(mealId);
      /**And then we do same down here when we add a favorite,
      but instead of calling removeFavorite, we call add favorite.
      That is how we can dispatch actions, and how we can read actions
      with useSelector.  */
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      {/**When we use an image that's fetched from a URL
      not locally you must set up width and height because
      react-native doesn't know which dimensions it should 
      use, otherwise it can't infer the width and height 
      from the image */}
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
