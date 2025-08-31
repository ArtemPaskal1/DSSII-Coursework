import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                setUser({
                    username: decodedToken.name,
                    userId: decodedToken.nameid,
                });
            } else {
                logout();
            }
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        const decodedToken = parseJwt(newToken);
        setUser({
            username: decodedToken.name,
            userId: decodedToken.nameid,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
