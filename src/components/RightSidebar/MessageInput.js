import React, { useEffect, useState } from "react";
// Import layout components from react-bootstrap if needed (currently Row and Col are used for layout)
import { Row, Col } from "react-bootstrap";

/**
 * MessageInput Component
 *
 * Renders the input field and send button at the bottom of the chat window.
 * It allows the user to type a message and send it.
 *
 * @param {object} props - Component props.
 * @param {function} props.newMessageHandler - A callback function passed from the parent component (MessageBox).
 *                                             This function is called when the user sends a message,
 *                                             passing the message text as an argument.
 * @param {object} props.user - The user object for the current contact (passed from MessageBox).
 *                             Used in the useEffect dependency array to detect contact changes.
 */
function MessageInput(props) {
  // Destructure the callback function from props for easier use
  const { newMessageHandler } = props;
  // State hook to manage the text currently entered in the input field
  const [message, setMessage] = useState("");

  /**
   * useEffect Hook
   *
   * Resets the message input field (clears the `message` state) when the `props.user` changes.
   * This ensures the input field is empty when switching to a different contact's chat.
   */
  useEffect(() => {
    // Reset input value when the contact component changes by setting the message state to an empty string
    setMessage("");
    // Dependencies: the effect runs when `setMessage` function reference changes (unlikely) or `props` object changes.
    // Primarily intended to react to changes in `props.user`.
  }, [setMessage, props]);

  /**
   * handleInputChange Function
   *
   * Event handler for the input field's `onChange` event.
   * Updates the `message` state with the current value of the input field as the user types.
   *
   * @param {object} e - The event object from the input field change.
   */
  let handleInputChange = (e) => {
    // Prevent the default form submission behavior if this input were part of a form
    e.preventDefault();
    // Update the message state with the input field's current value
    setMessage(e.target.value);
  };

  /**
   * handleSubmit Function
   *
   * Event handler for the send button's `onClick` event.
   * Checks if there is text in the message state. If so, it calls the
   * `newMessageHandler` prop function with the message text.
   * If the message is empty, it shows an alert.
   * Finally, it resets the input field by clearing the `message` state.
   */
  let handleSubmit = () => {
    // Check if the message state is not empty or just whitespace
    if (message && message.trim()) {
      // Call the handler function passed via props, sending the current message text
      newMessageHandler(message);
    } else {
      // Alert the user if they try to send an empty message
      alert("Type some message text before submitting");
    }
    // Reset the message state to clear the input field after sending or attempting to send
    setMessage("");
    // TODO: Implement scrolling to the bottom of the message list after sending
    // scroll to the bottom
  };

  // Render the MessageInput component UI
  return (
    // Use a React Fragment to group elements without adding an extra node to the DOM
    <>
      {/* Use react-bootstrap Row for layout */}
      {/* The className "message-input" likely applies specific styling */}
      <Row className="message-input">
        {/* Column for the text input field (adjusts size based on screen width) */}
        <Col xs={5} lg={5}>
          {/* The text input field */}
          <input
            type="text" // Standard text input
            placeholder="Send message" // Placeholder text when empty
            value={message} // Bind the input's value to the message state
            onChange={handleInputChange} // Call handleInputChange when the user types
          />
        </Col>
        {/* Column for the send button (adjusts size based on screen width) */}
        <Col xs={3} lg={4}>
          {/* The send button */}
          <button className="send-button" onClick={handleSubmit}>
            Send
          </button>
        </Col>
      </Row>
    </>
  );
}

// Export the MessageInput component for use in other parts of the application (like MessageBox)
export default MessageInput;
