import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user) {
            const userProfile = user.profile || [];
            localStorage.setItem("NAPCO-PROFILE-DASHBOARD", JSON.stringify(userProfile));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};