import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "./FirebaseContext";
import { ConfigContext } from "./ConfigContext";

import { Alert } from "react-native";
import { Storage } from "../../utils";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const { auth, database } = useContext(FirebaseContext);
  const { setCurrentLocation, appLocations, setReferenceLocations } =
    useContext(ConfigContext);

  const [userCategory, setUserCategory] = useState();

  const [userBranch, setUserBranch] = useState();

  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState("");

  const fetchUserLocation = () => {
    if (loggedUser != null && loggedUser?.location_key) {
      const newArray = appLocations.filter((item) => {
        return item.key === loggedUser?.location_key;
      });
      if (newArray.length > 0) {
        setCurrentLocation(newArray[0]);
        updateRefLocation(newArray[0]);
      }
    }
  };

  const updateRefLocation = (data) => {
    if (data.reference_location) {
      var locationData = Object.values(data.reference_location);
      setReferenceLocations(locationData);
    }
  };

  const customerAuth = (credential) => {
    return new Promise(async (resolve, reject) => {
      await auth
        .signInWithCredential(credential)
        .then(async (data) => {
          const isNewUser = data.additionalUserInfo.isNewUser;
          const isPhone = data.additionalUserInfo.providerId == "phone";
          const user = data.user.providerData[0];
          // Location fetching for user
          const userLocation = fetchUserLocation(user?.location_key);
          if (userLocation != null && setCurrentLocation == null) {
            setCurrentLocation(userLocation);
          }
          if (isNewUser) {
            const newProfile = {
              displayName: isPhone ? user.phoneNumber : user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              uid: user.uid,
              phoneNumber: 0 + user.phoneNumber.slice(3),
              role: "customer",
            };
            await createCustomerProfile(newProfile)
              .then(() => {
                Storage.save("profile", newProfile);
                setLoggedUser(newProfile);
                resolve();
              })
              .catch((error) => reject(error));
          } else {
            await getCustomerProfile()
              .then(() => {
                resolve();
              })
              .catch((error) =>
                Alert.alert("Sorry something went wrong", error.message)
              );
          }
        })
        .catch((error) => {
          Alert.alert("Sorry something went wrong", error.message);
          reject(error);
        });
    });
  };

  const createCustomerProfile = async (newProfile) => {
    new Promise(async (resolve, reject) => {
      await database
        .ref(`profiles/${newProfile.uid}`)
        .update(newProfile)
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  };

  const getCustomerProfile = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const dbRef = database
            .ref("profiles")
            .orderByChild("uid")
            .equalTo(user.providerData[0].uid);
          dbRef
            .once("value")
            .then((snapshot) => {
              const profile = snapshot.val();

              const isCust = Object.entries(profile)
                .map((key) => {
                  if (key[1].role === "customer") {
                    return key[1];
                  }
                })
                .flat();
              const newCustomer = new Object(isCust.filter((e) => e));
              const userLocation = fetchUserLocation(
                newCustomer[0].location_key
              );

              if (userLocation != null) {
                setCurrentLocation(userLocation);
              }

              Storage.save("profile", newCustomer[0]);
              setLoggedUser(newCustomer[0]);
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  };

  const editCustomerProfile = (data) => {
    return new Promise((resolve, reject) => {
      database
        .ref(`profiles/${loggedUser.uid}`)
        .update(data)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  const verifyPhoneNumber = (field, data) => {
    return new Promise((resolve, reject) => {
      if (field == "phoneNumber") {
        let numberExists = false;
        database
          .ref("profiles")
          .orderByChild("phoneNumber")
          .once("value", async (snapshot) => {
            if (snapshot.val()) {
              const storeObject = await snapshot.val();
              let phoneArray = Object.entries(storeObject).map((item) => {
                item[1].key = item[0];
                return item[1];
              });
              phoneArray.map((item) => {
                if (item.phoneNumber == data) {
                  numberExists = true;
                  reject("This number is already registered!");
                }
              });
            }
            if (numberExists == false) {
              resolve();
            }
          });
      }
    });
  };

  const saveCustomerOrder = (data) => {
    database
      .ref(`profiles/${loggedUser.uid}`)
      .update({ orders: data })
      .catch((err) => Alert.alert("Sorry something went wrong", error.message));
  };

  const initAuth = async () => {
    const getProfileData = await Storage.get("profile");
    const getToken = await Storage.getToken("token");
    if (getProfileData && getToken) {
      setLoggedUser(getProfileData);
      setToken(getToken);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    fetchUserLocation();
  }, [loggedUser]);

  const payload = {
    userCategory,
    setUserCategory,

    userBranch,

    getCustomerProfile,
    auth,

    customerAuth,
    initAuth,
    loggedUser,
    setLoggedUser,
    token,
    setToken,
    editCustomerProfile,
    verifyPhoneNumber,

    saveCustomerOrder,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

AuthProvider.defaultProps = {};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default React.memo(AuthProvider);
