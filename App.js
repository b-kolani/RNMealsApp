import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
//import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";

/**The Stack variable defined below is an object with
two properties, where every property holds a object 
that acts as a component.Therefore, we can use those 
nested component objects inside of Stack in our
jSX code*.We register different screens in which we 
will navigate with Stack.Screen then we store these 
screens in Screen.Navigator component*/
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/**The idea behind this using two navigators 
is to nest one into another.Here nested the Drawer 
navigator in the Stack navigator.We will have two headers 
because we have two navigators, and when nesting navigators 
every navigator brings its own header.But we can remove the 
extra header*/
function DrawerNavigator() {
  /**In Drawer navigator the contentStyle is 
  named sceneContainerStyle */
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        //contentStyle: { backgroundColor: "#3f2f25" },
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/**Now wrapping all components in FavoritesContextProvider
       like this they will access of its context as some components
       need access to this context.And when using redux we do same */}
      {/**<FavoritesContextProvider>*/}
      {/**provider is a component provided by react redux, not by 
      redux toolkit.*/}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            /**These are the default screen options that will be
        applied to all the screens registered in this navigator.But
        we can add these options on each screen registered but it 
        not best way.Now, if you had clashing settings, if we would
        also be setting a header style in one of the screens, the 
        screen specific settings would always win but the default 
        settings are used otherwise.*/
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{
                /**Here we choose to get rid of the Stack navigator
              header so we use headerShown option to fix that so 
              we can remove the title option because we don't need 
              it here anymore, because this header, this Stack.Screen 
              header, will be hidden anyways by headerShown option.*/
                //title: "All Categories",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}

              /**The options prop is used to manage the navigate between screens
            It is used to specify navigation options for a specific screen
            This options object can contain setups for customizing the appearance 
            and the behavior of the navigation screen, such as the title of the screen,
            navigation buttons, icons, styles and so on.That's one way of setting options dynamically
            and taking route specific, screen specific data 
            into account:
             options={({ route, navigation }) => {
              const catId = route.params.categoryId;
              return {
                title: catId,
              };
            }}
            */
              /**The another alternative to set options is that you set 
          options from inside the component. */
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{ title: "About the Meal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/**</FavoritesContextProvider>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
