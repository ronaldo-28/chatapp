import React from "react";

/**
 * NewConversation Component
 *
 * Renders a button-like element used to initiate the creation of a new conversation.
 * It displays text "New Conversation" alongside a plus icon. Clicking the icon
 * triggers a function passed down via props to show the relevant UI (e.g., a modal or a different tab).
 *
 * @param {object} props - Component props.
 * @param {function} props.showNewConvoTab - A function passed from the parent component.
 *                                           This function is expected to handle the logic
 *                                           for displaying the UI for starting a new conversation.
 *                                           It's called with `true` when the plus icon is clicked.
 */
function NewConversation(props) {
  /**
   * handleClick Function
   *
   * This function is executed when the plus icon span is clicked.
   * It calls the `showNewConvoTab` function received through props, passing `true`
   * as an argument to signal that the new conversation interface should be displayed.
   */
  let handleClick = () => {
    // Call the function passed via props to show the new conversation tab/modal.
    props.showNewConvoTab(true);
  };

  // Render the component's UI
  return (
    // Container div for the "New Conversation" element.
    // The className "new-convo" is likely used for styling (e.g., layout, background, padding).
    <div className="new-convo">
      {/* Text label for the button */}
      <p>New Conversation</p>
      {/*
       * Clickable span containing the plus icon.
       * - onClick: Attaches the handleClick function to be called when this span is clicked.
       */}
      <span onClick={handleClick}>
        {/* Icon element (using Font Awesome class names for a plus icon). */}
        <i className="fas fa-plus"></i>
      </span>
    </div>
  );
}

// Export the NewConversation component as the default export,
// making it available for use in other parts of the application.
export default NewConversation;
