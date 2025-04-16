import React from "react";

/**
 * ProfileHeader Component
 *
 * Displays a header section, typically used at the top of a chat window or profile view.
 * It shows the user's avatar image and their name.
 *
 * @param {object} props - Component props.
 * @param {object} props.user - The user object containing the data to display.
 * @param {string} props.user.image - The URL or path to the user's avatar image.
 * @param {string} props.user.name - The name of the user.
 */
function ProfileHeader({ user }) {
  return (
    // Use a React Fragment to group elements without adding an extra node to the DOM.
    <>
      {/* Main container div for the header elements. */}
      {/* The className "header" likely applies layout and styling (e.g., flexbox, padding, background). */}
      <div className="header">
        {/*
         * Image element for the user's avatar.
         * - className "avatar": Applies specific styling for the avatar (e.g., size, shape).
         * - src: Sets the image source from the user object's 'image' property.
         * - alt: Provides alternative text for accessibility.
         */}
        <img className="avatar" src={user.image} alt="profile-pic" />
        {/* Paragraph element to display the user's name. */}
        <p>{user.name}</p>
      </div>
    </>
  );
}

// Export the ProfileHeader component as the default export,
// making it available for import in other parts of the application.
export default ProfileHeader;
