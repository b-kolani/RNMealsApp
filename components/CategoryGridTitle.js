import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";

function CategoryGridTitle({ title, color, onPress }) {
  /**The color prop here is a property of each category item object 
    will be set as background color for the item.So we would apply this 
    background color style on the inner View container not the outer to make
    the opacity more visible on iOS devices otherwise  the opacity will only 
    be visible*/

  /**Here I wanna to navigate in this CategoryGridTitle component
    so as this component is not registered as a screen it doesn't access
    to the navigation prop provided by react navigation; but we can pass this 
    prop from this component parent to use it here.But we will use a hook provided
    by react navigation which allows us to make this component as a navigation screen
    no matter if it is registered as a screen or not and this hook will give you 
    this navigation object. We won't use it simply to show you that there are 
    also alternative to make a child component as a registered screen for navigation*/
  //const navigation = useNavigation();
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white" /**This property is important
    to make visible border shadow on iOS devices */,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow:
      Platform.OS === "android"
        ? "hidden"
        : "visible" /**This make sure that the ripple effect
    does not go beyond the rounded corners; but on iOS with this property 
    style the border shadow disappear to fix it; overflow 
    is hidden on Android and visible on iOS with the help of 
    Platform API */,
  },
  button: {
    flex: 1 /**This is important because the Pressable component
    which received this style is the parent of a View container
    so it must take available space to display the View component 
    otherwise the View inside the Pressable container will not been
    displayed thus the Flex:1 on the Pressable component  */,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8 /**We repeat this property here because when we add 
    the backgroundColor property on the component which receives this style 
    the rounded corners disappear on iOS devices so we add borderRadius both on
    the outer and the inner container here
     */,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
