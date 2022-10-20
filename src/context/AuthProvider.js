import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const user = sessionStorage.getItem('user');
    const accessToken = sessionStorage.getItem('accessToken');
    const [auth, setAuth] = useState({ user: user?.name, accessToken: accessToken });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;