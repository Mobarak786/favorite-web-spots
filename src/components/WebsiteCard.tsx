import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Website } from '@/types/website';
import { MoreHorizontal, Trash, Edit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  const [editedName, setEditedName] = useState(website.name);
  const [editedUrl, setEditedUrl] = useState(website.url);
  const [editedDescription, setEditedDescription] = useState(website.description || '');

  const handleClick = () => {
    window.open(website.url, "_blank", "noopener,noreferrer");
  };

  const handleRemove = () => {
    onRemove(website.id);
    toast.success(`Removed ${website.name}`);
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    if (onEdit && editedName.trim() && editedUrl.trim()) {
      onEdit(website.id, editedName, editedUrl, editedDescription.trim() || undefined);
      toast.success(`Updated ${editedName}`);
      setShowEditDialog(false);
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
              <DropdownMenuContent align="end" className="w-32">
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
          
          {website.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 text-center">
              {website.description}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Website</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{website.name}" from your favorites?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Website</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Website name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Add a description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WebsiteCard;
