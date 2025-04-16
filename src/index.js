// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Global styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import App from "./components/App"; // Main application component
import { Provider } from "react-redux"; // Makes Redux store available
import { HashRouter as Router } from "react-router-dom"; // Routing component

// Import the function to configure the Redux store
import { configureStore } from "./store";

// Create the Redux store instance
const store = configureStore(); // Get the configured store

// Render the application to the DOM
ReactDOM.render(
  <React.StrictMode>
    {/* Make the Redux store available to the entire component tree */}
    <Provider store={store}>
      {/* Enable routing within the application */}
      <Router>
        {/* Render the main App component */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  // Mount the application in the HTML element with the ID 'root'
  document.getElementById("root")
);
