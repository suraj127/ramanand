import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'House of Ramanand | Royal Jaipur Since 1936 — Premium Jewellery',
  description: 'Handcrafted luxury diamond, gold, polki, and gemstone jewellery from House of Ramanand Jaipur. Explore bridal collections, Digi Gold, and heritage heirlooms.',
  openGraph: {
    title: 'House of Ramanand | Royal Jaipur Since 1936',
    description: 'Handcrafted luxury diamond, gold, and polki jewellery.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Ramanand | Premium Jewellery',
    description: 'Handcrafted luxury diamond, gold, and polki jewellery.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#121212] text-neutral-800 antialiased selection:bg-[#8E5827] selection:text-white">
        {children}
      </body>
    </html>
  );
}
