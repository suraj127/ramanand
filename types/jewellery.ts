export type CategoryId =
  | 'all'
  | 'earrings'
  | 'rings'
  | 'necklaces'
  | 'bangles'
  | 'bracelets'
  | 'pendants'
  | 'chains'
  | 'gold-coins'
  | 'polki-jadau'
  | 'wedding'
  | 'men'
  | 'kids'
  | 'gifting'
  | 'sub-30k'
  | 'sub-50k';

export interface MetalDetails {
  karatage: '18K' | '22K' | '24K' | '14K' | string;
  materialColour: 'Rose Gold' | 'Yellow Gold' | 'White Gold' | 'Two-Tone' | 'Rose' | string;
  grossWeight: number; // in grams
  netGoldWeight: number; // in grams
  metalType: string;
  height?: string;
  width?: string;
  purityScore: string;
}

export interface DiamondDetails {
  totalWeight: number; // carats
  totalCount: number;
  clarity: string; // e.g. VVS-EF, VVS1-VVS2, SI-IJ
  colour: string; // e.g. E-F, I-J, D-E
  cut: string; // Round Brilliant, Princess, Marquise
  setting: string; // Micro Prong, Channel, Bezel, Pave
  certifiedBy: 'IGI' | 'GIA' | 'SGL' | 'BIS';
}

export interface PriceBreakup {
  goldValue: number;
  diamondValue: number;
  makingCharges: number;
  discount: number;
  gst: number;
  total: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  gender: 'Women' | 'Men' | 'Unisex' | 'Kids';
  subCategory?: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  images: string[];
  description: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  purityBadge: string;
  tags: string[];
  metalDetails: MetalDetails;
  diamondDetails?: DiamondDetails;
  weightVariants: { weight: number; label: string; price: number }[];
  priceBreakup: PriceBreakup;
  rating: number;
  reviewCount: number;
  occasion?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: number;
  selectedVariantPrice: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productSku: string;
  image: string;
  quantity: number;
  price: number;
  selectedWeight: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  taxGst: number;
  shippingCharge: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  ramanandCoins: number;
  avatar?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  highlightText: string;
  ctaText: string;
  targetCategory: CategoryId;
  bgGradient: string;
  textColor: string;
  active: boolean;
  tagline: string;
  image?: string;
}

export interface JewelPlanScheme {
  id: string;
  name: string;
  tagline: string;
  monthlyAmount: number;
  durationMonths: number;
  bonusMonthPercentage: number;
  description: string;
  benefits: string[];
}
