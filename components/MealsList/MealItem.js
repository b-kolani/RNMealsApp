import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";

/**This component is not a screen component and therefore it does not get the
navigation or route props.But we need access to these props
or at least to the navigation prop.So you can get hold of it 
by using a special React Native hook called useNavigation  */
function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) {
  /**In the Image component the source prop
    takes an object as a value here, and we add 
    a URI key to that object.And the URI is that
    URL pointing to an image on the web, so the uri
    pointing image files on the web not local images.
    For local we will use in source prop require 
    function
    */

  const navigation = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate("MealDetail", {
      mealId: id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectMealItemHandler}
      >
        <View>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            affordability={affordability}
            complexity={complexity}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    /**With we have rounded corners and still the shadow,
    because now overflow hidden here on iOS is set on a different 
    container than the shadow container.That's why it now works.So 
    if we would set overflow hidden on that outer container,
    we still would get rid of the shadow as you saw it before.On 
    inner container, it works still.*/
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
