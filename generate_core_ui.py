import os

base_dir = r"c:\Users\ARJUN\.gemini\antigravity\scratch\cowry-carry-frontend\src"
lib_dir = os.path.join(base_dir, "lib")
app_dir = os.path.join(base_dir, "app")
components_dir = os.path.join(base_dir, "components")

os.makedirs(lib_dir, exist_ok=True)
os.makedirs(components_dir, exist_ok=True)

files = {
    os.path.join(lib_dir, "apiClient.ts"): """
export const API_BASE = 'http://localhost:8080/api';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', Bearer );
  }

  const res = await fetch(${API_BASE}, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API Request Failed');
  }

  return res.json();
}
""",
    os.path.join(lib_dir, "AuthContext.tsx"): """
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithAuth } from './apiClient';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchWithAuth('/users/me')
        .then(data => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    fetchWithAuth('/users/me').then(data => setUser(data));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
""",
    os.path.join(components_dir, "Navbar.tsx"): """
"use client";
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { Compass, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
              Cowry Carry
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <User className="h-4 w-4" /> Dashboard
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-400 flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
""",
    os.path.join(app_dir, "layout.tsx"): """
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cowry Carry - Cultural Storytelling",
  description: "Discover and share stories of cultural heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={${inter.className} bg-[#0a0a0a] text-white min-h-screen antialiased}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
"""
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\\n")

print("Generated core UI components and layout.")
