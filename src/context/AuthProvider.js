import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const [auth, setAuth] = useState({ user: user, accessToken: accessToken });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;