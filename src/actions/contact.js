// src/actions/contact.js

// Import necessary action types
import { ADD_MESSAGE, FETCH_CONTACTS } from "./actionTypes"; // Added FETCH_CONTACTS import
import { db } from "../firebase"; // Import Firestore db instance
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions

// --- Helper action creator (internal, synchronous) ---
// This action is dispatched immediately to update the Redux state for UI responsiveness.
function _addMessage(message, userId) {
  return {
    type: ADD_MESSAGE,
    message, // The new message object { text, timestamp, sender, message_id }
    userId, // The ID of the *contact* receiving/sending the message in the chatlog
  };
}

// --- Thunk action creator for adding a message (handles async Firestore update) ---
export function addNewMessage(message, contactUserId) {
  // Renamed userId to contactUserId for clarity
  return async (dispatch, getState) => {
    // 1. Get the CURRENT logged-in user's ID from the Redux state.
    // Assumes your 'user' slice in the state has an 'id' property.
    const currentUserId = getState().user.id;
    if (!currentUserId) {
      console.error(
        "Error adding message: Cannot get current user ID from Redux state."
      );
      // Optionally dispatch an error action or return early
      return;
    }

    // 2. Dispatch the synchronous action to update Redux state immediately.
    // Pass the message object and the ID of the contact whose chatlog is being updated.
    dispatch(_addMessage(message, contactUserId));

    // 3. Get the updated contacts array from the Redux state AFTER the sync dispatch.
    // This reflects the change made in step 2.
    const updatedContacts = getState().contacts.contacts;

    // 4. Prepare the Firestore update.
    // Get the document reference for the *currently logged-in user*.
    // We assume the Firestore structure is /users/{currentUserId}.
    const userDocRef = doc(db, "users", currentUserId.toString()); // Ensure ID is a string

    try {
      // 5. Update the entire 'contacts' array field in the current user's Firestore document.
      // This replaces the existing array with the new one containing the added message.
      // Note: This is simpler but less efficient for very large chatlogs/contact lists.
      await updateDoc(userDocRef, {
        contacts: updatedContacts, // Overwrite the contacts field with the updated array
      });
      console.log(
        "Message successfully saved to Firestore for user:",
        currentUserId
      );
    } catch (error) {
      console.error("Error saving message to Firestore: ", error);
      // Handle error: Maybe dispatch an action to revert the Redux change,
      // show an error message to the user, or implement retry logic.
    }
  };
}

// --- Action creator for updating/setting the contacts list (e.g., on initial load) ---
// This is a standard synchronous action.
export function updateContacts(contacts) {
  return {
    type: FETCH_CONTACTS, // Uses the imported action type
    contacts, // The payload is the array of contact objects
  };
}
