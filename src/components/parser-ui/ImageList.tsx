import React, { useState, useMemo } from 'react';

import { ImageListItem } from './ImageListItem';
import { Input } from '@/components/ui/input';
import { useImageSelection } from '@/hooks/useImageSelection';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { ImageListSkeleton } from './SkeletonLoader';
import { FileDown,  CheckSquare, Square } from 'lucide-react';

export const ImageList = () => {
  const images = useAppStore(state => state.images);
  const status = useAppStore(state => state.status);
  const [filter, setFilter] = useState('');
  const { selectedIds, toggleSelection, clearSelection, selectAll } = useImageSelection(true); // Enable multi-select

  const filteredItems = useMemo(() => {
    if (!filter) return images;
    return images.filter(item =>
      item.description.toLowerCase().includes(filter.toLowerCase()) ||
      item.originalSrc.toLowerCase().includes(filter.toLowerCase())
    );
  }, [images, filter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      clearSelection();
    } else {
      selectAll(filteredItems.map(item => item.id));
    }
  };



  const handleExportSelected = () => {
    const emptyLinesCount = 5;
    const selectedImages = images.filter(img => selectedIds.includes(img.id));
    if (selectedImages.length === 0) {
        alert("没选中任何图片.");
        return;
    }
    
    // Create empty lines string
    const emptyLines = '\n'.repeat(emptyLinesCount);
    
    // Extract originalSrc values and join with empty lines
    const srcValues = selectedImages.map(img => img.originalSrc).join(emptyLines);
    
    // Create text file data URL
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(srcValues);
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "image_sources.txt");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
  // Add other actions like delete selected if needed

  if (status === 'loading') {
    return <ImageListSkeleton count={5} />;
  }

  if (status === 'idle' || (status === 'success' && images.length === 0 && !filter)) {
     // Don't show "No images found" if there was an error, or user is typing filter before parsing.
     if (status === 'success' && images.length === 0) {
        return <p className="mt-6 text-center text-muted-foreground">这个网址没有符合要求的图片.</p>;
     }
    return null; // Or a placeholder to input URL
  }
  
  if (status === 'error' && images.length === 0) {
    // Error message is handled by SearchPanel or globally via toast.
    // This prevents showing "No images found" when an error occurred.
    return null;
  }


  return (
    <div className="mt-6">
      {images.length > 0 && (
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
          <Input
            placeholder="按描述或网址筛选..."
            value={filter}
            onChange={(e) => {
                setFilter(e.target.value);
                // Optional: Clear selection when filter changes to avoid confusion
                // clearSelection();
            }}
            className="flex-1"
          />
          {filteredItems.length > 0 && (
            <Button variant="outline" onClick={handleSelectAll} className="w-full sm:w-auto">
              {selectedIds.length === filteredItems.length ? <CheckSquare size={16} className="mr-2"/> : <Square size={16} className="mr-2" />}
              {selectedIds.length === filteredItems.length ? '全部取消' : '选中全部'}
            </Button>
          )}
          <Button variant="outline" onClick={handleExportSelected} disabled={selectedIds.length === 0} className="w-full sm:w-auto">
            <FileDown size={16} className="mr-2" />
            导出选中 ({selectedIds.length})
          </Button>
          {/* Add delete button or other actions here */}
        </div>
      )}

      {filteredItems.length === 0 && filter && (
        <p className="text-center text-muted-foreground py-4">
          没有符合筛选的图片 &quot;{filter}&quot;.
        </p>
      )}
      {filteredItems.length === 0 && !filter && images.length > 0 && (
         <p className="text-center text-muted-foreground py-4">所有图像已被过滤掉.</p>
      )}


      <div className="space-y-3">
        {filteredItems.map(item => (
          <ImageListItem
            key={item.id}
            item={item}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelect={toggleSelection}
          />
        ))}
      </div>
    </div>
  );
};