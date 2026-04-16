'use client';

import './globals.css';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from '@/stores/useUserStore';
import { useCartStore } from '@/stores/useCartStore';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import FloatingTelegramButton from '@/components/FloatingTelegramButton';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

export default function RootLayout({ children }) {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.3)_0%,rgba(153,27,27,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
            </div>
          </div>
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
        <Toaster />
        <PWAInstallPrompt />
        <FloatingTelegramButton />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
