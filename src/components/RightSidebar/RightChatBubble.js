import React from "react";

/**
 * RightChatBubble Component
 *
 * Represents a chat message bubble sent by the current user (displayed on the right side).
 * It shows the sender's avatar, name, the message text, and the timestamp.
 *
 * @param {object} props - Component props.
 * @param {object} props.message - The message object containing text and timestamp.
 * @param {string} props.message.text - The content of the chat message.
 * @param {string} props.message.timestamp - The time the message was sent.
 * @param {string} props.name - The name of the sender (typically the current user's name).
 * @param {string} props.image - The URL or path to the sender's avatar image.
 */
function RightChatBubble({ message, name, image }) {
  return (
    // Use a React Fragment to avoid adding an extra DOM element.
    <>
      {/*
       * Main container for the right-aligned message bubble.
       * ClassNames "message-bubble" and "mbr" (likely 'message bubble right') are used for overall styling and alignment.
       */}
      <div className="message-bubble mbr">
        {/*
         * Image tag for the sender's avatar.
         * - src: Uses the 'image' prop passed to the component.
         * - style: Applies inline styles for size, shape, and margin (defined below).
         * - alt: Provides alternative text for accessibility.
         */}
        <img src={image} style={styles.avatar} alt="sender-pic" />{" "}
        {/* Spacer element (often a space character or could be removed if CSS handles spacing) */}
        {/* Container for the speech bubble itself (text content and arrow). */}
        {/* ClassName "right-bubble" likely styles the bubble's appearance (background, border-radius) and alignment. */}
        <div className="right-bubble ">
          {/* Container for the text elements within the bubble. */}
          <div className="text-message">
            {/* Paragraph element to display the sender's name. */}
            <p className="name">{name}</p>
            {/* Paragraph element to display the actual message text. */}
            <p className="message">{message.text}</p>
            {/* Span element to display the message timestamp. */}
            <span className="message-timestamp">{message.timestamp}</span>
          </div>
          {/* Div representing the triangular arrow/tail of the speech bubble. */}
          {/* ClassNames "bubble-arrow" and "bubble-arrow-alt" likely style and position the arrow for a right-aligned bubble. */}
          <div className="bubble-arrow bubble-arrow-alt"></div>
        </div>
      </div>
    </>
  );
}

// Inline styles object specifically for the avatar image within this component.
const styles = {
  avatar: {
    width: "49px", // Sets the fixed width of the avatar.
    height: "49px", // Sets the fixed height of the avatar.
    borderRadius: "50%", // Makes the avatar circular.
    margin: "0 10px", // Adds horizontal margin (10px on left and right, 0px top and bottom) for spacing.
  },
};

// Export the RightChatBubble component as the default export.
export default RightChatBubble;
