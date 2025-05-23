
import React, { useState, useRef, forwardRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { getFaviconUrl } from '@/services/websiteStorage';
import { toast } from 'sonner';

interface AddWebsiteFormProps {
  onAddWebsite: (name: string, url: string, iconUrl: string, description?: string) => void;
}

const AddWebsiteForm = forwardRef<HTMLButtonElement, AddWebsiteFormProps>(
  ({ onAddWebsite }, ref) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [customIconUrl, setCustomIconUrl] = useState('');
    const [useCustomIcon, setUseCustomIcon] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        new URL(url);
        const iconUrl = useCustomIcon && customIconUrl ? customIconUrl : getFaviconUrl(url);
        onAddWebsite(name, url, iconUrl, description.trim() || undefined);
        resetForm();
        setOpen(false);
        toast.success(`Added ${name} to your favorites`);
      } catch (error) {
        toast.error("Please enter a valid URL (including http:// or https://)");
      }
    };

    const resetForm = () => {
      setName('');
      setUrl('');
      setDescription('');
      setCustomIconUrl('');
      setUseCustomIcon(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            ref={ref}
            className="flex gap-2 items-center bg-spot-primary hover:bg-spot-secondary text-white"
          >
            <Plus size={16} />
            <span>Add Website</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a favorite website</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="My Favorite Site" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input 
                id="url" 
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..." 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="useCustomIcon" 
                  checked={useCustomIcon} 
                  onChange={(e) => setUseCustomIcon(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="useCustomIcon" className="cursor-pointer">Use custom icon URL</Label>
              </div>
              
              {useCustomIcon && (
                <>
                  <Label htmlFor="iconUrl">Custom Icon URL</Label>
                  <Input 
                    id="iconUrl" 
                    type="url" 
                    value={customIconUrl} 
                    onChange={(e) => setCustomIconUrl(e.target.value)}
                    placeholder="https://example.com/icon.png" 
                  />
                </>
              )}
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-spot-primary hover:bg-spot-secondary">Add Website</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

AddWebsiteForm.displayName = "AddWebsiteForm";

export default AddWebsiteForm;
