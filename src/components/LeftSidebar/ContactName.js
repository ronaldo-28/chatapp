import React from "react";

/**
 * ContactName Component
 *
 * A simple functional component responsible for displaying the name of a contact.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the contact to be displayed.
 */
function ContactName({ name }) {
  // The component returns a div containing a paragraph element.
  return (
    <div>
      {/*
       * The paragraph element displays the contact's name.
       * - style: Applies inline styles defined in the 'styles' object below.
       * - {name}: Renders the 'name' prop passed into the component.
       */}
      <p style={styles.contactText}>{name}</p>
    </div>
  );
}

// Inline styles object for the contact name paragraph.
const styles = {
  contactText: {
    fontSize: "16px", // Sets the font size of the name text.
    color: "#000", // Sets the text color to black.
    marginBottom: "3px", // Adds a small space below the name text.
  },
};

// Export the ContactName component as the default export,
// making it available for import in other files (like ContactTab).
export default ContactName;
