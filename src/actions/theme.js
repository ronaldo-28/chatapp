// src/actions/theme.js
import { TOGGLE_THEME, SET_THEME } from "./actionTypes";

/**
 * Action Creator: toggleTheme
 * Creates an action to signal a request to switch the theme (light -> dark or dark -> light).
 * The actual switching logic is handled in the reducer.
 * @returns {object} Action object with type TOGGLE_THEME.
 */
export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  };
}

/**
 * Action Creator: setTheme
 * Creates an action to set the theme to a specific value ('light' or 'dark').
 * Typically used when loading the theme preference from storage (like Firestore).
 * @param {string} theme - The theme to set ('light' or 'dark').
 * @returns {object} Action object with type SET_THEME and the theme value.
 */
export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme: theme, // Payload is the theme string
  };
}
