import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Events } from "../../../domain/model/Events";
import { RSPV_STORAGE_KEY } from "../../../core/utils/AppConstants";


export interface RSVPContextType {
  events: Events[];
  isRSVP: (eventId: string | number) => boolean;
  addRSVP: (event: Events) => Promise<void>;
  removeRSVP: (eventId: string | number) => Promise<void>;
  toggleRSVP: (event: Events) => Promise<void>;
  isLoading: boolean;
}

export const RSVPContext = createContext<RSVPContextType | undefined>(
  undefined
);

export function RSVPContextProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadRSVPs();
  }, []);

  const loadRSVPs = async () => {
    try {
      const stored = await AsyncStorage.getItem(RSPV_STORAGE_KEY);
      if (stored) {
        setEvents(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading RSVPs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRSVPs = async (items: Events[]) => {
    try {
      await AsyncStorage.setItem(RSPV_STORAGE_KEY, JSON.stringify(items));
      setEvents(items);
    } catch (error) {
      console.error("Error saving RSVPs:", error);
    }
  };

  const isRSVP = (eventId: string | number): boolean => {
    return events.some((fav) => fav.id.toString() === eventId.toString());
  };

  const addRSVP = async (event: Events) => {
    if (!isRSVP(event.id)) {
      const updated = [...events, event];
      await saveRSVPs(updated);
    }
  };

  const removeRSVP = async (eventId: string | number) => {
    const updated = events.filter(
      (fav) => fav.id.toString() !== eventId.toString()
    );
    await saveRSVPs(updated);
  };

  const toggleRSVP = async (event: Events) => {
    if (isRSVP(event.id)) {
      await removeRSVP(event.id);
    } else {
      await addRSVP(event);
    }
  };

  const value: RSVPContextType = {
    events,
    isRSVP,
    addRSVP,
    removeRSVP,
    toggleRSVP,
    isLoading,
  };

  return (
    <RSVPContext.Provider value={value}>
      {children}
    </RSVPContext.Provider>
  );
}

