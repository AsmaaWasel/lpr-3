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
          bg-slate-100
          text-slate-900
          antialiased
          dark:bg-slate-950
          dark:text-white
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
