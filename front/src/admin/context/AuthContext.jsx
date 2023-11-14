// React Components
import { createContext } from "react";

// Hooks
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const { authenticated, login, logout } = useAuth()
    return <AuthContext.Provider value={{ authenticated, login, logout }}> {children} </AuthContext.Provider>
};

export { AuthContext, AuthProvider };