import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from '@/context/SessionProvider';

export const metadata: Metadata = {
  title: 'Crave | Food Delivery Reimagined',
  description: 'Order food from your local restaurants and have it delivered to your doorstep. Fast, fresh, and delicious.',
  keywords: ['food delivery', 'order food online', 'local restaurants', 'crave', 'fast delivery'],
  openGraph: {
    title: 'Crave | Food Delivery Reimagined',
    description: 'Order food from your local restaurants and have it delivered to your doorstep. Fast, fresh, and delicious.',
    url: 'https://crave-delivery.vercel.app',
    siteName: 'Crave',
    images: [
      {
        url: '/og-image.jpg', // You can replace this with a real image later
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
