"use client";
import { SearchPanel } from '@/components/parser-ui/SearchPanel';
import { ImageList } from '@/components/parser-ui/ImageList';
import { Toaster } from '@/components/ui/sonner'; // Sonner for notifications

function App() {

  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <header className="w-full max-w-4xl mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary">
            产品步骤图片解析
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            请输入正确的网址再点击解析
            
          </p>
      
        </header>

        <main className="w-full max-w-4xl">
          <SearchPanel />
          <ImageList />
          
        </main>

        <footer className="w-full max-w-4xl mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ZHONG GUOXUAN. 技术栈: React ts Tailwind Zustand Shadcn.</p>
         
        </footer>
      </div>
      <Toaster richColors position="top-right" />
     </>

  );
}

export default App;
