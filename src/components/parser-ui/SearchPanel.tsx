import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { urlSchema, UrlFormData } from '@/lib/validation';
import { useImageParser } from '@/hooks/useImageParser';
import { LoadingSpinner } from './LoadingSpinner';
import { useAppStore } from '@/store/appStore';
import { ErrorMessage } from './ErrorMessage';

export const SearchPanel = () => {
  const { parseUrl, isLoading: isParsing } = useImageParser(); // isLoading from react-query
  const appError = useAppStore(state => state.error); // Global error from store

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
    mode: 'onChange', // Real-time validation
  });

  const onSubmit = (data: UrlFormData) => {
    parseUrl(data.url);
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 items-start">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel htmlFor="url-input" className="sr-only">目标网址</FormLabel>
                <FormControl>
                  <Input
                    id="url-input"
                    placeholder="请输入网址(e.g., https://edimakor.hitpaw.com/video-editing-tips/stephen-hawking-text-to-speech.html)"
                    {...field}
                    aria-invalid={!!form.formState.errors.url}
                    aria-describedby="url-error"
                  />
                </FormControl>
                <FormMessage id="url-error" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isParsing} className="w-full sm:w-auto">
            {isParsing ? <LoadingSpinner className="mr-2 h-4 w-4" /> : null}
            {isParsing ? '解析中...' : '解析'}
          </Button>
        </form>
      </Form>
      {appError && !isParsing && <ErrorMessage message={appError} className="mt-3" />}
    </div>
  );
};