
import React, { useEffect, useState, useRef } from 'react';
import { Website } from '@/types/website';
import { addWebsite, getWebsites, removeWebsite, updateWebsite } from '@/services/websiteStorage';
import WebsiteCard from '@/components/WebsiteCard';
import AddWebsiteForm from '@/components/AddWebsiteForm';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Index: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  // Load websites from Supabase on component mount and on auth state changes
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setIsLoading(true);
      const list = await getWebsites();
      if (!ignore) {
        setWebsites(list);
        setIsLoading(false);
      }
    }

    fetchData();

    // Listen to auth changes and refetch (handles switching users)
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchData();
    });

    return () => {
      ignore = true;
      subscription?.unsubscribe();
    };
  }, []);

  const handleAddWebsite = async (name: string, url: string, iconUrl: string) => {
    const newWebsite = await addWebsite({ name, url, iconUrl });
    if (newWebsite) setWebsites(prev => [...prev, newWebsite]);
  };

  const handleRemoveWebsite = async (id: string) => {
    await removeWebsite(id);
    setWebsites(prev => prev.filter(website => website.id !== id));
  };

  const handleEditWebsite = async (id: string, name: string, url: string) => {
    await updateWebsite(id, { name, url });
    setWebsites(prev => prev.map(website => 
      website.id === id 
        ? { ...website, name, url }
        : website
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spot-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern bg-green-gradient">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-6">
              <Globe size={48} className="text-spot-primary mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">My Favorite Web Spots</h1>
              <p className="text-gray-600 max-w-xl mx-auto">Keep all your favorite websites in one place for easy access</p>
            </div>
            
            {websites.length > 0 && (
              <div className="mt-6">
                <AddWebsiteForm onAddWebsite={handleAddWebsite} />
              </div>
            )}
          </div>

          {websites.length === 0 ? (
            <EmptyState onAddClick={() => dialogTriggerRef.current?.click()} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {websites.map((website) => (
                <WebsiteCard
                  key={website.id}
                  website={website}
                  onRemove={handleRemoveWebsite}
                  onEdit={handleEditWebsite}
                />
              ))}
            </div>
          )}

          {websites.length === 0 && (
            <div className="hidden">
              <AddWebsiteForm
                onAddWebsite={handleAddWebsite}
                ref={dialogTriggerRef}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

