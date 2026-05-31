export type ProductStatus =
  | "Tersedia"
  | "Sedang Dinego"
  | "Booking"
  | "Terjual"
  | "Dibatalkan";

export type ProductLifecycleStatus =
  | "available"
  | "negotiating"
  | "booked"
  | "sold"
  | "cancelled";

export type ProductCondition =
  | "Seperti Baru"
  | "Sangat Baik"
  | "Baik"
  | "Ada Minus Ringan"
  | "Perlu Perbaikan";

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  priority: number;
  featured?: boolean;
};

export type Seller = {
  id: string;
  name: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  responseRate: number;
  completedTransactions: number;
  joinedAt: string;
};

export type Product = {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  categoryId: string;
  brand: string;
  ageRange: string;
  condition: ProductCondition;
  price: number;
  isNegotiable: boolean;
  isTradeAllowed: boolean;
  defects: string;
  location: string;
  whatsappNumber?: string;
  statusKey?: ProductLifecycleStatus;
  status: ProductStatus;
  photos: string[];
  photoTone: "yellow" | "blue" | "green" | "peach" | "mint";
  createdAt: string;
  seller: Seller;
  category?: Category;
  trustSignals: string[];
  rating: number;
};

export type ProductFilters = {
  keyword: string;
  category: string;
  location: string;
  condition: string;
  status: string;
  priceRange: string;
  ageRange: string;
  sort: string;
};

export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CategoryRow = {
  id: string;
  name: string | null;
  slug: string | null;
  icon: string | null;
  priority: number | null;
  featured?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ProfileRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

export type UserRow = ProfileRow;

export type ProductRow = {
  id: string;
  seller_id?: string | null;
  sellerId?: string | null;
  title: string | null;
  description: string | null;
  category_id?: string | null;
  categoryId?: string | null;
  brand: string | null;
  age_range?: string | null;
  ageRange?: string | null;
  condition: string | null;
  price: number | null;
  is_negotiable?: boolean | null;
  isNegotiable?: boolean | null;
  is_trade_allowed?: boolean | null;
  isTradeAllowed?: boolean | null;
  defects: string | null;
  location: string | null;
  whatsapp_number?: string | null;
  whatsappNumber?: string | null;
  status: string | null;
  photos: Json | string[] | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
  sold_at?: string | null;
  soldAt?: string | null;
};

export type WishlistRow = {
  id: string;
  user_id?: string | null;
  userId?: string | null;
  product_id?: string | null;
  productId?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
};

export type SavedSearchRow = {
  id: string;
  user_id?: string | null;
  userId?: string | null;
  keyword: string | null;
  category_id?: string | null;
  categoryId?: string | null;
  location: string | null;
  max_price?: number | null;
  maxPrice?: number | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

export type TransactionRow = {
  id: string;
  product_id?: string | null;
  productId?: string | null;
  seller_id?: string | null;
  sellerId?: string | null;
  buyer_id?: string | null;
  buyerId?: string | null;
  final_price?: number | null;
  finalPrice?: number | null;
  status: string | null;
  completed_at?: string | null;
  completedAt?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

export type ReviewRow = {
  id: string;
  transaction_id?: string | null;
  transactionId?: string | null;
  reviewer_id?: string | null;
  reviewerId?: string | null;
  reviewed_user_id?: string | null;
  reviewedUserId?: string | null;
  product_accuracy_rating?: number | null;
  productAccuracyRating?: number | null;
  hygiene_rating?: number | null;
  hygieneRating?: number | null;
  communication_rating?: number | null;
  communicationRating?: number | null;
  safety_rating?: number | null;
  safetyRating?: number | null;
  comment: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

export type SupportReportRow = {
  id: string;
  user_id?: string | null;
  userId?: string | null;
  type: string | null;
  title: string | null;
  description: string | null;
  contact: string | null;
  status: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

type TableDefinition<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      categories: TableDefinition<CategoryRow>;
      products: TableDefinition<ProductRow>;
      profiles: TableDefinition<ProfileRow>;
      reviews: TableDefinition<ReviewRow>;
      saved_searches: TableDefinition<SavedSearchRow>;
      support_reports: TableDefinition<SupportReportRow>;
      transactions: TableDefinition<TransactionRow>;
      users: TableDefinition<UserRow>;
      wishlists: TableDefinition<WishlistRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
