"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MockDatabase, User } from "@/lib/mockDatabase";

interface AppContextType {
  user: User | null;
  darkMode: boolean;
  bookmarks: string[];
  visited: string[];
  toggleDarkMode: () => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  refreshBookmarks: () => void;
  refreshVisited: () => void;
  toggleBookmark: (placeId: string) => boolean;
  toggleVisited: (placeId: string) => boolean;
  triggerRefresh: () => void;
  refreshCounter: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Initialize DB and load user
  useEffect(() => {
    MockDatabase.init();
    const currentUser = MockDatabase.getCurrentUser();
    setUser(currentUser);

    // Dark Mode check
    const savedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDark);
    if (savedDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (currentUser) {
      setBookmarks(MockDatabase.getBookmarks(currentUser.id).map((b) => b.placeId));
      setVisited(MockDatabase.getVisited(currentUser.id).map((v) => v.placeId));
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem("darkMode", String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const login = (email: string, name: string) => {
    const loggedInUser = MockDatabase.loginUser(email, name);
    setUser(loggedInUser);
    setBookmarks(MockDatabase.getBookmarks(loggedInUser.id).map((b) => b.placeId));
    setVisited(MockDatabase.getVisited(loggedInUser.id).map((v) => v.placeId));
  };

  const logout = () => {
    MockDatabase.logout();
    setUser(null);
    setBookmarks([]);
    setVisited([]);
  };

  const refreshBookmarks = () => {
    if (user) {
      setBookmarks(MockDatabase.getBookmarks(user.id).map((b) => b.placeId));
    }
  };

  const refreshVisited = () => {
    if (user) {
      setVisited(MockDatabase.getVisited(user.id).map((v) => v.placeId));
    }
  };

  const toggleBookmark = (placeId: string): boolean => {
    if (!user) {
      // Prompt user to login in real app
      login("traveler@hiddenindia.com", "Guest Traveler");
      return false;
    }
    const added = MockDatabase.toggleBookmark(user.id, placeId);
    refreshBookmarks();
    return added;
  };

  const toggleVisited = (placeId: string): boolean => {
    if (!user) {
      login("traveler@hiddenindia.com", "Guest Traveler");
      return false;
    }
    const added = MockDatabase.toggleVisited(user.id, placeId);
    refreshVisited();
    return added;
  };

  const triggerRefresh = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        darkMode,
        bookmarks,
        visited,
        toggleDarkMode,
        login,
        logout,
        refreshBookmarks,
        refreshVisited,
        toggleBookmark,
        toggleVisited,
        triggerRefresh,
        refreshCounter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
