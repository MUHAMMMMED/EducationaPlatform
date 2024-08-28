
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  

  const setUser = (id, type) => {
    setUserId(id);
    setUserType(type);
  };
 


  return (
    <UserContext.Provider value={{ userId, userType, setUser }}>
           

      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
