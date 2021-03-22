import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from "../configs/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const auth = firebase.auth();
  const database = firebase.database();
  const storage = firebase.storage();
  const payload = { database, auth, storage };

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

export const useFirebaseContext = () => useContext(FirebaseContext);
