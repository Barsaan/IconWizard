'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Icon {
  id: string;
  url: string;
  appName: string;
  description: string;
  timestamp: string;
}

interface IconsContextType {
  icons: Icon[];
  addIcon: (icon: Icon) => void;
  removeIcon: (id: string) => void;
}

const IconsContext = createContext<IconsContextType | undefined>(undefined);

export function IconsProvider({ children }: { children: React.ReactNode }) {
  const [icons, setIcons] = useState<Icon[]>([]);

  const addIcon = (icon: Icon) => {
    setIcons(prev => [...prev, icon]);
  };

  const removeIcon = (id: string) => {
    setIcons(prev => prev.filter(icon => icon.id !== id));
  };

  useEffect(() => {
    // Load icons from localStorage
    const savedIcons = localStorage.getItem('generatedIcons');
    if (savedIcons) {
      try {
        const parsedIcons = JSON.parse(savedIcons);
        // Migrate old icon formats if necessary
        const migratedIcons = parsedIcons.map((icon: any) => ({
          id: icon.id || Date.now().toString(),
          url: icon.url || icon.imageURL,
          appName: icon.appName || icon.description || 'Unnamed Icon',
          description: icon.description || icon.prompt || 'No description',
          timestamp: icon.timestamp || icon.createdAt || new Date().toISOString()
        }));
        setIcons(migratedIcons);
      } catch (error) {
        console.error('Failed to parse saved icons', error);
        setIcons([]);
      }
    }
  }, []);

  useEffect(() => {
    // Save icons to localStorage
    localStorage.setItem('generatedIcons', JSON.stringify(icons));
  }, [icons]);

  return (
    <IconsContext.Provider value={{ icons, addIcon, removeIcon }}>
      {children}
    </IconsContext.Provider>
  );
}

export function useIcons() {
  const context = useContext(IconsContext);
  if (context === undefined) {
    throw new Error('useIcons must be used within an IconsProvider');
  }
  return context;
}

export type { Icon };
