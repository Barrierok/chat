import { useCallback, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const loginUser = useCallback((loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return { user, loginUser, logoutUser };
};

export default useAuth;
