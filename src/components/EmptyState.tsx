
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 mt-8 border-2 border-dashed border-spot-accent rounded-lg bg-white/80 min-h-[350px] shadow-sm">
      <Globe size={64} className="text-spot-primary opacity-80 mb-6" />
      <h3 className="text-2xl font-medium text-gray-800 mb-3">No favorite websites yet</h3>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Add your first favorite website to get started. You'll be able to access it quickly from here.
      </p>
      <Button onClick={onAddClick} className="bg-spot-primary hover:bg-spot-secondary text-white px-6 py-2 text-base">
        Add Your First Website
      </Button>
    </div>
  );
};

export default EmptyState;
