import React, { useEffect, useState, useRef } from 'react';
import { Website } from '@/types/website';
import { addWebsite, getWebsites, removeWebsite } from '@/services/websiteStorage';
import WebsiteCard from '@/components/WebsiteCard';
import AddWebsiteForm from '@/components/AddWebsiteForm';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe } from 'lucide-react';

const Index: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  // Load websites from localStorage on component mount
  useEffect(() => {
    const storedWebsites = getWebsites();
    setWebsites(storedWebsites);
    setIsLoading(false);
  }, []);

  const handleAddWebsite = (name: string, url: string, iconUrl: string) => {
    const newWebsite = addWebsite({ name, url, iconUrl });
    setWebsites(prev => [...prev, newWebsite]);
  };

  const handleRemoveWebsite = (id: string) => {
    removeWebsite(id);
    setWebsites(prev => prev.filter(website => website.id !== id));
  };

  const handleEditWebsite = (id: string, name: string, url: string) => {
    setWebsites(prev => prev.map(website => 
      website.id === id 
        ? { ...website, name, url }
        : website
    ));
    
    // Update localStorage
    const updatedWebsites = getWebsites().map(website =>
      website.id === id ? { ...website, name, url } : website
    );
    localStorage.setItem('favorite-websites', JSON.stringify(updatedWebsites));
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
