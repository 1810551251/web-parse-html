
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
