
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 min-h-[300px]">
      <Link size={48} className="text-spot-primary opacity-70 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">No favorite websites yet</h3>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Add your first favorite website to get started. You'll be able to access it quickly from here.
      </p>
      <Button onClick={onAddClick} className="bg-spot-primary hover:bg-spot-secondary">
        Add Your First Website
      </Button>
    </div>
  );
};

export default EmptyState;
