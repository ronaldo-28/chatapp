import React from "react";
// Import the child component used to display individual contact information.
import ContactTab from "./ContactTab";

/**
 * ContactList Component
 *
 * Renders a list of contacts. It iterates over an array of contact objects
 * and renders a `ContactTab` component for each contact.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.contacts - An array of contact objects. Each object
 *                                         should contain the data needed by `ContactTab`.
 */
function ContactList({ contacts }) {
  // The component returns a fragment containing the contact list div.
  return (
    <>
      {/*
       * The main container div for the contact list.
       * - style: Applies inline styles defined in the 'styles' object below (for scrolling and height).
       * - className: Applies CSS classes (likely for additional styling and layout).
       */}
      <div style={styles.contactList} className="contactscreen">
        {
          /*
           * Map over the 'contacts' array passed via props.
           * For each 'contact' object in the array:
           * - Render a 'ContactTab' component.
           * - Pass the entire 'contact' object as a prop to 'ContactTab'.
           * - Assign a unique 'key' prop (using the index) for React's list rendering optimization and identity.
           */
          contacts.map((contact, index) => (
            <ContactTab contact={contact} key={index} />
          ))
        }
      </div>
    </>
  );
}

// Inline styles object for the contact list container.
const styles = {
  contactList: {
    overflowY: "scroll", // Enables vertical scrolling if the content overflows.
    height: "80vh", // Sets the height to 80% of the viewport height.
    zIndex: "2", // Sets the stack order (useful if overlapping elements exist).
    backgroundColor: "#fff", // Sets the background color to white.
  },
};

// Export the ContactList component as the default export,
// making it available for import and use in other parts of the application.
export default ContactList;
