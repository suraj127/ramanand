import { Product, HeroBanner, Customer, Order, JewelPlanScheme } from '@/types/jewellery';

export const INITIAL_BANNERS: HeroBanner[] = [
  {
    id: 'banner-royal-jaipur',
    title: 'Royal Jaipur Heritage',
    subtitle: 'Magnificent 22KT polki & emerald masterworks handcrafted in Jaipur since 1936',
    highlightText: 'HOUSE OF RAMANAND JAIPUR',
    ctaText: 'EXPLORE ATELIER',
    targetCategory: 'necklaces',
    bgGradient: 'from-black/80 via-black/40 to-transparent',
    textColor: 'text-white',
    active: true,
    tagline: 'Imperial Jaipur Kundan & Polki High Jewellery',
    image: '/images/royal_jaipur_heritage_banner.jpg'
  },
  {
    id: 'banner-solitaire',
    title: 'The Solitaire Edition',
    subtitle: 'Solitaire jewellery that effortlessly elevates your everyday elegance',
    highlightText: 'CERTIFIED NATURAL DIAMONDS',
    ctaText: 'SHOP SOLITAIRES',
    targetCategory: 'rings',
    bgGradient: 'from-slate-950 via-slate-900 to-black',
    textColor: 'text-white',
    active: true,
    tagline: 'Triple Excellent Cuts with IGI & GIA Certification',
    image: '/images/solitaire_banner.jpg'
  },
  {
    id: 'banner-gifting',
    title: 'Wedding & Celebration Gifts',
    subtitle: 'Curated for Love\'s Finest Moments and Life\'s Cherished Milestones',
    highlightText: 'IMPERIAL CURATIONS',
    ctaText: 'SHOP GIFTS',
    targetCategory: 'gifting',
    bgGradient: 'from-[#172b1c] via-[#213d29] to-[#0f1d13]',
    textColor: 'text-amber-100',
    active: true,
    tagline: 'Complimentary Velvet Presentation Box & Insured Delivery',
    image: '/images/wedding_gifts_banner.jpg'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hor-ear-001',
    sku: '502995HTEAAA092JA303027',
    name: 'Stunning Rose Gold and Diamond Hoop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Hoop Earrings',
    price: 54710,
    originalPrice: 59500,
    discountPercent: 8,
    images: [
      '/images/rose_gold_earrings.jpg',
      '/images/rose_gold_earrings.jpg'
    ],
    description: 'An exemplary masterpiece cast in 18 Karat lustrous rose gold and meticulously set with 28 brilliant round-cut diamonds in micro-prong setting.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    purityBadge: '18KT Rose Gold',
    tags: ['Best Seller', 'IGI Certified', 'Daily Luxury'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Rose',
      grossWeight: 2.108,
      netGoldWeight: 2.078,
      metalType: 'Gold',
      height: '1.4 cm',
      width: '0.58 cm',
      purityScore: '18KT 750 Fineness'
    },
    diamondDetails: {
      totalWeight: 0.149,
      totalCount: 28,
      clarity: 'SI-IJ',
      colour: 'E - F',
      cut: 'Round Brilliant',
      setting: 'Micro Prong',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 2.108, label: '2.108g (Standard)', price: 54710 },
      { weight: 2.179, label: '2.179g', price: 56200 }
    ],
    priceBreakup: {
      goldValue: 18450,
      diamondValue: 24800,
      makingCharges: 8150,
      discount: 4790,
      gst: 1595,
      total: 54710
    },
    rating: 4.9,
    reviewCount: 38,
    occasion: ['Daily Wear', 'Cocktail', 'Anniversary']
  },
  {
    id: 'hor-ear-mesh',
    sku: '502995MEAA092JA301014',
    name: 'Alluring Mesh Gold Drop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Drop Earrings',
    price: 72844,
    originalPrice: 76000,
    discountPercent: 4,
    images: [
      '/images/mesh_drop_earrings.jpg',
      '/images/mesh_drop_earrings.jpg'
    ],
    description: 'Delicate filigree mesh teardrop drop earrings sculpted in 22K yellow gold. High fine craftsmanship with floral motif openwork.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    purityBadge: '22KT Yellow Gold',
    tags: ['Best Seller', 'Heritage Mesh', 'Bridal'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 6.84,
      netGoldWeight: 6.84,
      metalType: 'Gold',
      height: '2.8 cm',
      width: '1.2 cm',
      purityScore: '22KT 916 Fineness'
    },
    weightVariants: [
      { weight: 6.84, label: '6.84g', price: 72844 }
    ],
    priceBreakup: {
      goldValue: 53640,
      diamondValue: 0,
      makingCharges: 16900,
      discount: 2100,
      gst: 2196,
      total: 72844
    },
    rating: 4.9,
    reviewCount: 42,
    occasion: ['Festive', 'Traditional']
  },
  {
    id: 'hor-ear-stud',
    sku: '502995ECDEAA092JA308821',
    name: 'Elegant Chic Diamond Stud Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 67368,
    originalPrice: 71000,
    discountPercent: 5,
    images: [
      '/images/diamond_stud_earrings.jpg',
      '/images/diamond_stud_earrings.jpg'
    ],
    description: 'Geometric rhombus clustered stud earrings set with brilliant round cut natural diamonds in 18K yellow gold.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 12,
    purityBadge: '18KT Diamond',
    tags: ['IGI Certified', 'Solitaire Look', 'Modern Chic'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 2.85,
      netGoldWeight: 2.78,
      metalType: 'Gold',
      height: '1.1 cm',
      width: '1.1 cm',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.28,
      totalCount: 32,
      clarity: 'VVS-EF',
      colour: 'E - F',
      cut: 'Round Brilliant',
      setting: 'Cluster Prong',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 2.85, label: '2.85g', price: 67368 }
    ],
    priceBreakup: {
      goldValue: 22100,
      diamondValue: 36500,
      makingCharges: 6800,
      discount: 1980,
      gst: 2021,
      total: 67368
    },
    rating: 4.8,
    reviewCount: 29,
    occasion: ['Daily Luxury', 'Office Wear']
  },
  {
    id: 'hor-ear-selene',
    sku: '502995SLNEAA092JA304412',
    name: 'Selene Stone Gold Hoop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Hoop Earrings',
    price: 31161,
    originalPrice: 34000,
    discountPercent: 8,
    images: [
      '/images/rose_gold_earrings.jpg',
      '/images/rose_gold_earrings.jpg'
    ],
    description: 'Dainty stone-studded hoop earrings crafted with precision setting in 18KT yellow gold.',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 20,
    purityBadge: '18KT Gold',
    tags: ['Everyday Grace', 'Hoops'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 2.12,
      netGoldWeight: 2.05,
      metalType: 'Gold',
      height: '1.2 cm',
      width: '0.4 cm',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 2.12, label: '2.12g', price: 31161 }
    ],
    priceBreakup: {
      goldValue: 16200,
      diamondValue: 9800,
      makingCharges: 4200,
      discount: 890,
      gst: 935,
      total: 31161
    },
    rating: 4.7,
    reviewCount: 19,
    occasion: ['Daily Wear']
  },
  {
    id: 'hor-ear-stone',
    sku: '502995SHPEAA092JA309915',
    name: 'Stone Studded Hoop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Hoop Earrings',
    price: 55345,
    originalPrice: 58000,
    discountPercent: 5,
    images: [
      '/images/mesh_drop_earrings.jpg',
      '/images/mesh_drop_earrings.jpg'
    ],
    description: 'Gold huggie hoop earrings featuring a diamond encrusted square charm.',
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 10,
    purityBadge: '18KT Gold',
    tags: ['Chic Charms', 'Dangler'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 3.1,
      netGoldWeight: 3.02,
      metalType: 'Gold',
      height: '1.6 cm',
      width: '0.6 cm',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 3.1, label: '3.1g', price: 55345 }
    ],
    priceBreakup: {
      goldValue: 24100,
      diamondValue: 21500,
      makingCharges: 7900,
      discount: 1660,
      gst: 1660,
      total: 55345
    },
    rating: 4.8,
    reviewCount: 15,
    occasion: ['Evening Wear']
  },
  {
    id: 'hor-ear-chic',
    sku: '502995CDDEAA092JA301188',
    name: 'Chic Dual Done Stud Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 25404,
    originalPrice: 28000,
    discountPercent: 9,
    images: [
      '/images/diamond_stud_earrings.jpg',
      '/images/diamond_stud_earrings.jpg'
    ],
    description: 'Subtle interlocking heart motifs crafted in contrasting 18KT yellow and white gold with pavé set natural diamonds.',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 18,
    purityBadge: '18KT Gold',
    tags: ['Sub 30K', 'Daily Wear', 'Dual Tone'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Two-Tone',
      grossWeight: 1.85,
      netGoldWeight: 1.81,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.08,
      totalCount: 16,
      clarity: 'SI-IJ',
      colour: 'G - H',
      cut: 'Round Brilliant',
      setting: 'Micro Pave',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 1.85, label: '1.85g', price: 25404 }
    ],
    priceBreakup: {
      goldValue: 14500,
      diamondValue: 6200,
      makingCharges: 3900,
      discount: 760,
      gst: 762,
      total: 25404
    },
    rating: 4.9,
    reviewCount: 31,
    occasion: ['Daily Wear', 'Gifting']
  },
  {
    id: 'hor-ear-floral',
    sku: '502995FPEEAA092JA302299',
    name: 'Floral Petite Gold Stud Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 19026,
    originalPrice: 21000,
    discountPercent: 9,
    images: [
      '/images/mesh_drop_earrings.jpg',
      '/images/mesh_drop_earrings.jpg'
    ],
    description: 'Delicate 6-petal blossom flower studs in pure 22K yellow gold with high polished mirror finish.',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 25,
    purityBadge: '22KT Pure Gold',
    tags: ['Under 20K', 'Floral', 'Gifting'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 1.62,
      netGoldWeight: 1.62,
      metalType: 'Gold',
      purityScore: '22KT 916'
    },
    weightVariants: [
      { weight: 1.62, label: '1.62g', price: 19026 }
    ],
    priceBreakup: {
      goldValue: 12700,
      diamondValue: 0,
      makingCharges: 5800,
      discount: 570,
      gst: 571,
      total: 19026
    },
    rating: 5.0,
    reviewCount: 44,
    occasion: ['Daily Wear', 'Gifting']
  },
  {
    id: 'hor-coin-001',
    sku: 'HOR-999GC05G-LAKSHMI',
    name: 'Lakshmi Royal 24KT Gold Coin (5 Grams)',
    category: 'gold-coins',
    gender: 'Unisex',
    subCategory: 'Bullion Coins',
    price: 44250,
    originalPrice: 45000,
    images: [
      '/images/gold_coin.jpg'
    ],
    description: 'Auspicious Goddess Lakshmi embossed 24 Karat 999.9 purity fine gold bullion minted with House of Ramanand imperial Jaipur seal. Vacuum sealed in tamper-proof certicard blister pack.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 50,
    purityBadge: '999 Pure 24KT',
    tags: ['Investment', 'Auspicious Gifting', 'Zero Deduction'],
    metalDetails: {
      karatage: '24K',
      materialColour: 'Yellow Gold',
      grossWeight: 5.0,
      netGoldWeight: 5.0,
      metalType: 'Pure 24K Gold',
      height: '2.20 cm',
      width: '2.20 cm',
      purityScore: '999.9 Fineness'
    },
    weightVariants: [
      { weight: 1.0, label: '1.0g Coin', price: 8950 },
      { weight: 2.0, label: '2.0g Coin', price: 17800 },
      { weight: 5.0, label: '5.0g Coin', price: 44250 },
      { weight: 10.0, label: '10.0g Coin', price: 87500 }
    ],
    priceBreakup: {
      goldValue: 42100,
      diamondValue: 0,
      makingCharges: 850,
      discount: 750,
      gst: 1300,
      total: 44250
    },
    rating: 5.0,
    reviewCount: 92,
    occasion: ['Diwali', 'Dhanteras', 'Wedding Gifting']
  },
  {
    id: 'hor-ear-002',
    sku: 'HOR-18KSTU-CDD024',
    name: 'Chic Dual Tone Stud Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 25404,
    originalPrice: 28000,
    discountPercent: 9,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Subtle interlocking heart motifs crafted in contrasting 18KT yellow and white gold with pavé set natural diamonds. Designed for comfortable all-day wear.',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 18,
    purityBadge: '18KT Gold',
    tags: ['Sub 30K', 'Daily Wear', 'Dual Tone'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Two-Tone',
      grossWeight: 1.85,
      netGoldWeight: 1.81,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.08,
      totalCount: 12,
      clarity: 'VVS-EF',
      colour: 'E-F',
      cut: 'Round Brilliant',
      setting: 'Pave',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 1.85, label: '1.85g', price: 25404 }
    ],
    priceBreakup: {
      goldValue: 14200,
      diamondValue: 7800,
      makingCharges: 2650,
      discount: 2596,
      gst: 754,
      total: 25404
    },
    rating: 4.8,
    reviewCount: 21,
    occasion: ['Daily Wear', 'Office Wear']
  },
  {
    id: 'hor-ear-003',
    sku: 'HOR-22KFLR-PST019',
    name: 'Floral Petite 22KT Gold Stud Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 19026,
    originalPrice: 21500,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Charming six-petal blossoms handcrafted in pure 22 Karat Jaipur yellow gold with delicate laser micro-engravings that catch ambient sunlight.',
    isBestSeller: true,
    isNewArrival: true,
    inStock: true,
    stockCount: 25,
    purityBadge: '22KT GOLD',
    tags: ['Sub 20K', 'Pure Gold', 'Floral'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 2.24,
      netGoldWeight: 2.24,
      metalType: '22K Gold',
      purityScore: '22KT 916 Hallmark'
    },
    weightVariants: [
      { weight: 2.24, label: '2.24g', price: 19026 }
    ],
    priceBreakup: {
      goldValue: 16500,
      diamondValue: 0,
      makingCharges: 1970,
      discount: 2474,
      gst: 556,
      total: 19026
    },
    rating: 4.7,
    reviewCount: 15,
    occasion: ['Daily Wear', 'Gifting']
  },
  {
    id: 'hor-ear-004',
    sku: 'HOR-18KSLN-SH031',
    name: 'Selene Stone Gold Hoop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Hoop Earrings',
    price: 31161,
    originalPrice: 34800,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Slender gold hoops channeled with precision faceted Swarovski zirconia and natural diamond accents. Easy snap-lock mechanism.',
    isBestSeller: false,
    inStock: true,
    stockCount: 12,
    purityBadge: '18KT STONE',
    tags: ['Hoops', 'Contemporary', 'Sub 50K'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 2.65,
      netGoldWeight: 2.52,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 2.65, label: '2.65g', price: 31161 }
    ],
    priceBreakup: {
      goldValue: 20100,
      diamondValue: 7200,
      makingCharges: 2950,
      discount: 3639,
      gst: 911,
      total: 31161
    },
    rating: 4.6,
    reviewCount: 18
  },
  {
    id: 'hor-ear-005',
    sku: 'HOR-22KMSH-DRP072',
    name: 'Alluring Royal Mesh Gold Drop Earrings',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Drops',
    price: 72844,
    originalPrice: 79000,
    images: [
      'https://images.unsplash.com/photo-1543290954-41e737c1544a?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Jaipur traditional filigree lattice meshwork drops rendered in 22 Karat gold. Fluid motion with bell tassels reflecting royal court inspirations.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    purityBadge: '22KT GOLD',
    tags: ['Heritage', 'Jaipur Filigree', 'Wedding'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 8.85,
      netGoldWeight: 8.85,
      metalType: 'Gold',
      purityScore: '22KT 916 Hallmark'
    },
    weightVariants: [
      { weight: 8.85, label: '8.85g', price: 72844 }
    ],
    priceBreakup: {
      goldValue: 61500,
      diamondValue: 0,
      makingCharges: 9220,
      discount: 6156,
      gst: 2124,
      total: 72844
    },
    rating: 5.0,
    reviewCount: 29,
    occasion: ['Wedding', 'Festive', 'Party']
  },
  {
    id: 'hor-ear-006',
    sku: 'HOR-18KSTN-HPS055',
    name: 'Stone Studded Geometric Drop Hoops',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Hoop Earrings',
    price: 55345,
    originalPrice: 60200,
    images: [
      'https://images.unsplash.com/photo-1611591470452-475204278eb0?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Modern art deco silhouette with diamond-encrusted suspended rhombus elements in hallmarked 18K gold.',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 10,
    purityBadge: '18KT DIAMOND',
    tags: ['Diamond', 'Modern Deco'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 3.42,
      netGoldWeight: 3.32,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.18,
      totalCount: 24,
      clarity: 'VVS-EF',
      colour: 'E-F',
      cut: 'Round Brilliant',
      setting: 'Micro Prong',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 3.42, label: '3.42g', price: 55345 }
    ],
    priceBreakup: {
      goldValue: 24500,
      diamondValue: 21800,
      makingCharges: 7430,
      discount: 4855,
      gst: 1615,
      total: 55345
    },
    rating: 4.8,
    reviewCount: 14
  },
  {
    id: 'hor-ear-007',
    sku: 'HOR-18KCHC-DIA067',
    name: 'Elegant Chic Solitaire Cluster Diamond Studs',
    category: 'earrings',
    gender: 'Women',
    subCategory: 'Studs',
    price: 67368,
    originalPrice: 74000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'A cluster of 16 natural diamonds arranged in a kite silhouette creating the visual presence of a 1.50 carat solitaire stone.',
    isBestSeller: true,
    inStock: true,
    stockCount: 9,
    purityBadge: '18KT DIAMOND',
    tags: ['Solitaire Look', 'IGI Certified'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Two-Tone',
      grossWeight: 2.8,
      netGoldWeight: 2.65,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.28,
      totalCount: 32,
      clarity: 'VVS1-VVS2',
      colour: 'D - E',
      cut: 'Round Brilliant',
      setting: 'Pave',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 2.8, label: '2.80g', price: 67368 }
    ],
    priceBreakup: {
      goldValue: 21000,
      diamondValue: 36500,
      makingCharges: 7900,
      discount: 6632,
      gst: 1968,
      total: 67368
    },
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: 'hor-neck-001',
    sku: 'HOR-22KBDL-NCK285',
    name: 'Teardrop Solitaire Diamond Pendant Necklace',
    category: 'necklaces',
    gender: 'Women',
    subCategory: 'Necklaces',
    price: 38500,
    originalPrice: 42000,
    discountPercent: 8,
    images: [
      '/images/gold_necklace.jpg',
      '/images/gold_necklace.jpg'
    ],
    description: 'Modern luxury 22K yellow gold pendant necklace featuring a brilliant teardrop solitaire diamond centerpiece suspended on a delicate cable chain.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    purityBadge: '22KT GOLD & DIAMOND',
    tags: ['Best Seller', 'Pendant Necklace', 'Solitaire Look'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 4.8,
      netGoldWeight: 4.6,
      metalType: 'Gold',
      height: '40.0 cm',
      width: '1.2 cm',
      purityScore: '22KT 916 Hallmark'
    },
    diamondDetails: {
      totalWeight: 0.35,
      totalCount: 1,
      clarity: 'VVS1',
      colour: 'E',
      cut: 'Pear Brilliant',
      setting: 'Bezel Solitaire',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 4.8, label: '4.8g Standard', price: 38500 }
    ],
    priceBreakup: {
      goldValue: 24800,
      diamondValue: 9500,
      makingCharges: 3500,
      discount: 700,
      gst: 900,
      total: 38500
    },
    rating: 5.0,
    reviewCount: 26,
    occasion: ['Daily Luxury', 'Gifting']
  },
  {
    id: 'hor-neck-002',
    sku: 'HOR-22KROYAL-CHOKER',
    name: 'Heritage Kundan & Polki Royal Bridal Necklace Set',
    category: 'necklaces',
    gender: 'Women',
    subCategory: 'Bridal Sets',
    price: 285000,
    originalPrice: 310000,
    discountPercent: 8,
    images: [
      '/images/wedding_gifts_banner.jpg',
      '/images/gold_necklace.jpg'
    ],
    description: 'Imperial Rajputana bridal choker set complete with matching chandelier earrings. Set with syndicated uncut Polki diamonds and Zambian emerald accents.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    purityBadge: '22KT ROYAL POLKI',
    tags: ['Bridal', 'Jaipur Heritage', 'Masterpiece'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 42.5,
      netGoldWeight: 36.2,
      metalType: 'Gold',
      height: '8.5 cm',
      width: '18.0 cm',
      purityScore: '22KT 916 Hallmark'
    },
    weightVariants: [
      { weight: 42.5, label: '42.5g Complete Suite', price: 285000 }
    ],
    priceBreakup: {
      goldValue: 248000,
      diamondValue: 65000,
      makingCharges: 35000,
      discount: 71300,
      gst: 8300,
      total: 285000
    },
    rating: 5.0,
    reviewCount: 16,
    occasion: ['Wedding', 'Grand Reception']
  },
  {
    id: 'hor-ring-001',
    sku: 'HOR-18KSLT-RNG148',
    name: 'Royal Blossom Diamond & Rose Gold Ring',
    category: 'rings',
    gender: 'Women',
    subCategory: 'Floral Rings',
    price: 22400,
    originalPrice: 25000,
    images: [
      '/images/diamond_ring.jpg',
      '/images/diamond_ring.jpg'
    ],
    description: 'Delicate 18K rose gold cocktail ring with a diamond encrusted floral star clover motif band, designed for modern elegance.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    purityBadge: '18KT ROSE GOLD',
    tags: ['Engagement', 'Floral', 'Sub 25K'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Rose',
      grossWeight: 2.4,
      netGoldWeight: 2.3,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.18,
      totalCount: 19,
      clarity: 'VVS-EF',
      colour: 'E-F',
      cut: 'Round Brilliant',
      setting: 'Prong Setting',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 2.4, label: 'Ring Size 12 (2.4g)', price: 22400 },
      { weight: 2.6, label: 'Ring Size 14 (2.6g)', price: 23600 }
    ],
    priceBreakup: {
      goldValue: 12500,
      diamondValue: 6800,
      makingCharges: 2600,
      discount: 500,
      gst: 600,
      total: 22400
    },
    rating: 5.0,
    reviewCount: 38,
    occasion: ['Daily Wear', 'Anniversary']
  },
  {
    id: 'hor-ring-002',
    sku: 'HOR-18KSLT-SOLITAIRE',
    name: 'House of Ramanand Solitaire Diamond Ring (1.02 ct)',
    category: 'rings',
    gender: 'Women',
    subCategory: 'Solitaire Rings',
    price: 148000,
    originalPrice: 165000,
    images: [
      '/images/diamond_ring.jpg'
    ],
    description: 'Certified 1.02 Carat Round Brilliant Solitaire diamond mounted on a six-prong crown with a comfort-fit band.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 6,
    purityBadge: 'IGI 1.02 CT SOLITAIRE',
    tags: ['Engagement', 'Solitaire', 'IGI Certified'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Rose',
      grossWeight: 3.8,
      netGoldWeight: 3.59,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 3.8, label: 'Size 14 (3.8g)', price: 148000 }
    ],
    priceBreakup: {
      goldValue: 26000,
      diamondValue: 118000,
      makingCharges: 8300,
      discount: 8600,
      gst: 4300,
      total: 148000
    },
    rating: 5.0,
    reviewCount: 44,
    occasion: ['Engagement']
  },
  {
    id: 'hor-bgl-001',
    sku: 'HOR-22KRJP-BGL185',
    name: 'Handcrafted Heritage 22K Gold Filigree Bangle',
    category: 'bangles',
    gender: 'Women',
    subCategory: 'Bangles',
    price: 64200,
    originalPrice: 69000,
    images: [
      '/images/gold_bangle.jpg',
      '/images/gold_bangle.jpg'
    ],
    description: 'Handcrafted floral filigree openwork bangle sculpted in 22 Karat gold with delicate diamond accents.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 7,
    purityBadge: '22KT 916 GOLD',
    tags: ['Bangles', 'Filigree', 'Heritage'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 8.5,
      netGoldWeight: 8.5,
      metalType: 'Gold',
      purityScore: '22KT 916 Hallmark'
    },
    weightVariants: [
      { weight: 8.5, label: 'Size 2.4 (8.5g)', price: 64200 },
      { weight: 9.0, label: 'Size 2.6 (9.0g)', price: 67500 }
    ],
    priceBreakup: {
      goldValue: 49000,
      diamondValue: 6500,
      makingCharges: 7800,
      discount: 1000,
      gst: 1900,
      total: 64200
    },
    rating: 5.0,
    reviewCount: 27
  },
  {
    id: 'hor-pnd-001',
    sku: 'HOR-18KMLK-PND034',
    name: 'Celestial Diamond & Blue Sapphire Pendant',
    category: 'pendants',
    gender: 'Women',
    subCategory: 'Pendants',
    price: 34500,
    originalPrice: 38000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Drop pendant highlighting a natural Ceylon blue sapphire surrounded by a halo of micro-pave diamonds.',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 15,
    purityBadge: '18KT CERTIFIED',
    tags: ['Pendants', 'Gemstone', 'Sub 50K'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'White Gold',
      grossWeight: 2.1,
      netGoldWeight: 1.9,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 2.1, label: '2.10g', price: 34500 }
    ],
    priceBreakup: {
      goldValue: 14000,
      diamondValue: 18500,
      makingCharges: 3000,
      discount: 2000,
      gst: 1000,
      total: 34500
    },
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: 'hor-chn-001',
    sku: 'HOR-22KVNT-CHN089',
    name: 'Vintage Imperial Figaro Gold Chain (22KT)',
    category: 'chains',
    gender: 'Men',
    subCategory: 'Chains',
    price: 89000,
    originalPrice: 96000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Substantial solid 22 Karat gold Figaro link chain (22 inches) with heavy lobster clasp and diamond-cut edges.',
    isBestSeller: true,
    inStock: true,
    stockCount: 7,
    purityBadge: '22KT 916 GOLD',
    tags: ['Men', 'Chains', 'Solid Gold'],
    metalDetails: {
      karatage: '22K',
      materialColour: 'Yellow Gold',
      grossWeight: 12.0,
      netGoldWeight: 12.0,
      metalType: 'Gold',
      purityScore: '22KT 916 Hallmark'
    },
    weightVariants: [
      { weight: 12.0, label: '20 inch (12.0g)', price: 89000 },
      { weight: 14.5, label: '24 inch (14.5g)', price: 107000 }
    ],
    priceBreakup: {
      goldValue: 82000,
      diamondValue: 0,
      makingCharges: 9600,
      discount: 5200,
      gst: 2600,
      total: 89000
    },
    rating: 4.9,
    reviewCount: 33
  },
  {
    id: 'hor-kids-001',
    sku: 'HOR-18KKID-NZR014',
    name: 'Kids Evil Eye & Gold Beads Nazariya Bracelet',
    category: 'kids',
    gender: 'Kids',
    subCategory: 'Kids Jewellery',
    price: 14200,
    originalPrice: 16000,
    images: [
      'https://images.unsplash.com/photo-1611591470452-475204278eb0?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Protective traditional black bead and 18KT gold Nazariya bracelet designed with soft edges and adjustable sizing for tender skin.',
    isBestSeller: true,
    inStock: true,
    stockCount: 20,
    purityBadge: '18KT HALLMARK',
    tags: ['Kids', 'Nazariya', 'Gifting'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 1.4,
      netGoldWeight: 1.3,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    weightVariants: [
      { weight: 1.4, label: '1.40g', price: 14200 }
    ],
    priceBreakup: {
      goldValue: 10500,
      diamondValue: 0,
      makingCharges: 2500,
      discount: 1200,
      gst: 400,
      total: 14200
    },
    rating: 5.0,
    reviewCount: 40
  },
  {
    id: 'hor-gift-001',
    sku: 'HOR-18KGFT-NSP009',
    name: 'Solitaire Diamond Royal Nose Pin (0.05 ct)',
    category: 'gifting',
    gender: 'Women',
    subCategory: 'Nose Pins',
    price: 9800,
    originalPrice: 11200,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Dainty four-prong screw-back nose stud featuring an eye-clean VVS natural diamond in 18K yellow gold.',
    isBestSeller: true,
    inStock: true,
    stockCount: 30,
    purityBadge: '18KT DIAMOND',
    tags: ['Gifting', 'Sub 10K', 'Solitaire Look'],
    metalDetails: {
      karatage: '18K',
      materialColour: 'Yellow Gold',
      grossWeight: 0.6,
      netGoldWeight: 0.59,
      metalType: 'Gold',
      purityScore: '18KT 750'
    },
    diamondDetails: {
      totalWeight: 0.05,
      totalCount: 1,
      clarity: 'VVS-EF',
      colour: 'E-F',
      cut: 'Round Brilliant',
      setting: 'Four Prong',
      certifiedBy: 'IGI'
    },
    weightVariants: [
      { weight: 0.6, label: '0.60g', price: 9800 }
    ],
    priceBreakup: {
      goldValue: 4200,
      diamondValue: 4500,
      makingCharges: 1400,
      discount: 600,
      gst: 300,
      total: 9800
    },
    rating: 4.9,
    reviewCount: 52
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_ORDERS: Order[] = [];

export const JEWEL_PLANS: JewelPlanScheme[] = [
  {
    id: 'scheme-swarna-11',
    name: 'Swarna Nidhi 11+1 Royal Plan',
    tagline: 'Pay for 11 months, 12th month instalment is completely gifted by House of Ramanand',
    monthlyAmount: 5000,
    durationMonths: 11,
    bonusMonthPercentage: 100,
    description: 'Our most sought-after systematic gold accumulation plan. Pay 11 monthly instalments and redeem 100% of your accumulated value plus 1 full month bonus towards certified diamond & gold ornaments.',
    benefits: [
      '100% 12th Month Bonus by House of Ramanand',
      'Zero Making Charges Voucher on Final Redemption',
      'Lock in Gold Weight or Cash Value dynamically',
      'Redeemable online or across all Jaipur, Delhi & Mumbai boutiques'
    ]
  },
  {
    id: 'scheme-digi-sip',
    name: 'Daily & Monthly 24KT Digi Gold SIP',
    tagline: 'Automate 24 Karat pure gold savings from as low as ₹100/day',
    monthlyAmount: 2000,
    durationMonths: 12,
    bonusMonthPercentage: 50,
    description: 'Instant micro-accumulation backed by 99.9% fine bullion kept in insured Brink vaults with IDBI Trustee security.',
    benefits: [
      'Fractional flexibility starting at ₹100',
      'Real-time live bullion rates',
      'Convert anytime into physical gold coins or bridal jewellery'
    ]
  }
];

export const DIGI_GOLD_FAQS = [
  {
    question: 'What is Ramanand Digital Gold powered by SafeGold?',
    answer: 'Ramanand Digital Gold is an organized, secure, and transparent channel to accumulate 24 Karat 99.9% pure gold digitally. Managed in strategic institutional partnership with SafeGold, every microgram of gold you purchase is backed by physical gold bars securely held in world-class Brink\'s vaults and fully insured by independent security trustees.',
    category: 'Buy Gold'
  },
  {
    question: 'What is SafeGold?',
    answer: 'SafeGold is an organized digital gold custodian platform. It enables customers to accumulate pure physical bullion with fractional flexibility, guaranteed purity, and independent institutional trustee verification.',
    category: 'Buy Gold'
  },
  {
    question: 'What is the Purity of SafeGold offered through Ramanand Digital Gold?',
    answer: 'Every purchase guarantees 24 Karat gold of 999.9 fineness (99.9% pure gold), certified by recognized assayers and backed by physical gold deposits.',
    category: 'Buy Gold'
  },
  {
    question: 'What is the minimum and maximum amount I can purchase through Ramanand Digital Gold?',
    answer: 'You can start purchasing from as low as ₹100 up to ₹1,99,000 per transaction online without additional KYC documents. Transactions exceeding ₹2,00,000 can be executed effortlessly by submitting your PAN card.',
    category: 'Buy Gold'
  },
  {
    question: 'Is there a minimum lock in period?',
    answer: 'There is a nominal 48-hour regulatory settlement window post purchase before gold can be sold back or physically redeemed for exquisite jewellery pieces.',
    category: 'Exchange'
  },
  {
    question: 'Where can I sign up to purchase this?',
    answer: 'You are already in the official House of Ramanand digital portal. Simply register with your active mobile number to access your Digi Locker instantly.',
    category: 'Buy Gold'
  },
  {
    question: 'Can I redeem my digital gold for physical jewellery at House of Ramanand stores?',
    answer: 'Yes, absolutely! You can convert your accumulated Digi Gold balance into 24K gold coins, 22K certified bridal ornaments, or diamond jewellery at any House of Ramanand boutique or online portal.',
    category: 'Redeem'
  },
  {
    question: 'How do I sell my digital gold balance?',
    answer: 'You can sell your gold at the live sell price shown in your Digi Locker 24/7. The net proceeds are transferred directly to your verified bank account or UPI ID within 15 minutes.',
    category: 'Sell Gold'
  }
];
