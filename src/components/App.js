// src/components/App.js

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

// Import Firebase db instance and Firestore functions
import { db } from "../firebase"; // Adjust path if needed
import { doc, getDoc, setDoc } from "firebase/firestore";

// Import Redux actions
import { updateContacts } from "../actions/contact";
import { setTheme } from "../actions/theme"; // Action to set theme from Firestore
import { setUserProfile } from "../actions/user"; // Action to set user profile

// Import mock data ONLY as fallback/initial seed
import { data as mockData } from "../Data/users";

// Import stylesheets
import "./stylesheets/App.css";
import "./stylesheets/leftSidebar.css";
import "./stylesheets/rightSidebar.css"; // Make sure right sidebar styles are imported

// Import Components
import SearchBar from "./LeftSidebar/SearchBar";
import ContactList from "./LeftSidebar/ContactList";
import ConversationList from "./RightSidebar/ConversationList";
import NoConvo from "./RightSidebar/NoConvo";
import ProfileHeader from "./LeftSidebar/ProfileHeader";
import NewConversation from "./LeftSidebar/NewConversation";
import NewConversationTab from "./LeftSidebar/NewConversationTab";
import ThemeToggle from "./ThemeToggle"; // Theme toggle button

// --- Define the User ID to load/seed ---
// --- In a real app, this would come from authentication ---
const USER_ID = mockData.profile.id.toString(); // Using '1' from mock data

