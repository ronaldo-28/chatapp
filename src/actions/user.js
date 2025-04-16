// src/actions/user.js
import { SET_USER_PROFILE } from "./actionTypes";

/**
 * Action Creator: setUserProfile
 * Creates an action to update the user profile information in the Redux store.
 * @param {object} userProfile - An object containing user details (e.g., { id, name, image }).
 * @returns {object} An action object with type SET_USER_PROFILE and the user profile data.
 */
export function setUserProfile(userProfile) {
  return {
    type: SET_USER_PROFILE,
    user: userProfile, // Payload containing the user data
  };
}
