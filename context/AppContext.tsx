'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Order,
  Customer,
  HeroBanner,
  CategoryId,
  OrderStatus
} from '@/types/jewellery';
import {
  INITIAL_PRODUCTS,
  INITIAL_BANNERS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS
} from '@/lib/mock-data';

export type TabType =
  | 'home'
  | 'digi-gold'
  | 'categories'
  | 'collection'
  | 'gold-rate'
  | 'search'
  | 'order-tracking'
  | 'gifting'
  | 'account'
  | 'wishlist'
  | 'cart'
  | 'product-detail'
  | 'checkout'
  | 'order-success'
  | 'contact'
  | 'policies'
  | 'orders';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  wishlistIds: string[];
  addToCart: (product: Product, quantity?: number, selectedWeight?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Digi Gold
  digiGoldBalanceGrams: number;
  digiGoldRate: number; // ₹ per gram
  buyDigiGold: (amountInRupees: number) => boolean;
  sellDigiGold: (grams: number) => boolean;
  redeemDigiGold: (grams: number) => boolean;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Customers & User Profile
  currentUser: Customer;
  updateCurrentUser: (updates: Partial<Customer>) => void;
  customers: Customer[];

  // Banners & Admin
  banners: HeroBanner[];
  setBanners: React.Dispatch<React.SetStateAction<HeroBanner[]>>;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;

  // Utilities & Modals
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  isLiveChatOpen: boolean;
  setIsLiveChatOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  whatsAppProduct: Product | null;
  openWhatsAppEnquiry: (product?: Product) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (frame: boolean) => void;
  activePolicyPage: string;
  setActivePolicyPage: (policy: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [banners, setBanners] = useState<HeroBanner[]>(INITIAL_BANNERS);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentUser, setCurrentUser] = useState<Customer>({
    id: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: '',
    ramanandCoins: 0
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Cart & Wishlist initialized
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Digi Gold
  const [digiGoldBalanceGrams, setDigiGoldBalanceGrams] = useState<number>(0.0);
  const digiGoldRate = 7842; // ₹7,842/g live rate

  // UI state
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [whatsAppProduct, setWhatsAppProduct] = useState<Product | null>(null);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [activePolicyPage, setActivePolicyPage] = useState<string>('privacy');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedWeight?: number) => {
    const weight = selectedWeight || product.metalDetails.grossWeight;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedWeight: weight,
          selectedVariantPrice: product.price
        }
      ];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to Cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from Cart', 'info');
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to House of Ramanand Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.selectedVariantPrice * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Digi Gold Actions
  const buyDigiGold = (amountInRupees: number) => {
    const purchasedGrams = amountInRupees / digiGoldRate;
    setDigiGoldBalanceGrams((prev) => parseFloat((prev + purchasedGrams).toFixed(4)));
    showToast(`Successfully purchased ${purchasedGrams.toFixed(4)}g 24KT Digi Gold!`);
    return true;
  };

  const sellDigiGold = (grams: number) => {
    if (grams > digiGoldBalanceGrams) {
      showToast('Insufficient gold balance in your Digi Locker', 'error');
      return false;
    }
    setDigiGoldBalanceGrams((prev) => parseFloat((prev - grams).toFixed(4)));
    const amount = Math.round(grams * (digiGoldRate * 0.98));
    showToast(`Sold ${grams}g gold. ₹${amount.toLocaleString('en-IN')} transferred to your UPI!`);
    return true;
  };

  const redeemDigiGold = (grams: number) => {
    if (grams > digiGoldBalanceGrams) {
      showToast('Insufficient gold balance to redeem', 'error');
      return false;
    }
    setDigiGoldBalanceGrams((prev) => parseFloat((prev - grams).toFixed(4)));
    showToast(`Redemption voucher of ${grams}g generated for House of Ramanand!`);
    return true;
  };

  // Orders
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `ORD-DEMO-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerEmail: currentUser.email,
      shippingAddress: orderData.shippingAddress || {
        line1: 'House No. 42, Heritage Enclave, C-Scheme',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001'
      },
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        productSku: c.product.sku,
        image: c.product.images[0],
        quantity: c.quantity,
        price: c.selectedVariantPrice,
        selectedWeight: c.selectedWeight
      })),
      subtotal: cartTotal,
      discount: 500,
      couponCode: 'WELCOME500',
      taxGst: Math.round(cartTotal * 0.03),
      shippingCharge: 0,
      totalAmount: Math.round(cartTotal * 1.03 - 500),
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      trackingNumber: `RAM-JAI-${Math.floor(10000 + Math.random() * 90000)}`,
      estimatedDelivery: '25–28 September 2026',
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalSpent: prev.totalSpent + newOrder.totalAmount,
      ramanandCoins: prev.ramanandCoins + Math.round(newOrder.totalAmount * 0.01)
    }));
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    showToast(`Order #${orderId} updated to "${status}"`);
  };

  const updateCurrentUser = (updates: Partial<Customer>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully');
  };

  // Product CRUD
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added new product: ${product.name}`);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );
    showToast(`Updated product: ${product.name}`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const openWhatsAppEnquiry = (product?: Product) => {
    setWhatsAppProduct(product || selectedProduct);
    setIsWhatsAppModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        openProductDetail,
        selectedCategory,
        setSelectedCategory,
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        wishlistIds,
        addToCart,
        removeFromCart,
        updateCartQty,
        toggleWishlist,
        isInWishlist,
        clearCart,
        cartTotal,
        cartCount,
        digiGoldBalanceGrams,
        digiGoldRate,
        buyDigiGold,
        sellDigiGold,
        redeemDigiGold,
        orders,
        currentOrder,
        createOrder,
        updateOrderStatus,
        currentUser,
        updateCurrentUser,
        customers,
        banners,
        setBanners,
        isAdminMode,
        setIsAdminMode,
        toast,
        showToast,
        isLiveChatOpen,
        setIsLiveChatOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        whatsAppProduct,
        openWhatsAppEnquiry,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isMobileFrame,
        setIsMobileFrame,
        activePolicyPage,
        setActivePolicyPage,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
