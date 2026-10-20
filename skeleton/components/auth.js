import React, { createContext, useContext, useState } from 'react';

// Deliberately in-memory demo state. No credentials are stored, sent or checked.
const Context = createContext(null);
export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <Context.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </Context.Provider>
  );
}
export function useAuth() {
  return useContext(Context);
}
