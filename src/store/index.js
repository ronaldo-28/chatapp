// src/store/index.js

import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; // For debugging Redux state changes
import thunk from "redux-thunk"; // For handling asynchronous actions (like Firestore calls)
import rootreducer from "../reducers"; // Your combined root reducer

let store; // Optional module-level variable

/**
 * Configure Store Function
 *
 * Creates and configures the Redux store for the application.
 * Includes middleware like thunk (for async actions) and logger (for debugging).
 *
 * @returns {object} The configured Redux store instance.
 */
export function configureStore() {
  // Create the Redux store using the root reducer and middleware
  store = createStore(
    rootreducer,
    applyMiddleware(thunk, logger) // Apply necessary middleware
  );

  // Return the created store instance
  return store;
}
