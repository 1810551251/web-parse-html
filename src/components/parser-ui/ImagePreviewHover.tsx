import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
        <img
          src={src}
          alt={alt || "Preview"}
          className="max-w-full h-auto rounded-md object-contain max-h-72"
        />
      </HoverCardContent>
    </HoverCard>
  );
};