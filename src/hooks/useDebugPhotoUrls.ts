import { useEffect } from 'react';
import { useAppSelector } from '../hooks';

export function useDebugPhotoUrls() {
  const { items } = useAppSelector(s => s.content);
  useEffect(() => {
    if (items && items.length) {
      // Log the first item fully to inspect its keys
      console.log('First item from API:', items[0]);
    }
  }, [items]);
}
