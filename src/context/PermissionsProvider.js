import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [permissions, setPermissions] = useState(() => {
    const savedPermissions = localStorage.getItem("permissions");
    return savedPermissions ? JSON.parse(savedPermissions) : [];
  });

  useEffect(() => {
    if (user) {
      const userPermissions = user.permissions || [];
      setPermissions(userPermissions);
      localStorage.setItem("permissions", JSON.stringify(userPermissions));
    }
  }, [user]);

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};

PermissionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
