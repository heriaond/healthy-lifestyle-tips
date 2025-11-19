export interface AdminStats {
  totalUsers: number;
  totalTips: number;
  totalFavorites: number;
  adminCount: number;
  categoryStats: Record<string, number>;
}

export interface AdminUser {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  role: string;
  emailVerified: Date | null;
  _count: {
    createdTips: number;
    favorites: number;
  };
}

export interface RecentTip {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  createdBy: { email: string | null } | null;
}
