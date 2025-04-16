// Action types for Redux

// Contact related actions
export const FETCH_CONTACTS = "FETCH_CONTACTS"; // Used to set/update the contacts list
export const ADD_MESSAGE = "ADD_MESSAGE"; // Used to add a single message to a contact's chatlog

// Theme related actions
export const TOGGLE_THEME = "TOGGLE_THEME"; // Used to flip between light/dark
export const SET_THEME = "SET_THEME"; // Used to set the theme explicitly (e.g., from Firestore)

// User profile related actions
export const SET_USER_PROFILE = "SET_USER_PROFILE"; // Used to set the logged-in user's data
