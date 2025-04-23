
import { Link, Share2 } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface ShareMenuProps {
  url: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ url }) => {
  const handleShare = async (platform?: string) => {
    try {
      if (platform === 'native') {
        if (navigator.share) {
          await navigator.share({
            url: url,
          });
          return;
        } else {
          toast.error('Native sharing not supported on this device');
          return;
        }
      }

      if (platform) {
        let shareUrl = '';
        switch (platform) {
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          default:
            break;
        }
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share link');
    }
  };

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => handleShare('native')}>
        <Share2 className="mr-2" size={16} />
        Share
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleShare()}>
        <Link className="mr-2" size={16} />
        Copy Link
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
};

export default ShareMenu;
