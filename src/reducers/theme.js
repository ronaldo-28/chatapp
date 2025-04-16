// src/reducers/theme.js
import { TOGGLE_THEME, SET_THEME } from "../actions/actionTypes";

// Initial state for the theme slice
const initialState = {
  currentTheme: "light", // Default theme is 'light'
};

/**
 * Theme Reducer
 * Manages the 'currentTheme' state ('light' or 'dark').
 * Handles actions to toggle the theme or set it explicitly.
 * @param {object} state - Current theme state. Defaults to initialState.
 * @param {object} action - Dispatched action.
 * @returns {object} New theme state.
 */
export default function theme(state = initialState, action) {
  switch (action.type) {
    // Handle the TOGGLE_THEME action
    case TOGGLE_THEME:
      return {
        ...state,
        // Switch between 'light' and 'dark' based on the current state
        currentTheme: state.currentTheme === "light" ? "dark" : "light",
      };
    // Handle setting the theme directly from the action payload
    case SET_THEME:
      return {
        ...state,
        // Set the theme, ensuring it's either 'dark' or defaults to 'light'
        currentTheme: action.theme === "dark" ? "dark" : "light",
      };
    // Return current state for any unhandled actions
    default:
      return state;
  }
}
