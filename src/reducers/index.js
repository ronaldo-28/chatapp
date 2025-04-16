// src/reducers/index.js

import { combineReducers } from "redux";
// Correctly import the DEFAULT export (the reducer function) from './contact.js'
import contactsReducer from "./contact"; // Rename import to avoid conflict if needed, ensure it points to the reducer file
// Correctly import the DEFAULT export from './user.js'
import userReducer from "./user"; // Ensure it points to the reducer file
// Correctly import the DEFAULT export from './theme.js'
import themeReducer from "./theme"; // Ensure it points to the reducer file

/**
 * Root Reducer
 *
 * Combines all application reducers into a single state object.
 * The keys here determine the shape of the Redux state.
 */
export default combineReducers({
  // Assign the imported reducer functions to the desired state keys
  contacts: contactsReducer, // state.contacts will be managed by the contactsReducer
  user: userReducer, // state.user will be managed by the userReducer
  theme: themeReducer, // state.theme will be managed by the themeReducer
});
