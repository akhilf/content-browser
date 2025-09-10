export type PricingType = 'paid' | 'free' | 'viewOnly';

export interface ContentItem {
  id: number | string;
  imagePath?: string;
  creator?: string;
  title?: string;
  pricingOption?: number; // 0: Paid, 1: Free, 2: View Only
  price?: number | null;
}
