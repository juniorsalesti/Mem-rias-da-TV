/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string; // Featured image URL
  gallery?: string[]; // Extra image gallery URLs
  youtubeUrl?: string; // Optional YouTube video link
  author: string;
  date: string;
  category: string;
  tags: string[];
  views: number;
  readTime: string; // e.g. "4 min"
  isDraft: boolean;
  scheduledDate?: string; // Format: YYYY-MM-DD
  isFeatured: boolean; // Homepage massive slot
  seoTitle?: string;
  seoDescription?: string;
  commentsCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  articleTitle: string;
  userName: string;
  email: string;
  content: string;
  date: string;
  isApproved: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
  source: string; // e.g. "homepage", "sidebar", "article_end"
}

export interface CategorySpec {
  id: string;
  name: string;
  slug: string;
  color: string; // CSS tailwind colors for premium design
}

export interface TrafficSource {
  source: string;
  value: number;
  percentage: number;
}

export interface AnalyticsPeriod {
  today: number;
  yesterday: number;
  last7Days: number;
  last30Days: number;
  thisMonth: number;
  thisYear: number;
  total: number;
}

export interface UserSession {
  onlineNow: number;
  last24h: number;
  last30Days: number;
}

export interface SocialNetworkStat {
  name: string;
  visits: number;
  topArticle: string;
  shares: number;
}

export interface LocationStat {
  name: string;
  visits: number;
  type: 'state' | 'city' | 'country';
}

export interface PortalEvent {
  id: string;
  type: 'page_view' | 'click_article' | 'share' | 'dwell_time' | 'unique_visitor';
  timestamp: string; // ISO string
  articleId?: string;
  articleTitle?: string;
  source?: string; // WhatsApp, Google, Facebook, Instagram, Direto, etc.
  durationSeconds?: number; // used for dwell_time logs
  visitorId: string;
}

