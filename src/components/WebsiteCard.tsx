
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Website } from '@/types/website';
import { MoreHorizontal, Trash, Edit, Star, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import ShareMenu from './website/ShareMenu';
import EditDialog from './website/EditDialog';
import DeleteDialog from './website/DeleteDialog';

interface WebsiteCardProps {
  website: Website;
  onRemove: (id: string) => void;
  onEdit?: (id: string, name: string, url: string, description?: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ 
  website, 
  onRemove, 
  onEdit,
  onToggleFavorite 
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleClick = () => {
    window.open(website.url, "_blank", "noopener,noreferrer");
  };

  const handleRemove = () => {
    onRemove(website.id);
    toast.success(`Removed ${website.name}`);
    setShowDeleteDialog(false);
  };

  const handleEdit = (name: string, url: string, description?: string) => {
    if (onEdit) {
      onEdit(website.id, name, url, description);
    }
  };

  return (
    <>
      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden h-[180px] animate-fade-in border-2 border-transparent hover:border-spot-accent">
        <CardContent className="p-4 flex flex-col items-center justify-between h-full relative">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => onToggleFavorite(website.id, !website.isFavorite)}
              title={website.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {website.isFavorite ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <Star className="h-4 w-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Share className="mr-2" size={16} />
                    Share
                  </DropdownMenuSubTrigger>
                  <ShareMenu url={website.url} />
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="mr-2" size={16} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2" size={16} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div 
            className="flex justify-center items-center h-24 w-24 my-2 p-2"
            onClick={handleClick}
          >
            <img 
              src={website.iconUrl} 
              alt={`${website.name} icon`} 
              className="max-h-full max-w-full object-contain rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=example.com&sz=64';
              }}
            />
          </div>
          
          <p className="text-center font-medium text-sm mt-2 line-clamp-2 text-gray-800">
            {website.name}
          </p>
        </CardContent>
      </Card>

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleRemove}
        websiteName={website.name}
      />

      <EditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onEdit={handleEdit}
        initialName={website.name}
        initialUrl={website.url}
        initialDescription={website.description}
      />
    </>
  );
};

export default WebsiteCard;
