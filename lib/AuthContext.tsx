"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

type AuthContextType = {
    user: User | null;
    loading: boolean;
};

const context = createContext<AuthContextType>({ user: null, loading: false });

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setuser] = useState<User | null>(null);
    const [loading, setloading] = useState<boolean>(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setuser(firebaseUser);
            setloading(false);
        });
        return unsubscribe;
    }, []);
    return (
        <context.Provider value={{ user: user, loading: loading }}>
            {children}
        </context.Provider>
    );
}

function useAuth() {
    return useContext(context);
}

export { AuthProvider, useAuth };
