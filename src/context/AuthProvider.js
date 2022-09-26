import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [auth, setAuth] = useState({ user: user?.name, accessToken: user?.accessToken });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;