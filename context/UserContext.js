import { useState, createContext, useContext } from 'react';

const UserContext = createContext();
const SetUserContext = createContext();

// access the current user data stored in the UserContext
export function useUser() {
  // retrieve the context value
  return useContext(UserContext);
}

export function useSetUser() {
  return useContext(SetUserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
