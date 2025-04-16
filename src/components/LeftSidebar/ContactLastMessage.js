import React from "react";

/**
 * ContactLastMessage Component
 *
 * This component displays the text of the last message in a contact's chatlog.
 * It's typically used in a contact list item to provide a preview of the conversation.
 *
 * @param {object} props - Component props.
 * @param {object} props.chatlog - An object representing the last message in the chat.
 *                                 It's expected to have a 'text' property containing the message content.
 *                                 Example: { text: "Okay, see you then!", ... }
 */
function ContactLastMessage(props) {
  return (
    // Container div for the last message text.
    // The className "contactText" likely applies specific styling (e.g., font size, color, ellipsis for overflow).
    <div className="contactText">
      {/* Paragraph element to display the message text */}
      {/* Accesses the 'text' property from the 'chatlog' object passed in props */}
      <p> {props.chatlog.text}</p>
    </div>
  );
}

// Export the ContactLastMessage component as the default export,
// allowing it to be imported and used in other parts of the application.
export default ContactLastMessage;
