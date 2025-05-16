import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the shape of the user profile
interface Profile {
  name: string;
  email: string;
  role: string;
}

// Define context value type
interface ProfileContextValue {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

// Create the context with a default value
const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

// Custom hook to use the ProfileContext
export const useProfile = (): ProfileContextValue => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

// Provider component
interface ProfileProviderProps {
  children: ReactNode;
}
export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  // Initialize profile state from localStorage or default values
  const [profile, setProfileState] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profile");
      if (saved) {
        try {
          return JSON.parse(saved) as Profile;
        } catch (e) {
          // ignore parse errors
        }
      }
    }
    // default profile if none saved
    return { name: "", email: "", role: "студент" };
  });

  // Wrap setProfileState to also persist to localStorage
  const setProfile = (newProfile: Profile) => {
    setProfileState(newProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem("profile", JSON.stringify(newProfile));
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
