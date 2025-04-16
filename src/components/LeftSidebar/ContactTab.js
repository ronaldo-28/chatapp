import React from "react";
// Import child components used within ContactTab
import ContactAvatar from "./ContactAvatar"; // Component to display the contact's picture
import ContactLastMessage from "./ContactLastMessage"; // Component to display the preview of the last message
import ContactName from "./ContactName"; // Component to display the contact's name

// Import Link component from react-router-dom for navigation
import { Link } from "react-router-dom";

/**
 * ContactTab Component
 *
 * Represents a single contact item in the contact list. Displays the contact's
 * avatar, name, and the last message exchanged. Clicking on the tab navigates
 * the user to the conversation screen for that specific contact.
 *
 * @param {object} props - Component props.
 * @param {object} props.contact - The contact object containing details like image, name, chatlog, and id.
 * @param {string} props.contact.image - URL or path to the contact's avatar image.
 * @param {string} props.contact.name - The name of the contact.
 * @param {Array<object>} props.contact.chatlog - An array of message objects for this contact.
 * @param {number|string} props.contact.id - A unique identifier for the contact.
 */
function ContactTab(props) {
  // Destructure necessary properties (image, name, chatlog, id) from the props.contact object
  const { image, name, chatlog, id } = props.contact;

  // Get the total number of messages in the chatlog array
  let length = chatlog.length;

  // Define a placeholder object to display when there are no messages in the chatlog
  const noMessage = {
    text: " 0 message Conversation not initiated", // Text indicating no conversation history
  };

  // Render the contact tab as a clickable link
  return (
    // Use React Router's Link component to make the entire tab navigable.
    // It links to the conversation route, using the contact's 'id'.
    // The className 'link-tag' might be used to remove default link styling.
    <Link to={`/conversations/${id}`} className="link-tag">
      {/* Main container div for the contact tab layout. */}
      {/* The className 'contact-tab' likely applies styling for layout (e.g., flexbox), padding, borders. */}
      <div className="contact-tab">
        {/* Container for the contact's avatar */}
        <div>
          {/* Render the ContactAvatar component, passing the image URL */}
          <ContactAvatar image={image} />
        </div>

        {/* Container for the contact's name and last message. */}
        {/* Inline style adds left margin for spacing next to the avatar. */}
        <div style={{ marginLeft: "16px" }}>
          {/* Render the ContactName component, passing the contact's name */}
          <ContactName name={name} />

          {/* Render the ContactLastMessage component. */}
          {/* Conditionally pass the last message object or the 'noMessage' placeholder. */}
          {/* If chatlog length is greater than 0, pass the last element (chatlog[length - 1]). */}
          {/* Otherwise (if length is 0), pass the 'noMessage' object. */}
          <ContactLastMessage
            chatlog={length > 0 ? chatlog[length - 1] : noMessage}
          />
        </div>
      </div>
    </Link>
  );
}

// Export the ContactTab component as the default export,
// making it available for import in other components (like ContactList).
export default ContactTab;
