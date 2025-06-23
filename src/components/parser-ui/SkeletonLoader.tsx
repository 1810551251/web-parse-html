import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ImageListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-8 w-8" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};