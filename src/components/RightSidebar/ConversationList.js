import React from "react";
// Import the useParams hook from react-router to access URL parameters.
import { useParams } from "react-router";
// Import component-specific styles.
import "../stylesheets/rightSidebar.css";
// Import the MessageBox component, which displays the actual chat interface.
import MessageBox from "./MessageBox";

/**
 * ConversationList Component (Note: Name might be slightly misleading, it displays a single conversation)
 *
 * This component is responsible for displaying the chat messages for a specific conversation.
 * It retrieves the conversation ID from the URL parameters, finds the corresponding contact
 * from the provided list, and then renders the `MessageBox` component for that contact.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.contacts - An array of all contact objects, each containing user details and chatlog.
 */
function ConversationList(props) {
  // Destructure the contacts array from the props.
  const { contacts } = props;

  // Use the useParams hook to get the dynamic part of the URL.
  // Assumes the route is defined like "/conversations/:id".
  const { id } = useParams(); // 'id' will be a string extracted from the URL (e.g., "3")

  // Convert the extracted 'id' (which is a string) into an integer for comparison.
  const userId = parseInt(id);

  // Find the specific contact object within the 'contacts' array
  // whose 'id' property matches the 'userId' obtained from the URL.
  const user = contacts.find((contact) => contact.id === userId);

  // Render the component structure.
  return (
    // Use a React Fragment to avoid adding an unnecessary div to the DOM.
    <>
      {/*
       * Conditional Rendering:
       * Only render the MessageBox component if a 'user' object was successfully found.
       * This prevents errors if the URL contains an invalid or non-existent ID.
       * If 'user' is truthy (i.e., not null or undefined), the <MessageBox> component is rendered.
       * The found 'user' object (containing name, image, chatlog, etc.) is passed as a prop to MessageBox.
       */}
      {user && <MessageBox user={user} />}
    </>
  );
}

// Export the ConversationList component as the default export,
// making it available for use in routing configurations or other parent components.
export default ConversationList;
