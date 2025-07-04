import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Context provider component
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}