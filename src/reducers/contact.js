// src/reducers/contact.js

// --- CORRECTED IMPORT PATH ---
// Go up one directory ('../') from 'reducers' to 'src', then into 'actions'
import { FETCH_CONTACTS, ADD_MESSAGE } from "../actions/actionTypes";

// Initial state for the contacts slice
const initialState = {
  contacts: [], // Start with an empty array of contacts
};

/**
 * Contacts Reducer
 *
 * Manages the state related to contacts and their chat messages.
 * Handles fetching/setting the initial contacts list and adding new messages.
 *
 * @param {object} state - The current state of the contacts slice. Defaults to initialState.
 * @param {object} action - The dispatched action object.
 * @returns {object} The new state after applying the action.
 */
export default function contacts(state = initialState, action) {
  switch (action.type) {
    // Handle setting/replacing the entire contacts list
    case FETCH_CONTACTS:
      return {
        ...state,
        // Replace the contacts array with the one provided in the action
        // Ensure the payload is actually an array, default to empty if not
        contacts: Array.isArray(action.contacts) ? action.contacts : [],
      };

    // Handle adding a new message to a specific contact's chatlog
    case ADD_MESSAGE:
      // Create a shallow copy of the contacts array for immutability
      const updatedContacts = [...state.contacts];

      // Find the index of the contact to update
      const userIndex = updatedContacts.findIndex(
        (contact) => contact && contact.id === action.userId // Added check for contact existence
      );

      // If the contact is found (index is not -1)
      if (userIndex > -1) {
        // Get the specific contact
        const contactToUpdate = updatedContacts[userIndex];

        // Ensure chatlog exists and is an array before pushing
        const currentChatlog = Array.isArray(contactToUpdate.chatlog)
          ? contactToUpdate.chatlog
          : [];

        // Create a deep copy of the specific contact to update its chatlog immutably
        const updatedUser = {
          ...contactToUpdate,
          // Create a new chatlog array by copying the old one and adding the new message
          chatlog: [...currentChatlog, action.message],
        };
        // Replace the old contact object with the updated one in the copied array
        updatedContacts[userIndex] = updatedUser;

        // Return the new state with the updated contacts array
        return {
          ...state,
          contacts: updatedContacts, // Use the modified array
        };
      } else {
        // If contact not found, log a warning and return the state unchanged
        console.warn(
          `Reducer: Contact with ID ${action.userId} not found for ADD_MESSAGE.`
        );
        return state;
      }

    // If the action type is not handled, return the current state
    default:
      return state;
  }
}
