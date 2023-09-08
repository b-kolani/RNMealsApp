import { createSlice } from "@reduxjs/toolkit";

/**initialState is our object where I have some ids
and my ids here should be an empty array.Now these functions 
which we need to change that state  are now not added to the 
initialState as we dit it with context where we had one context 
object that had both the data and also the functions to change 
the data.Instead, with Redux we have a separation and we now 
simply have a reducers key here in our slice object.And reducers
are functions that are used to change our state.
Every method as the function is in an object you define as a reducer
will automatically get the latest state as an input.
Redux will give you the latest state snapshot. */
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] },
  reducers: {
    /**In this function we can then change the state.
    And with just redux, not redux toolkit you should 
    do this in a immutable way.When using redux toolkit 
    you can mutate your state in immutable way because 
    Redux Toolkit will take care about that under the 
    hood.And now here we wanna update our state ids 
    array, and in this case, if we add a favorite, push 
    a new ID onto this array.Indeed we can get a second 
    parameter, the action parameter which can hold an 
    extra payload which we can pass along when invoking 
    this method later.We can get access to this payload by
    using action.payload.We use this key(action.payload) 
    because action is our object created and provided by 
    Redux and it uses a payload property to transport any
    extra data we might attach to this function in the 
    future.So I expect my payload to be an object with an ID 
    property in both remove and add favorite.*/
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

/**We should also export two actions as it's called.To be
precise, the two actions in the reducers so that we can dispatch
these actions and invoke these methods from different places of our 
app.the property named actions used on the favoritesSlice is a property
provided by the Redux Toolkit library*/
export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;

export default favoritesSlice.reducer; /**Here we export 
this because we will later merge this with the reducers in the store */
