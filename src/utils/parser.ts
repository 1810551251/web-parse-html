import { ParsedImageData } from '@/types';
import { nanoid } from 'nanoid';

// Helper function to parse a single picture element
const parsePictureElement = (pictureElement: HTMLPictureElement): ParsedImageData | null => {
  const imgElement = pictureElement.querySelector('img');
  if (!imgElement) return null;

  const dataSrc = imgElement.dataset.src; // Prefer data-src
  const src = imgElement.getAttribute('src');
  const alt = imgElement.getAttribute('alt') || '';

  const originalSrc = dataSrc || src;
  if (!originalSrc) return null;

  return {
    id: nanoid(),
    thumbnailSrc: originalSrc,
    originalSrc: originalSrc,
    alt: alt,
    description: alt,
  };
};

export const parseHtmlForImages = (htmlContent: string): ParsedImageData[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html').querySelector('article');

  
  const results: ParsedImageData[] = [];

  // Parse images within lists
  const listElements = doc?.querySelectorAll('ul.steps, ul.list-step');
  
  // Parse the first picture element outside lists if it exists
  const firstPictureElement = doc?.querySelector('picture');
  if (firstPictureElement) {
    const parsedImage = parsePictureElement(firstPictureElement);
    if (parsedImage) results.push(parsedImage);
  }

  listElements?.forEach(listElement => {
    const pictureElements = listElement.querySelectorAll('picture');
    pictureElements.forEach(pictureElement => {
      const parsedImage = parsePictureElement(pictureElement);
      if (parsedImage) results.push(parsedImage);
    });
  });


  const catalogAnchor = doc?.querySelector('div.catalog-anchor');

  if (catalogAnchor&&(listElements?.length==0)) {
    
    const hotTags = catalogAnchor.querySelectorAll('.hot-tag');
    const sections = doc?.querySelectorAll('section.part');
  
    hotTags.forEach(hotTag => {
      const button = hotTag.closest('button');
      if (button) {
        const bsTarget = button.getAttribute('data-bs-target');
        if (bsTarget) {
          // Extract number from data-bs-target (assuming format like "#part1")
          const match = bsTarget.match(/\d+/);
          if (match) {
            const index = parseInt(match[0], 10); 
            if (index >= 0 && index < sections.length) {
              const section = sections[index];
              // Find all images in this section
              const images = section.querySelectorAll('picture');
              images.forEach(image => {
                const parsedImage = parsePictureElement(image);
                if (parsedImage) results.push(parsedImage);
              });
            }
          }
        }
      }
    });
  }

  return results;
};