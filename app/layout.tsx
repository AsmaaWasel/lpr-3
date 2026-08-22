import "./globals.css";

import { LanguageProvider } from "@/LanguageContext";
import IntlProvider from "@/providers/IntlProvider";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-[#e8eef7]
          font-sans
          text-[#172b48]
          antialiased
          dark:bg-[#071528]
          dark:text-[#eef6ff]
        "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <IntlProvider>
              <AuthProvider>{children}</AuthProvider>
            </IntlProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