function App() {
  // Local component state
  const [searchfield, setSearchField] = useState("");
  const [newConvoTab, showNewConvoTab] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  // Selectors to get data from the Redux store
  const user = useSelector((state) => state.user); // Logged-in user profile
  const stateContacts = useSelector((state) => state.contacts.contacts); // Contacts list
  const currentTheme = useSelector((state) => state.theme.currentTheme); // Current theme

  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // --- Function to seed initial data if user doesn't exist in Firestore ---
  // Wrapped in useCallback to prevent re-creation on every render
  const seedInitialData = useCallback(async () => {
    console.log(
      `Attempting to seed initial data to Firestore for user: ${USER_ID}`
    );
    const userDocRef = doc(db, "users", USER_ID);
    try {
      // Use the corrected mockData (with hardcoded image)
      const initialUserData = {
        id: mockData.profile.id,
        name: mockData.profile.name,
        image: mockData.profile.image,
        // Ensure contacts and chatlogs are valid arrays
        contacts: Array.isArray(mockData.profile.contacts)
          ? mockData.profile.contacts.map((contact) => ({
              ...contact,
              chatlog: Array.isArray(contact.chatlog) ? contact.chatlog : [],
            }))
          : [],
        theme: "light", // Default theme for seeded data
      };
      // setDoc creates the document or overwrites it completely
      await setDoc(userDocRef, initialUserData);
      console.log(`Initial data seeded successfully for user: ${USER_ID}.`);
      return initialUserData; // Return the seeded data
    } catch (error) {
      console.error(
        `Error seeding initial Firestore data for user ${USER_ID}:`,
        error
      );
      return null; // Return null on error
    }
  }, []); // Empty dependency array as it uses constants/imports

  // --- Effect to Fetch initial state from Firestore on component mount ---
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading true at the start
      const userDocRef = doc(db, "users", USER_ID); // Reference the user's document

      console.log(`Fetching data for user: ${USER_ID} from Firestore...`);

      try {
        const docSnap = await getDoc(userDocRef); // Attempt to get the document
        let userDataToDispatch = null;

        if (docSnap.exists()) {
          // Check if the document exists
          const firestoreData = docSnap.data();
          // Basic validation: check if essential fields exist
          if (
            firestoreData &&
            firestoreData.name &&
            firestoreData.id &&
            firestoreData.contacts !== undefined
          ) {
            console.log(
              `User data found in Firestore for user: ${USER_ID}. Loading...`
            );
            userDataToDispatch = firestoreData;
          } else {
            // Document exists but seems incomplete or corrupted
            console.warn(
              `Firestore document for user ${USER_ID} exists but is incomplete/invalid. Re-seeding...`
            );
            userDataToDispatch = await seedInitialData(); // Attempt to re-seed
          }
        } else {
          // Document does not exist, seed it for the first time
          console.log(
            `No user data found in Firestore for ID: ${USER_ID}. Seeding initial data...`
          );
          userDataToDispatch = await seedInitialData();
        }

        // If we have data (either loaded or seeded), dispatch actions to update Redux
        if (userDataToDispatch) {
          console.log(`Dispatching data to Redux store for user: ${USER_ID}`);
          dispatch(
            setUserProfile({
              id: userDataToDispatch.id || USER_ID, // Use fetched/seeded ID
              name: userDataToDispatch.name || "Default Name",
              image: userDataToDispatch.image || "", // Use fetched/seeded image
            })
          );
          // Ensure contacts is always dispatched as an array
          dispatch(
            updateContacts(
              Array.isArray(userDataToDispatch.contacts)
                ? userDataToDispatch.contacts
                : []
            )
          );
          dispatch(setTheme(userDataToDispatch.theme || "light")); // Set theme, default to light
        } else {
          // Handle case where both fetch and seed failed
          console.error(
            `Failed to load or seed user data for user: ${USER_ID}. Critical error.`
          );
          // Dispatch default/empty state or show an error message
          dispatch(
            setUserProfile({
              id: USER_ID,
              name: "Error Loading User",
              image: "",
            })
          );
          dispatch(updateContacts([]));
          dispatch(setTheme("light"));
        }
      } catch (error) {
        // Handle errors during the Firestore getDoc operation
        console.error(
          `Error fetching user data from Firestore for user ${USER_ID}:`,
          error
        );
        console.log(
          "Falling back to default empty state due to Firestore fetch error."
        );
        dispatch(
          setUserProfile({ id: USER_ID, name: "Error Loading User", image: "" })
        );
        dispatch(updateContacts([]));
        dispatch(setTheme("light"));
      } finally {
        // Ensure loading is set to false regardless of success or failure
        setIsLoading(false);
        console.log(
          `Finished loading attempt for user: ${USER_ID}. Loading state: ${false}`
        );
      }
    };

    fetchUserData(); // Call the fetch function

    // Empty dependency array ensures this effect runs only once on component mount
  }, [dispatch, seedInitialData]); // Include dispatch and seedInitialData

  // --- Effect to Apply theme class to the body when theme changes in Redux ---
  useEffect(() => {
    // Clear previous theme classes
    document.body.classList.remove("dark-theme", "light-theme");
    // Add the current theme class if it's defined
    if (currentTheme) {
      document.body.classList.add(
        currentTheme === "dark" ? "dark-theme" : "light-theme"
      );
    }
    // Re-run only when currentTheme changes
  }, [currentTheme]);

  // --- Search input change handler ---
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  // --- Filter contacts based on search field ---
  // Uses the contacts array from the Redux state (`stateContacts`)
  const filteredContacts = stateContacts.filter((contact) => {
    if (!contact || !contact.name) return false; // Safety check for valid contact object
    // Case-insensitive search
    return contact.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  // --- Conditional Rendering for Loading State ---
  if (isLoading) {
    // Display a simple loading message or a spinner component
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
        Loading Chat Data...
      </div>
    );
  }

  // --- Main Render ---
  return (
    <>
      {/* Fixed position container for the theme toggle button */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      {/* Main application layout using react-bootstrap */}
      <Container fluid>
        <Row>
          {/* Left Sidebar */}
          <Col className="left-sidebar" xs={6} sm={5} md={4} lg={5} xl={4}>
            {/* Header Row */}
            <Row className="left-sidebar-header">
              <Row className="d-flex align-items-center justify-content-between px-2">
                <Col xs="auto">
                  {/* Render profile header only if user data is loaded */}
                  {user && user.id && <ProfileHeader user={user} />}
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  {/* Button to open the new conversation tab */}
                  <NewConversation showNewConvoTab={showNewConvoTab} />
                </Col>
              </Row>
              {/* Search Bar Row */}
              <Row
                style={{
                  margin: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                className="px-3"
              >
                <SearchBar searchChange={onSearchChange} />
              </Row>
            </Row>
            {/* Contact List Row */}
            <Row>
              {/* Pass the filtered contacts list */}
              <ContactList contacts={filteredContacts} />
            </Row>
          </Col>

          {/* Right Sidebar */}
          <Col className="right-sidebar" xs={6} sm={7} md={8} lg={7} xl={8}>
            {/* Routing for displaying conversations or the placeholder */}
            <Switch>
              {/* Route for individual conversations, passing required props */}
              <Route
                path="/conversations/:id"
                render={(routeProps) => (
                  // Pass route props and the full contacts list from Redux state
                  <ConversationList {...routeProps} contacts={stateContacts} />
                )}
              />
              {/* Default route when no conversation is selected */}
              <Route component={NoConvo} />
            </Switch>
            {/* Conditionally render the New Conversation Tab overlay */}
            {newConvoTab && (
              <NewConversationTab
                contacts={stateContacts} // Pass full contacts list from Redux state
                showNewConvoTab={showNewConvoTab} // Pass function to close the tab
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
