import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../data/tourismData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Inicializar usuario de prueba si no existe
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Verificar si el usuario de prueba ya existe
    const testUserExists = users.some(u => u.email === 'elsapalacios@gmail.com');

    if (!testUserExists) {
      const testUser: User = {
        id: 'test-user-1',
        name: 'Elsa Palacios',
        email: 'elsapalacios@gmail.com',
        password: '1234567P'
      };
      users.push(testUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const register = (name: string, email: string, password: string): boolean => {
    // Obtener usuarios existentes
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
      return false;
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    // Guardar en localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Login automático
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return true;
  };

  const login = (email: string, password: string): boolean => {
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
