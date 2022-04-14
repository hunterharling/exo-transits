import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Heading
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";

const OnlineStatusContext = React.createContext(true);

export const OnlineStatusProvider = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => {
  return useContext(OnlineStatusContext);
};

export const OnlineStatusWrapper = ({ children }) => {
  const isOnline = useOnlineStatus();

  return (
    <>
      {isOnline ?
        children
        :
        <Box
          marginTop="150px"
          textAlign="center">
          <FontAwesomeIcon icon={faBroadcastTower} style={{fontSize: "45px"}}/> <br/>
          <Heading
            fontSize="18px"
            fontWeight="200"
            textAlign="center">
            
            You've gone offline...
          </Heading>
        </Box>
      }
    </>
  );
}
