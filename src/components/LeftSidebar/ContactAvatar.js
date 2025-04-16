import React from "react";

/**
 * ContactAvatar Component
 *
 * A simple functional component responsible for displaying a contact's avatar image.
 *
 * @param {object} props - Component props.
 * @param {string} props.image - The URL or path to the avatar image file.
 */
function ContactAvatar({ image }) {
  // The component returns a div containing an img element.
  return (
    <div>
      {/*
       * The img element displays the avatar.
       * - src: Set to the 'image' prop passed to the component.
       * - alt: Provides alternative text for accessibility and if the image fails to load.
       * - className: Applies CSS styling (defined elsewhere, likely for size, shape, etc.).
       */}
      <img src={image} alt="user-avatar" className="avatar" />
    </div>
  );
}

// Export the ContactAvatar component as the default export,
// making it available for import in other files.
export default ContactAvatar;
