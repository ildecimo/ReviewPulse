import { Source_Sans_3 } from 'next/font/google';
import { type Metadata } from 'next/types';
import { TailwindIndicator } from '~/components/TailwindIndicator';
import ThemeProvider from '~/components/ThemeProvider';
import StyledComponentsRegistry from '~/lib/registry';
import '~/styles/main.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Review Pulse - ildecimo BigCommerce Google Vertex AI App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <main className={sourceSans.className}>{children}</main>
            <TailwindIndicator />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
