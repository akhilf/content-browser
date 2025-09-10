import React from 'react';
import { ContentItem } from '../types/content';

const PRICING_LABELS = ['Paid', 'Free', 'View Only'];

export default function ContentCard({ item }:{ item: ContentItem }){
  const placeholder = "https://via.placeholder.com/300x200?text=No+Image";
  const imageUrl = item.imagePath || placeholder;
  const pricingLabel = typeof item.pricingOption === 'number' ? PRICING_LABELS[item.pricingOption] : (item.pricingOption || '—');
  return (
    <article className="bg-gray-900 rounded overflow-hidden border border-gray-700">
      <div className="h-56 bg-gray-800 flex items-center justify-center overflow-hidden">
        <img src={imageUrl} alt={item.title||item.creator} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-400">{item.creator || 'Unknown'}</div>
        <h3 className="font-medium truncate">{item.title || 'Untitled'}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-400">{pricingLabel}</div>
          { pricingLabel === 'Paid' ? <div className="font-semibold">${Number(item.price||0).toFixed(2)}</div>
            : pricingLabel === 'Free' ? <div className="font-semibold">FREE</div>
            : <div className="font-semibold">View Only</div>
          }
        </div>
      </div>
    </article>
  );
}
