import { createContext, useState } from "react";

/**We named the context with an uppercase
character because we will use this or a 
property of that object as it turns out as 
a component later on.Now to create context, 
we can pass an initial context value.And even 
though we don't really need the value here, I
will add it, because that will help us with auto
completion in other parts of the app here in the 
IDE.The FavoritesContext is a variable which 
contains the context created.This context will 
contain data et functions related to favorites.
he initial or default value of this context is an
object with three properties:
1.ids: which is an empty array that will hold ids of 
favorites elements.
2.addFavorite: is an empty function that will be used
to add elements as favorites.
3.removeFavorite: is also an empty function which will
be used to delete or remove elements from favorites.
The idea behind all this is to create a context with
initial or default empty values, which will be updated
by the components which will use this context.So the 
components can access to the created context data using 
the useContext hook from React.
Therefore contexts are useful for sharing data and functions
between components because we don't need to make props
drilling i.e we don't need to pass data via "props" to a
component to another one.This simplify the management
of the global state.*/
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

/**This functional component below, can later be wrapped
around our app, around other components that should be able 
to interact with this context i.e FavoritesContext.It should
contain all the logic that we need for managing our
favorite meal IDs, addFavorite and removeFavorite functions.*/
function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id) {
    /**Here I will update my state and I wanna update it
    based on the previous state  because I wanna add an ew ID
    to the existing array of IDs.Now in React, when updating state
    based on the previous state snapshot, you should pass a function
    to your state updating function, and that function will receive 
    the previous state snapshot and should then return the new state
    snapshot.*/
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  /**Now we need to pass our managed array of meals IDs,
  and these functions above into our context provider.The 
  value object below will passed as value to the value into
  our context provider.And that means that now all the 
  components that are wrapped by this context provider ,
  will be able to tap into this context and either call 
  its functions or read our favorite IDs.*/
  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
