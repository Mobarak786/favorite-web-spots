
import React, { useEffect, useState } from 'react';
import { Website } from '@/types/website';
import { addWebsite, getWebsites, removeWebsite } from '@/services/websiteStorage';
import WebsiteCard from '@/components/WebsiteCard';
import AddWebsiteForm from '@/components/AddWebsiteForm';
import EmptyState from '@/components/EmptyState';

const Index: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Load websites from localStorage on component mount
  useEffect(() => {
    const storedWebsites = getWebsites();
    setWebsites(storedWebsites);
  }, []);

  const handleAddWebsite = (name: string, url: string, iconUrl: string) => {
    const newWebsite = addWebsite({ name, url, iconUrl });
    setWebsites(prev => [...prev, newWebsite]);
  };

  const handleRemoveWebsite = (id: string) => {
    removeWebsite(id);
    setWebsites(prev => prev.filter(website => website.id !== id));
  };

  // Reference to the dialog trigger button for empty state
  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Favorite Web Spots</h1>
            <p className="text-gray-500 mt-2">Keep all your favorite websites in one place</p>
          </div>
          
          {websites.length > 0 && (
            <AddWebsiteForm
              onAddWebsite={handleAddWebsite}
            />
          )}
        </div>
      </header>

      <main>
        {websites.length === 0 ? (
          <EmptyState onAddClick={() => dialogTriggerRef.current?.click()} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {websites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onRemove={handleRemoveWebsite}
              />
            ))}
          </div>
        )}

        {/* Hidden trigger for empty state */}
        {websites.length === 0 && (
          <div className="hidden">
            <AddWebsiteForm
              onAddWebsite={handleAddWebsite}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
