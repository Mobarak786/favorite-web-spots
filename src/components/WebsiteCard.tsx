
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Website } from '@/types/website';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WebsiteCardProps {
  website: Website;
  onRemove: (id: string) => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onRemove }) => {
  const handleClick = () => {
    window.open(website.url, "_blank", "noopener,noreferrer");
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(website.id);
    toast.success(`Removed ${website.name}`);
  };

  return (
    <Card 
      className="group hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden h-[180px] animate-fade-in border-2 border-transparent hover:border-spot-accent"
      onClick={handleClick}
    >
      <CardContent className="p-4 flex flex-col items-center justify-between h-full relative">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:bg-destructive/10"
            onClick={handleRemove}
            aria-label={`Remove ${website.name}`}
          >
            <Trash size={16} />
          </Button>
        </div>
        
        <div className="flex justify-center items-center h-24 w-24 my-2 p-2">
          <img 
            src={website.iconUrl} 
            alt={`${website.name} icon`} 
            className="max-h-full max-w-full object-contain rounded-md"
            onError={(e) => {
              // If image fails to load, use a fallback
              (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64';
            }}
          />
        </div>
        
        <p className="text-center font-medium text-sm mt-2 line-clamp-2 text-gray-800">
          {website.name}
        </p>
      </CardContent>
    </Card>
  );
};

export default WebsiteCard;
