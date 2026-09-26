'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Product, OrderStatus, CategoryId } from '@/types/jewellery';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Image as ImageIcon,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  ArrowUpRight,
  TrendingUp,
  Search,
  Eye,
  LogOut,
  Sparkles
} from 'lucide-react';

export function AdminDashboard() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    customers,
    banners,
    setBanners,
    setIsAdminMode,
    setActiveTab,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'banners' | 'reports'>('overview');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: 'HOR-820491',
    category: 'earrings',
    price: 35000,
    originalPrice: 38000,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80'],
    description: 'Bespoke fine jewellery piece handcrafted in Jaipur.',
    purityBadge: '18KT GOLD',
    inStock: true,
    stockCount: 10,
    tags: ['New Arrival'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 2.5,
      netGoldWeight: 2.4,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    weightVariants: [{ weight: 2.5, label: '2.50g', price: 35000 }],
    priceBreakup: {
      goldValue: 20000,
      diamondValue: 10000,
      makingCharges: 4000,
      discount: 0,
      gst: 1000,
      total: 35000
    },
    rating: 5.0,
    reviewCount: 1
  });

  // Calculate Metrics
  const totalSalesAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const avgOrderValue = Math.round(totalSalesAmount / (orders.length || 1));

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill product name and price', 'error');
      return;
    }

    const prod: Product = {
      id: `hor-custom-${Date.now()}`,
      sku: newProduct.sku || `HOR-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category as CategoryId,
      gender: 'Women',
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      images: newProduct.images || ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80'],
      description: newProduct.description || 'Exclusive Jaipur fine jewellery ornament.',
      purityBadge: newProduct.purityBadge || '18KT GOLD',
      inStock: true,
      stockCount: Number(newProduct.stockCount || 10),
      tags: ['New Collection'],
      metalDetails: newProduct.metalDetails || {
        karatage: '18K',
        materialColour: 'Yellow Gold',
        grossWeight: 2.5,
        netGoldWeight: 2.4,
        metalType: 'Gold',
        purityScore: '18KT 750'
      },
      weightVariants: [{ weight: 2.5, label: '2.50g', price: Number(newProduct.price) }],
      priceBreakup: {
        goldValue: Math.round(Number(newProduct.price) * 0.6),
        diamondValue: Math.round(Number(newProduct.price) * 0.25),
        makingCharges: Math.round(Number(newProduct.price) * 0.12),
        discount: 0,
        gst: Math.round(Number(newProduct.price) * 0.03),
        total: Number(newProduct.price)
      },
      rating: 5.0,
      reviewCount: 1
    };

    addProduct(prod);
    setIsAddProductModalOpen(false);
  };

  const filteredAdminProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="pb-28 bg-[#F4F2EE] px-4 pt-3 space-y-4 min-h-[90vh]">
      {/* Admin Top Header */}
      <div className="bg-[#111111] text-white p-4 rounded-2xl flex items-center justify-between shadow-md border border-[#D4AF37]/30">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#8E5827] text-[#E8CA72] flex items-center justify-center font-royal font-bold text-xs">
            RJ
          </div>
          <div>
            <h1 className="font-royal text-sm font-bold text-[#E8CA72] leading-tight">
              House of Ramanand
            </h1>
            <span className="text-[10px] text-neutral-400">Admin Control Center • Jaipur</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAdminMode(false);
            setActiveTab('home');
          }}
          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-lg text-neutral-200 flex items-center space-x-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex space-x-1.5 overflow-x-auto hide-scrollbar text-xs font-bold pb-1">
        {[
          { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { key: 'products', label: 'Products', icon: Package },
          { key: 'orders', label: 'Orders', icon: ShoppingBag },
          { key: 'customers', label: 'Customers', icon: Users },
          { key: 'reports', label: 'Reports', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setAdminTab(tab.key as any)}
              className={`px-3 py-2 rounded-xl flex items-center space-x-1.5 whitespace-nowrap transition shadow-xs ${
                adminTab === tab.key
                  ? 'bg-[#8E5827] text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {adminTab === 'overview' && (
        <div className="space-y-3.5">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Total Sales</span>
              <p className="font-serif-luxury text-lg font-bold text-neutral-900 mt-0.5">
                ₹{totalSalesAmount.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4% this month
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Total Orders</span>
              <p className="font-serif-luxury text-lg font-bold text-neutral-900 mt-0.5">
                {orders.length}
              </p>
              <span className="text-[10px] text-[#8E5827] font-bold mt-1 block">
                {pendingOrdersCount} Pending Fulfillment
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Active Products</span>
              <p className="font-serif-luxury text-lg font-bold text-neutral-900 mt-0.5">
                {products.length}
              </p>
              <span className="text-[10px] text-neutral-500 mt-1 block">Across 8 Categories</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Avg. Order Value</span>
              <p className="font-serif-luxury text-lg font-bold text-neutral-900 mt-0.5">
                ₹{avgOrderValue.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">High Ticket</span>
            </div>
          </div>

          {/* Sales Performance Mini Bar Chart */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
            <h3 className="font-royal text-xs font-bold text-neutral-900 mb-3">
              Weekly Revenue Analytics
            </h3>
            <div className="flex items-end justify-between h-28 pt-2 px-2 text-[10px] text-neutral-500 font-semibold">
              {[
                { day: 'Mon', val: 65, amount: '₹1.8L' },
                { day: 'Tue', val: 40, amount: '₹1.2L' },
                { day: 'Wed', val: 85, amount: '₹2.6L' },
                { day: 'Thu', val: 55, amount: '₹1.5L' },
                { day: 'Fri', val: 95, amount: '₹3.4L' },
                { day: 'Sat', val: 100, amount: '₹4.2L' },
                { day: 'Sun', val: 90, amount: '₹3.1L' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1 space-y-1">
                  <div
                    style={{ height: `${item.val}%` }}
                    className="w-4 bg-gradient-to-t from-[#8E5827] to-[#AA7A1E] rounded-t-md transition-all hover:brightness-125"
                    title={item.amount}
                  ></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-royal text-xs font-bold text-neutral-900">Recent Customer Orders</h3>
              <button
                onClick={() => setAdminTab('orders')}
                className="text-[11px] text-[#8E5827] font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {orders.length === 0 ? (
                <p className="py-4 text-center text-neutral-400 text-xs">No customer orders recorded yet</p>
              ) : (
                orders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-neutral-900 block font-mono">{ord.id}</span>
                      <span className="text-[11px] text-neutral-500">{ord.customerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-neutral-900 block font-serif-luxury">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                        {ord.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 mr-2">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search by name or SKU..."
                className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium"
              />
            </div>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-3.5 py-2 bg-[#8E5827] text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredAdminProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl bg-neutral-50 border p-1 shrink-0 flex items-center justify-center">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] text-neutral-500 font-mono">{p.sku}</p>
                    <span className="font-bold text-[#8E5827] font-serif-luxury">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      updateProduct({ ...p, inStock: !p.inStock });
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      p.inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {p.inStock ? 'In Stock' : 'Out'}
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-3">
          <h3 className="font-royal text-sm font-bold text-neutral-900">
            Order Fulfillment Queue ({orders.length})
          </h3>

          <div className="space-y-3 text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-neutral-900 block">{ord.id}</span>
                    <span className="text-neutral-500 text-[10px]">Customer: {ord.customerName} ({ord.customerPhone})</span>
                  </div>
                  <span className="font-bold font-serif-luxury text-sm text-[#8E5827]">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-[11px] text-neutral-600">
                  <span>Ship To: {ord.shippingAddress.line1}, {ord.shippingAddress.city} - {ord.shippingAddress.pincode}</span>
                </div>

                {/* Status selector */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-500">Update Status:</span>
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className="bg-neutral-50 border border-neutral-300 rounded-lg px-2 py-1 text-xs font-bold text-[#8E5827]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMER MANAGEMENT */}
      {adminTab === 'customers' && (
        <div className="space-y-3 text-xs">
          <h3 className="font-royal text-sm font-bold text-neutral-900">
            VIP Clients & Patrons ({customers.length})
          </h3>

          <div className="space-y-2.5">
            {customers.length === 0 ? (
              <p className="py-6 text-center text-neutral-400 text-xs">No registered patrons yet</p>
            ) : (
              customers.map((c) => (
                <div key={c.id} className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-neutral-900">{c.name}</h4>
                    <p className="text-[11px] text-neutral-500">{c.email} • {c.phone}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{c.city}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#8E5827] font-serif-luxury block">
                      ₹{c.totalSpent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-neutral-500">{c.totalOrders} Orders</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: REPORTS */}
      {adminTab === 'reports' && (
        <div className="space-y-3 text-xs">
          <h3 className="font-royal text-sm font-bold text-neutral-900">
            Revenue & Sales Reports
          </h3>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Gross Prototype Revenue:</span>
              <span className="font-bold text-neutral-900 font-serif-luxury">₹{totalSalesAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Total Products Minted:</span>
              <span className="font-bold text-neutral-900">{products.length} Designs</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Average Order Value:</span>
              <span className="font-bold text-neutral-900 font-serif-luxury">₹{avgOrderValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-500">Top Category by Volume:</span>
              <span className="font-bold text-[#8E5827]">Earrings & Polki Suites</span>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="font-royal font-bold text-sm text-neutral-900">Add New Jewellery Product</h3>
              <button onClick={() => setIsAddProductModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-bold text-neutral-600 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Royal Meenakari Diamond Choker"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-neutral-600 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-600 block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as CategoryId })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2"
                  >
                    <option value="earrings">Earrings</option>
                    <option value="rings">Rings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="wedding">Wedding</option>
                    <option value="gold-coins">Gold Coins</option>
                    <option value="men">Men</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-600 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.images?.[0] || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-600 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8E5827] text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow hover:bg-[#76441B]"
              >
                Publish to Live Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
