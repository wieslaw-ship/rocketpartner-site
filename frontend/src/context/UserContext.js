import React, { createContext, useEffect, useState, useCallback } from "react";

let logoutTimer;

export const UserContext = createContext({
  token: "",
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

const retrieveStoredToken = () => {
  const userToken = localStorage.getItem("RocketPartnerToken");
  const storedExpirationDate = localStorage.getItem(
    "ExpirationTimeRocketPartner"
  );

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("RocketPartnerToken");
    localStorage.removeItem("ExpirationTimeRocketPartner");
    return null;
  }

  return {
    token: userToken,
    duration: remainingTime,
  };
};

export const getBoolStorage = (item) => {
  return localStorage.getItem(item) === "true";
};

export const UserProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("RocketPartnerToken");
    localStorage.removeItem("ExpirationTimeRocketPartner");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("RocketPartnerToken", token);
    localStorage.setItem("ExpirationTimeRocketPartner", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
