'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { DeviceWrapper } from '@/components/DeviceWrapper';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { HomeScreen } from '@/components/HomeScreen';
import { ProductCatalogScreen } from '@/components/ProductCatalogScreen';
import { CategoriesDirectoryScreen } from '@/components/CategoriesDirectoryScreen';
import { GiftingScreen } from '@/components/GiftingScreen';
import { ProductDetailScreen } from '@/components/ProductDetailScreen';
import { DigiGoldScreen } from '@/components/DigiGoldScreen';
import { WishlistScreen } from '@/components/WishlistScreen';
import { CartScreen } from '@/components/CartScreen';
import { AccountScreen } from '@/components/AccountScreen';
import { OrderHistoryScreen } from '@/components/OrderHistoryScreen';
import { StoreLocatorScreen } from '@/components/StoreLocatorScreen';
import { PoliciesScreen } from '@/components/PoliciesScreen';
import { GoldRateScreen } from '@/components/GoldRateScreen';
import { SearchScreen } from '@/components/SearchScreen';
import { Modals } from '@/components/Modals';

function MainApp() {
  const { activeTab, selectedCategory } = useApp();

  return (
    <DeviceWrapper>
      {/* Top Header */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-1 w-full relative">
        {activeTab === 'home' ? (
          <HomeScreen />
        ) : activeTab === 'gifting' ? (
          <GiftingScreen />
        ) : activeTab === 'categories' ? (
          <CategoriesDirectoryScreen />
        ) : activeTab === 'collection' ? (
          <ProductCatalogScreen />
        ) : activeTab === 'gold-rate' ? (
          <GoldRateScreen />
        ) : activeTab === 'search' ? (
          <SearchScreen />
        ) : activeTab === 'product-detail' ? (
          <ProductDetailScreen />
        ) : activeTab === 'digi-gold' ? (
          <DigiGoldScreen />
        ) : activeTab === 'wishlist' ? (
          <WishlistScreen />
        ) : activeTab === 'cart' || activeTab === 'checkout' ? (
          <CartScreen />
        ) : activeTab === 'account' ? (
          <AccountScreen />
        ) : activeTab === 'orders' || activeTab === 'order-tracking' ? (
          <OrderHistoryScreen />
        ) : activeTab === 'contact' ? (
          <StoreLocatorScreen />
        ) : activeTab === 'policies' ? (
          <PoliciesScreen />
        ) : (
          <HomeScreen />
        )}
      </main>

      {/* Global Modals & Notifications */}
      <Modals />

      {/* Persistent Bottom Navigation */}
      {activeTab !== 'product-detail' && activeTab !== 'checkout' && (
        <BottomNav />
      )}
    </DeviceWrapper>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
