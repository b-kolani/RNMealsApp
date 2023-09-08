import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favorites";

/**We create a store by calling configureStore function 
and to configure store we pass an object where we add a 
reducer key which holds an empty object as a value for 
the moment.Reducers are the different slices of state,
so of data and actions that can change that data are 
used by redux to then construct an overall store of 
data and actions.*/
export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
  },
});
