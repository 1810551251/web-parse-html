import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string | null | undefined;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <div className={cn('flex items-center gap-2 text-sm text-red-600 dark:text-red-400 p-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md', className)}>
      <AlertTriangle size={18} />
      <span>{message}</span>
    </div>
  );
};