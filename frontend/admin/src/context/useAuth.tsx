import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import {useLocation} from "react-router-dom";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

interface User {
    email: string;
    id: number;
}

interface AuthContextType {
    user?: User;
    error?: any;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children}: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();

    function login(email: string, password: string) {

    }

    function logout() {

    }

    const memoValue = useMemo(
        () => ({
            user,
            error,
            loading,
            login,
            logout
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoValue}>
            {children}
        </AuthContext.Provider>
    )
}