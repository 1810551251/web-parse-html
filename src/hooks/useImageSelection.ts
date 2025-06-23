import { useState, useCallback } from 'react';

export const useImageSelection = (isMultiSelectEnabled: boolean = true) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return isMultiSelectEnabled ? [...prevSelectedIds, id] : [id];
      }
    });
  }, [isMultiSelectEnabled]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    if (isMultiSelectEnabled) {
        setSelectedIds(ids);
    }
  }, [isMultiSelectEnabled]);


  return {
    selectedIds,
    toggleSelection,
    clearSelection,
    selectAll,
    setSelectedIds // Expose if direct setting is needed
  };
};