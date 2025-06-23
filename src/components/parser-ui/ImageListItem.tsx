import React, { useState, useEffect } from 'react';
import { ParsedImageData } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit3, Save, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImagePreviewHover } from './ImagePreviewHover';
import { useAppStore } from '@/store/appStore';

interface ImageListItemProps {
  item: ParsedImageData;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export const ImageListItem = React.memo(({ item, isSelected, onToggleSelect }: ImageListItemProps) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editableDesc, setEditableDesc] = useState(item.description);
  const updateImageDescriptionInStore = useAppStore(state => state.updateImageDescription);

  useEffect(() => {
    setEditableDesc(item.description); // Sync if item.description changes from outside
  }, [item.description]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableDesc(e.target.value);
  };

  const handleSaveDescription = () => {
    updateImageDescriptionInStore(item.id, editableDesc);
    setIsEditingDesc(false);
  };

  const handleCancelEdit = () => {
    setEditableDesc(item.description);
    setIsEditingDesc(false);
  };

  return (
    <Card className={cn("transition-all duration-150 ease-in-out", isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md")}>
      <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <Checkbox
          id={`select-${item.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(item.id)}
          aria-label={`Select image ${item.alt || item.id}`}
          className="mt-1 sm:mt-0 self-start sm:self-center"
        />

        <ImagePreviewHover src={item.thumbnailSrc} alt={item.alt || 'Thumbnail preview'}>
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-muted rounded overflow-hidden cursor-pointer">
            <img
              src={item.thumbnailSrc}
              alt={item.alt || 'Parsed image'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </ImagePreviewHover>

        <div className="flex-grow min-w-0"> {/* min-w-0 for text truncation */}
          {isEditingDesc ? (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={editableDesc}
                onChange={handleDescriptionChange}
                className="h-8 text-sm"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveDescription(); if (e.key === 'Escape') handleCancelEdit(); }}
              />
              <Button variant="ghost" size="icon" onClick={handleSaveDescription} className="h-8 w-8 text-green-600 hover:text-green-700">
                <Save size={16} />
                <span className="sr-only">Save description</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancelEdit} className="h-8 w-8 text-red-500 hover:text-red-600">
                <XCircle size={16} />
                <span className="sr-only">Cancel edit</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <p
                className="text-sm text-muted-foreground break-words cursor-pointer hover:text-foreground"
                title={item.description || "No description"}
                onClick={() => setIsEditingDesc(true)}
              >
                {item.description || <span className="italic">No description</span>}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditingDesc(true)}
              >
                <Edit3 size={14} />
                <span className="sr-only">Edit description</span>
              </Button>
            </div>
          )}

          <a
            href={item.originalSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 truncate mt-1"
            title={item.originalSrc}
          >
            <ExternalLink size={12} />
            <span className="truncate">{item.originalSrc}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
});

ImageListItem.displayName = 'ImageListItem';