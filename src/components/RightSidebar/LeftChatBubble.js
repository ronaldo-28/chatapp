import React from "react";

/**
 * LeftChatBubble Component
 *
 * Represents a chat message bubble received from another user (displayed on the left side).
 * It shows the sender's avatar (optional, currently not using the passed image prop in the img tag),
 * the sender's name (optional, currently not using the passed name prop), the message text,
 * and the timestamp.
 *
 * @param {object} props - Component props.
 * @param {object} props.message - The message object containing text and timestamp.
 * @param {string} props.message.text - The content of the chat message.
 * @param {string} props.message.timestamp - The time the message was sent.
 * @param {string} props.name - The name of the sender (currently passed but not displayed).
 * @param {string} props.image - The URL or path to the sender's avatar image (currently passed but not used in the img src).
 */
function LeftChatBubble({ message, name, image }) {
  return (
    // Use a React Fragment to avoid adding an extra DOM element.
    <>
      {/*
       * Main container for the left-aligned message bubble.
       * ClassNames "message-bubble" and "mbl" (likely 'message bubble left') are used for styling.
       */}
      <div className="message-bubble mbl">
        {/*
         * Image tag for the sender's avatar.
         * NOTE: Currently, the 'src' attribute is hardcoded/missing or using a variable not shown.
         * It receives the 'image' prop but doesn't seem to use it directly here.
         * The 'style' prop applies inline styles for size and shape.
         */}
        <img src={image} style={styles.avatar} alt="sender-pic" />{" "}
        {/* Spacer */}
        {/* Container for the speech bubble itself (text and arrow). */}
        {/* ClassName "left-bubble" styles the bubble's appearance and alignment. */}
        <div className="left-bubble ">
          {/* Container for the message content. */}
          <div className="text-message">
            {/* Paragraph for the sender's name. */}
            {/* NOTE: Uses the 'name' prop passed to the component. */}
            <p className="name">{name}</p>
            {/* Paragraph for the actual message text. */}
            <p className="message">{message.text}</p>
            {/* Span to display the message timestamp. */}
            <span className="message-timestamp">{message.timestamp}</span>
          </div>
          {/* Div representing the triangular arrow/tail of the speech bubble. */}
          {/* ClassName "bubble-arrow" styles this element. */}
          <div className="bubble-arrow "></div>
        </div>
      </div>
    </>
  );
}

// Inline styles object specifically for the avatar image.
const styles = {
  avatar: {
    width: "49px", // Sets the width of the avatar image.
    height: "49px", // Sets the height of the avatar image.
    borderRadius: "50%", // Makes the avatar image circular.
    margin: "0 15px", // Adds horizontal margin around the avatar (likely spacing it from the bubble/edge).
  },
};

// Export the LeftChatBubble component as the default export.
export default LeftChatBubble;
