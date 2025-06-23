import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn is set up via Shadcn

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
  return <Loader2 className={cn('animate-spin', className)} size={size} />;
};