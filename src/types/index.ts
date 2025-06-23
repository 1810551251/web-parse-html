export interface ParsedImageData {
  id: string;          // Unique ID for React key & selection
  thumbnailSrc: string;  // URL for the thumbnail (could be same as original)
  originalSrc: string; // Full original image URL
  alt?: string;         // Alt text from image
  description: string; // User-editable description, initially from alt
}

export type ParserStatus = 'idle' | 'loading' | 'success' | 'error';