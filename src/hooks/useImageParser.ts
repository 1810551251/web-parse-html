// src/hooks/useImageParser.ts

import { useAppStore } from '@/store/appStore';
import { toast } from 'sonner';
import { parseHtmlForImages } from '@/utils/parser';
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from '@/trpc/client';

export const useImageParser = () => {
  // Zustand store methods
  const { setImages, setStatus, setError, reset: resetStore } = useAppStore();
  
  // tRPC client instance
  const trpc = useTRPC();
  
  // Local state to hold the URL provided by the user
  const [url, setUrl] = useState("");

  // The core of the logic: useQuery from TanStack Query
  const { 
    data,         // The HTML string returned from your tRPC endpoint
    isFetching,   // True if a request is in-flight
    isError,      // True if the last request resulted in an error
    error,        // The error object itself
    isSuccess,    // True if the last request was successful
  } = useQuery({
    // Spread the queryOptions from tRPC. This is a great pattern!
    ...trpc.fetchUrl.queryOptions({ url }),
    
    // VERY IMPORTANT: This prevents the query from running automatically.
    // It will only run when `url` is a non-empty string.
    enabled: !!url,

    // Optional: Prevent automatic refetching on window focus, etc.
    // You might want this if the content of the URL doesn't change often.
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1, // Try to fetch once more on failure
  });

  // --- Side Effects Handling using useEffect ---

  // Effect to handle loading state
  useEffect(() => {
    if (isFetching) {
      setStatus('loading');
    }
  }, [isFetching, setStatus]);

  // Effect to handle success state
  useEffect(() => {
    if (isSuccess && data) {
      try {
        const htmlContent = typeof data === 'string' ? data : String(data);
        const imageUrls = parseHtmlForImages(htmlContent); 
        setImages(imageUrls);
        setStatus('success');
        if (imageUrls.length > 0) {
          toast.success(`Successfully found ${imageUrls.length} images!`);
        } else {
          toast.info('Request succeeded, but no images were found on the page.');
        }
      } catch (parseError) {
        // Handle potential errors from the parser function itself
        const errorMessage = parseError instanceof Error ? parseError.message : 'Failed to parse HTML content.';
        setError(errorMessage);
        setStatus('error');
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, data, setImages, setStatus, setError, url]);

  // Effect to handle error state from the fetch
  useEffect(() => {
    if (isError && error) {
      // The tRPC error object has a helpful `message` property
      const errorMessage = error.message || 'An unknown error occurred.';
      setError(errorMessage);
      setStatus('error');
      toast.error(errorMessage);
    }
  }, [isError, error, setError, setStatus]);

  const parseUrl = (newUrl: string) => {
    // Before setting the new URL, reset the previous state
    resetStore();
    setStatus('idle');
    setUrl(newUrl);
  };
  
  const reset = () => {
    setUrl("");
    resetStore();
  }

  return {
    parseUrl,
    reset,
    // Expose the raw states from react-query
    isLoading: isFetching, // Use isFetching for a more responsive loading state
    isError,
    error: error?.message ?? null, // Provide a clean error message or null
  };
};