// import "firebaseui/dist/firebaseui.css";
import React, { createContext } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import "firebase/database";
import firebaseConfig from "../configs/FirebaseConfig";
// const firebaseui = require("firebaseui");

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const FIREBASE = firebase;
export const FirebaseContext = createContext();
export const db = firebase.database();

const FirebaseProvider = ({ children }) => {
  const auth = firebase.auth();
  const database = firebase.database();
  const storage = firebase.storage();

  const payload = { database, auth, firebase, storage };
  return (
    <FirebaseContext.Provider value={payload}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.defaultProps = {};

FirebaseProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default FirebaseProvider;
