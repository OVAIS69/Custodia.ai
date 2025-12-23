'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'Software Engineer' | 'Data Analyst' | null;

interface User {
    name: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (role: UserRole) => {
        let newUser: User | null = null;

        if (role === 'Software Engineer') {
            newUser = {
                name: 'Alex Dev',
                role: 'Software Engineer',
                avatar: 'SE' // Placeholder for UI logic
            };
        } else if (role === 'Data Analyst') {
            newUser = {
                name: 'Jordan Data',
                role: 'Data Analyst',
                avatar: 'DA'
            };
        }

        if (newUser) {
            setUser(newUser);
            localStorage.setItem('user_session', JSON.stringify(newUser));
            router.push('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_session');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
