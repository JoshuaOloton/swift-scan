import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/config";
import { getData } from "../services/storage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadRoleFromStorage = async () => {
      if (!userRole) {
        const role = await getData("role");
        setUserRole(role);
      }
    };
    loadRoleFromStorage();
  }, [userRole]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <AppContext.Provider value={{ currentUser, userRole, setUserRole, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
