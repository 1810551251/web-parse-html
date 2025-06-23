import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from 'next/image';
interface ImagePreviewHoverProps {
  src: string;
  alt?: string;
  children: React.ReactNode;
}

export const ImagePreviewHover = ({ src, alt, children }: ImagePreviewHoverProps) => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 p-2">

        <Image 
              src={src} 
              alt={alt||"Preview"} 
              className="rounded-md"
              width={300}  // Add appropriate width
              height={200} // Add appropriate height
      />
      </HoverCardContent>
    </HoverCard>
  );
};