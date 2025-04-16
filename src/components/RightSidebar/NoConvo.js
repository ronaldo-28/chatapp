import React from "react";
// Import component-specific styles
import "../stylesheets/rightSidebar.css";

/**
 * NoConvo Component
 *
 * A simple functional component that displays a welcome message or placeholder
 * when no conversation is currently selected or active in the chat interface.
 * It typically occupies the space where the `MessageBox` would normally be shown.
 */
function NoConvo() {
  // The component renders a container div with a heading inside.
  return (
    // Main container div.
    // The className "no-chat-background" likely applies background styling,
    // centering, or other visual treatments defined in the imported CSS file.
    <div className="no-chat-background">
      {/*
       * Heading element (h2) displaying the welcome message.
       * - style: Applies inline styles, specifically setting a margin of 5rem
       *          on all sides to position the text within its container.
       */}
      <h2 style={{ margin: "5rem" }}>Welcome to the Chat App !!!</h2>
    </div>
  );
}

// Export the NoConvo component as the default export,
// making it available for import and use in other parts of the application,
// typically in the main layout where the chat area is conditionally rendered.
export default NoConvo;
