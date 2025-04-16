import React from "react";
// Import the child component used to display individual contact information.
import ContactTab from "./ContactTab";

/**
 * NewConversationTab Component
 *
 * Renders an overlay or tab that allows the user to select a contact
 * to start a new conversation with. It displays a list of available contacts
 * using the `ContactTab` component and provides a close button.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.contacts - An array of contact objects to be displayed for selection.
 * @param {function} props.showNewConvoTab - A function (likely a state setter from the parent)
 *                                           used to control the visibility of this tab.
 *                                           It's called with `false` to hide the tab.
 */
function NewConversationTab({ contacts, showNewConvoTab }) {
  /**
   * handleClose Function
   *
   * This function is executed when the close icon is clicked or when the list area is clicked.
   * It calls the `showNewConvoTab` function received through props, passing `false`
   * as an argument to signal that this tab should be hidden.
   */
  let handleClose = () => {
    // Call the function passed via props to hide this component.
    showNewConvoTab(false);
  };

  // Render the component's UI
  return (
    <>
      {/* Main container div for the new conversation selection tab/overlay. */}
      {/* The className "new-convo-tab" is likely used for styling (e.g., positioning, background, dimensions). */}
      <div className="new-convo-tab">
        {/* Header section of the tab. */}
        {/* The className "nct-header" probably styles the header layout (e.g., flexbox, padding). */}
        <div className="nct-header">
          {/* Title text for the tab */}
          <p>Select Contact</p>
          {/*
           * Clickable span containing the close icon.
           * - onClick: Attaches the handleClose function to be called when this span is clicked.
           */}
          <span onClick={handleClose}>
            {/* Icon element (using Font Awesome class names for a circled 'x' icon). */}
            <i className="fas fa-2x fa-times-circle"></i>
          </span>
        </div>
        {/*
         * Container for the list of contacts.
         * - className "nct-list" likely styles the list area (e.g., scrolling, padding).
         * - onClick: Attaches handleClose here as well. Clicking anywhere within the list area
         *   (including the space between contacts) will close the tab. This is often intended
         *   behavior after a contact is selected via the Link within ContactTab.
         */}
        <div className="nct-list" onClick={handleClose}>
          {
            /*
             * Map over the 'contacts' array passed via props.
             * For each 'contact' object in the array:
             * - Render a 'ContactTab' component.
             * - Pass the entire 'contact' object as a prop to 'ContactTab'.
             * - Assign a unique 'key' prop (using the index) for React's list rendering optimization.
             */
            contacts.map((contact, index) => (
              <ContactTab contact={contact} key={index} />
            ))
          }
        </div>
      </div>
    </>
  );
}

// Export the NewConversationTab component as the default export,
// making it available for import and use in other parts of the application.
export default NewConversationTab;
