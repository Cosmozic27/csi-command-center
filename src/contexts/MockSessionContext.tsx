'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '@/types/entities';
import { MOCK_USERS } from '@/data/mock-users';

interface MockSessionContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUserById: (userId: string) => void;
  allUsers: User[];
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isCoreOrFaculty: boolean;
  isDevMode: boolean;
}

const MockSessionContext = createContext<MockSessionContextType | undefined>(undefined);

const STORAGE_KEY = 'csi_command_center_mock_user_id';

export function MockSessionProvider({ children }: { children: React.ReactNode }) {
  // Default user is Arjun Mehta (CORE)
  const defaultUser = MOCK_USERS.find((u) => u.primaryRole === 'CORE') || MOCK_USERS[0];
  const [currentUser, setCurrentUserState] = useState<User>(defaultUser);

  useEffect(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const found = MOCK_USERS.find((u) => u.id === savedId);
        if (found) {
          setCurrentUserState(found);
        }
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
    try {
      localStorage.setItem(STORAGE_KEY, user.id);
    } catch {
      // Ignore
    }
  };

  const switchUserById = (userId: string) => {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return (currentUser.role || currentUser.primaryRole) === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    const currentRole = currentUser.role || currentUser.primaryRole;
    return roles.includes(currentRole);
  };

  const isCoreOrFaculty =
    (currentUser.role || currentUser.primaryRole) === 'CORE' ||
    (currentUser.role || currentUser.primaryRole) === 'FACULTY';
  const isDevMode = process.env.NODE_ENV === 'development';

  return (
    <MockSessionContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserById,
        allUsers: MOCK_USERS,
        hasRole,
        hasAnyRole,
        isCoreOrFaculty,
        isDevMode,
      }}
    >
      {children}
    </MockSessionContext.Provider>
  );
}

export function useMockSession() {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error('useMockSession must be used within a MockSessionProvider');
  }
  return context;
}
