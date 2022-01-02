import React, { useContext, useEffect, useState } from 'react';
import { login } from '../utils/user';

const UserContext = React.createContext(null);
const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await login();
      setUser(userData);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
