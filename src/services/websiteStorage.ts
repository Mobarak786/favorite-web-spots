
import { Website } from "../types/website";

const STORAGE_KEY = "favorite-websites";

export const getWebsites = (): Website[] => {
  try {
    const websitesJson = localStorage.getItem(STORAGE_KEY);
    return websitesJson ? JSON.parse(websitesJson) : [];
  } catch (error) {
    console.error("Failed to get websites from localStorage:", error);
    return [];
  }
};

export const saveWebsites = (websites: Website[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
  } catch (error) {
    console.error("Failed to save websites to localStorage:", error);
  }
};

export const addWebsite = (website: Omit<Website, "id" | "createdAt">): Website => {
  const websites = getWebsites();
  
  const newWebsite: Website = {
    ...website,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
  
  saveWebsites([...websites, newWebsite]);
  return newWebsite;
};

export const removeWebsite = (id: string): void => {
  const websites = getWebsites();
  const updatedWebsites = websites.filter(website => website.id !== id);
  saveWebsites(updatedWebsites);
};

// Helper function to extract favicon from a URL
export const getFaviconUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=64`;
  } catch (error) {
    console.error("Failed to parse URL for favicon:", error);
    return "https://www.google.com/s2/favicons?domain=example.com&sz=64";
  }
};
