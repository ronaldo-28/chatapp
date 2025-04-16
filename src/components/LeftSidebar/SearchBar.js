import React from "react";

/**
 * SearchBar Component
 *
 * Renders an input field that allows users to search (presumably for contacts).
 * It takes an `onChange` handler function as a prop to notify the parent component
 * about changes in the input value.
 *
 * @param {object} props - Component props.
 * @param {function} props.searchChange - A callback function that is executed whenever
 *                                        the value of the input field changes. It typically
 *                                        receives the event object as an argument.
 */
function SearchBar({ searchChange }) {
  return (
    // Use a React Fragment to group elements without adding an extra node to the DOM.
    <>
      {/*
       * The input element for the search functionality.
       * - style: Applies inline styles defined in the 'styles' object below.
       * - className: Applies CSS classes (e.g., "mb-3" likely for margin-bottom from Bootstrap or similar).
       * - placeholder: Sets the placeholder text displayed when the input is empty.
       * - onChange: Attaches the 'searchChange' function passed via props. This function
       *             will be called every time the input's value changes (e.g., user types).
       */}
      <input
        style={styles.input} // Apply inline styles
        className="mb-3" // Apply CSS class for margin
        placeholder="search name" // Set placeholder text
        onChange={searchChange} // Set the event handler for value changes
      ></input>
    </>
  );
}

// Inline styles object for the search input element.
const styles = {
  input: {
    borderRadius: "18px", // Gives the input rounded corners.
    width: "100%", // Makes the input take the full width of its container.
    backgroundColor: "#fff", // Sets the background color to white.
    outline: "none", // Removes the default browser focus outline.
    margin: "auto", // Centers the input if its container allows (may depend on parent styles).
    padding: "5px", // Adds padding inside the input field.
    border: "1px solid #cccccc", // Sets a light grey border.
  },
};

// Export the SearchBar component as the default export,
// making it available for import in other parts of the application.
export default SearchBar;
