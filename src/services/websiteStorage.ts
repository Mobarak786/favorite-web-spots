
import { Website } from "../types/website";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Fetch all websites for the logged-in user
export const getWebsites = async (): Promise<Website[]> => {
  try {
    const { data, error } = await supabase
      .from("websites")
      .select("id, name, url, icon_url, created_at, description, is_favorite")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch websites from Supabase:", error);
      if (error.message.includes("JWT")) {
        toast.error("Session expired. Please log in again.");
      }
      return [];
    }

    // Map DB fields to Website interface
    return (
      data?.map((w) => ({
        id: w.id,
        name: w.name,
        url: w.url,
        iconUrl: w.icon_url,
        createdAt: new Date(w.created_at).getTime(),
        description: w.description || undefined,
        isFavorite: w.is_favorite,
      })) ?? []
    );
  } catch (error) {
    console.error("Error fetching websites:", error);
    return [];
  }
};

// Update the Website type to include new fields
export const addWebsite = async (
  website: Omit<Website, "id" | "createdAt" | "isFavorite">
): Promise<Website | undefined> => {
  try {
    // Get current user from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if we have a guest user in localStorage
    const guestUserStr = localStorage.getItem('guest_user');
    const isGuest = !!guestUserStr;
    
    if (!user && !isGuest) {
      toast.error("You need to be logged in to add websites.");
      return undefined;
    }

    // For guest users, store websites in localStorage instead of Supabase
    if (isGuest) {
      // Get existing guest websites or initialize array
      const guestWebsitesStr = localStorage.getItem('guest_websites') || '[]';
      const guestWebsites: Website[] = JSON.parse(guestWebsitesStr);
      
      // Create new website with local ID
      const newWebsite: Website = {
        id: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: website.name,
        url: website.url,
        iconUrl: website.iconUrl,
        description: website.description,
        isFavorite: false,
        createdAt: Date.now(),
      };
      
      // Add to local storage
      guestWebsites.push(newWebsite);
      localStorage.setItem('guest_websites', JSON.stringify(guestWebsites));
      
      return newWebsite;
    }

    // For authenticated users, store in Supabase
    const { data, error } = await supabase
      .from("websites")
      .insert({
        user_id: user!.id,
        name: website.name,
        url: website.url,
        icon_url: website.iconUrl,
        description: website.description,
        is_favorite: false
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add website to Supabase:", error);
      toast.error("Failed to add website. Please try again.");
      return undefined;
    }

    return {
      id: data.id,
      name: data.name,
      url: data.url,
      iconUrl: data.icon_url,
      description: data.description,
      isFavorite: data.is_favorite,
      createdAt: new Date(data.created_at).getTime(),
    };
  } catch (error) {
    console.error("Error adding website:", error);
    return undefined;
  }
};

export const removeWebsite = async (id: string): Promise<void> => {
  try {
    // Check if we have a guest user
    const guestUserStr = localStorage.getItem('guest_user');
    const isGuest = !!guestUserStr;
    
    if (isGuest) {
      // Handle removal from localStorage for guest users
      const guestWebsitesStr = localStorage.getItem('guest_websites') || '[]';
      const guestWebsites: Website[] = JSON.parse(guestWebsitesStr);
      const updatedWebsites = guestWebsites.filter(website => website.id !== id);
      localStorage.setItem('guest_websites', JSON.stringify(updatedWebsites));
      return;
    }
    
    // For authenticated users, remove from Supabase
    const { error } = await supabase
      .from("websites")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete website from Supabase:", error);
      toast.error("Failed to delete website. Please try again.");
    }
  } catch (error) {
    console.error("Error removing website:", error);
  }
};

export const updateWebsite = async (
  id: string,
  updates: Partial<Pick<Website, "name" | "url" | "description" | "isFavorite">>
): Promise<void> => {
  try {
    // Check if we have a guest user
    const guestUserStr = localStorage.getItem('guest_user');
    const isGuest = !!guestUserStr;
    
    if (isGuest) {
      // Handle updates in localStorage for guest users
      const guestWebsitesStr = localStorage.getItem('guest_websites') || '[]';
      const guestWebsites: Website[] = JSON.parse(guestWebsitesStr);
      
      const updatedWebsites = guestWebsites.map(website => {
        if (website.id === id) {
          return { 
            ...website, 
            ...updates,
          };
        }
        return website;
      });
      
      localStorage.setItem('guest_websites', JSON.stringify(updatedWebsites));
      return;
    }
    
    // For authenticated users, update in Supabase
    const patch: any = {};
    if ("name" in updates) patch.name = updates.name;
    if ("url" in updates) patch.url = updates.url;
    if ("description" in updates) patch.description = updates.description;
    if ("isFavorite" in updates) patch.is_favorite = updates.isFavorite;

    if (Object.keys(patch).length === 0) return;

    const { error } = await supabase
      .from("websites")
      .update(patch)
      .eq("id", id);

    if (error) {
      console.error("Failed to update website in Supabase:", error);
      toast.error("Failed to update website. Please try again.");
    }
  } catch (error) {
    console.error("Error updating website:", error);
  }
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
