// src/components/ThemeToggle.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../actions/theme"; // Import the Redux action
import { Button } from "react-bootstrap";
// Import Firebase and Firestore functions
import { db } from "../firebase"; // Adjust path if needed
import { doc, updateDoc } from "firebase/firestore";
// Import mock data ONLY to get the USER_ID for this example
// In a real app, USER_ID should come from auth state or Redux user state
import { data as mockData } from "../Data/users";

// --- Use a fixed USER_ID for updating Firestore in this example ---
// --- Replace this with actual logged-in user ID management later ---
const USER_ID = mockData.profile.id.toString();

/**
 * ThemeToggle Component
 * A button to switch between light and dark themes, updating both
 * Redux state and Firestore persistence.
 */
function ThemeToggle() {
  const dispatch = useDispatch();
  // Get the current theme from the Redux state
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  // Get the current user ID from Redux state (ensure it's loaded)
  const currentUserIdFromState = useSelector((state) => state.user.id);

  // Handler function for the toggle button click
  const handleToggle = async () => {
    // Determine the theme to switch to
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    // 1. Dispatch the action to update the Redux state immediately (optimistic UI)
    dispatch(toggleTheme());

    // 2. Get the user ID (use ID from state if available, otherwise fallback)
    const userIdToUpdate = currentUserIdFromState
      ? currentUserIdFromState.toString()
      : USER_ID;

    if (!userIdToUpdate) {
      console.error(
        "ThemeToggle: Cannot update Firestore, user ID is missing."
      );
      return;
    }

    // 3. Update the theme preference in Firestore
    const userDocRef = doc(db, "users", userIdToUpdate);
    try {
      await updateDoc(userDocRef, {
        theme: nextTheme, // Update the 'theme' field in the user's document
      });
      console.log(
        "Theme preference saved to Firestore for user:",
        userIdToUpdate
      );
    } catch (error) {
      console.error(
        "Error saving theme to Firestore for user " + userIdToUpdate + ": ",
        error
      );
      // Optional: Dispatch an action to revert the theme change in Redux
      // Or display an error message to the user
    }
  };

  return (
    <Button
      // Set button style based on the current theme
      variant={currentTheme === "light" ? "outline-dark" : "outline-light"}
      onClick={handleToggle} // Call the handler on click
      size="sm" // Make the button small
      title={`Switch to ${currentTheme === "light" ? "Dark" : "Light"} Mode`} // Tooltip
      style={{ padding: "0.2rem 0.5rem", fontSize: "1rem" }} // Custom styling
    >
      {/* Display a moon icon for light mode, sun icon for dark mode */}
      {currentTheme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}

export default ThemeToggle;
