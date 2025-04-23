
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (name: string, url: string, description?: string) => void;
  initialName: string;
  initialUrl: string;
  initialDescription?: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onOpenChange,
  onEdit,
  initialName,
  initialUrl,
  initialDescription = '',
}) => {
  const [editedName, setEditedName] = useState(initialName);
  const [editedUrl, setEditedUrl] = useState(initialUrl);
  const [editedDescription, setEditedDescription] = useState(initialDescription);

  const handleEdit = () => {
    if (editedName.trim() && editedUrl.trim()) {
      onEdit(editedName, editedUrl, editedDescription.trim() || undefined);
      toast.success(`Updated ${editedName}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleEdit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
