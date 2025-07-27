import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) setUserId(storedId);
  }, []);

  const login = (id) => {
    localStorage.setItem('userId', id);
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
