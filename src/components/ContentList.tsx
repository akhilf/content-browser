import React from 'react';
import ContentCard from './ContentCard';
import { ContentItem } from '../types/content';

export default function ContentList({ items }:{ items: ContentItem[] }){
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(it => <ContentCard key={String(it.id)} item={it} />)}
      </div>
    </div>
  );
}
