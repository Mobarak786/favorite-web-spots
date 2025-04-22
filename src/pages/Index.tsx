
import React, { useEffect, useState, useRef } from 'react';
import { Website } from '@/types/website';
import { addWebsite, getWebsites, removeWebsite, updateWebsite } from '@/services/websiteStorage';
import WebsiteCard from '@/components/WebsiteCard';
import AddWebsiteForm from '@/components/AddWebsiteForm';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const Index: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchData();
    });

    return () => {
      ignore = true;
      subscription?.unsubscribe();
    };
  }, []);

  const handleAddWebsite = async (name: string, url: string, iconUrl: string, description?: string) => {
    const newWebsite = await addWebsite({ name, url, iconUrl, description });
    if (newWebsite) setWebsites(prev => [...prev, newWebsite]);
  };

  const handleRemoveWebsite = async (id: string) => {
    await removeWebsite(id);
    setWebsites(prev => prev.filter(website => website.id !== id));
  };

  const handleEditWebsite = async (id: string, name: string, url: string, description?: string) => {
    await updateWebsite(id, { name, url, description });
    setWebsites(prev => prev.map(website => 
      website.id === id 
        ? { ...website, name, url, description }
        : website
    ));
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    await updateWebsite(id, { isFavorite });
    setWebsites(prev => prev.map(website =>
      website.id === id
        ? { ...website, isFavorite }
        : website
    ));
  };

  const filteredWebsites = websites.filter(website => {
    const searchContent = `${website.name} ${website.description || ''}`.toLowerCase();
    return searchContent.includes(searchQuery.toLowerCase());
  });

  const favoriteWebsites = filteredWebsites.filter(w => w.isFavorite);
  const allWebsites = filteredWebsites;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spot-primary"></div>
      </div>
    );
  }

  const renderWebsiteGrid = (websites: Website[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {websites.map((website) => (
        <WebsiteCard
          key={website.id}
          website={website}
          onRemove={handleRemoveWebsite}
          onEdit={handleEditWebsite}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );

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
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-full gap-4 flex-wrap">
                  <SearchBar onSearch={setSearchQuery} />
                  <AddWebsiteForm onAddWebsite={handleAddWebsite} />
                </div>
              </div>
            )}
          </div>

          {websites.length === 0 ? (
            <EmptyState onAddClick={() => dialogTriggerRef.current?.click()} />
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="all" className="flex-1">
                  All Websites ({allWebsites.length})
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex-1">
                  Favorites ({favoriteWebsites.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {allWebsites.length > 0 ? (
                  renderWebsiteGrid(allWebsites)
                ) : (
                  <p className="text-center text-gray-500">No websites found</p>
                )}
              </TabsContent>
              
              <TabsContent value="favorites">
                {favoriteWebsites.length > 0 ? (
                  renderWebsiteGrid(favoriteWebsites)
                ) : (
                  <p className="text-center text-gray-500">No favorite websites yet</p>
                )}
              </TabsContent>
            </Tabs>
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
