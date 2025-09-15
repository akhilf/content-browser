import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ContentList from './components/ContentList';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchItems } from './redux/contentSlice';
import { useDebugPhotoUrls } from './hooks/useDebugPhotoUrls';

function readQueryParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    paid: p.get('paid') === '1',
    free: p.get('free') === '1',
    viewOnly: p.get('viewOnly') === '1',
    q: p.get('q') || '',
    visible: Number(p.get('visible') || 20)
  };
}

function writeQueryParams(state: { paid: boolean; free: boolean; viewOnly: boolean; q: string; visible: number }) {
  const p = new URLSearchParams();
  if (state.paid) p.set('paid', '1');
  if (state.free) p.set('free', '1');
  if (state.viewOnly) p.set('viewOnly', '1');
  if (state.q) p.set('q', state.q);
  if (state.visible && state.visible !== 20) p.set('visible', String(state.visible));
  const query = p.toString();
  const url = query ? window.location.pathname + '?' + query : window.location.pathname;
  window.history.replaceState({}, '', url);
}

export default function App() {
  useDebugPhotoUrls();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(s => s.content);
  const initial = readQueryParams();
  const [paid, setPaid] = useState(initial.paid);
  const [free, setFree] = useState(initial.free);
  const [viewOnly, setViewOnly] = useState(initial.viewOnly);
  const [q, setQ] = useState(initial.q);
  const [visible, setVisible] = useState(initial.visible || 20);
  const [sort, setSort] = useState<'name' | 'high' | 'low'>('name');
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    writeQueryParams({ paid, free, viewOnly, q, visible });
  }, [paid, free, viewOnly, q, visible]);

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    let arr = items.filter(it => {
      // pricing filter
      if (!paid && !free && !viewOnly) {
        // all allowed
      } else {
        // pricingOption: 0 = Paid, 1 = Free, 2 = View Only
        if (paid && it.pricingOption === 0) { }
        else if (free && it.pricingOption === 1) { }
        else if (viewOnly && it.pricingOption === 2) { }
        else return false;
      }
      // keyword
      if (lower) {
        const fields = ((it.creator || '') + ' ' + (it.title || '')).toLowerCase();
        if (!fields.includes(lower)) return false;
      }
      return true;
    });
    // Sorting
    if (sort === 'name') {
      arr = arr.slice().sort((a, b) => {
        const aName = (a.title || '').toLowerCase();
        const bName = (b.title || '').toLowerCase();
        return aName.localeCompare(bName);
      });
    } else if (sort === 'high') {
      arr = arr.slice().sort((a, b) => (Number(b.price || 0) - Number(a.price || 0)));
    } else if (sort === 'low') {
      arr = arr.slice().sort((a, b) => (Number(a.price || 0) - Number(b.price || 0)));
    }
    return arr;
  }, [items, paid, free, viewOnly, q, sort]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          setVisible(v => Math.min(v + 20, filtered.length));
        }
      });
    });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [filtered.length]);

  const visibleItems = filtered.slice(0, visible);

  function reset() {
    setPaid(false); setFree(false); setViewOnly(false); setQ(''); setVisible(20);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <SearchBar value={q} onChange={setQ} />
      <Filters
        paid={paid} free={free} viewOnly={viewOnly}
        onTogglePaid={() => setPaid(v => !v)}
        onToggleFree={() => setFree(v => !v)}
        onToggleViewOnly={() => setViewOnly(v => !v)}
        onReset={reset}
      />
      <div className="max-w-6xl mx-auto px-4 mb-4 flex justify-end">
        <select
          className="bg-gray-900 border border-gray-700 text-gray-200 rounded p-2 text-sm"
          value={sort}
          onChange={e => setSort(e.target.value as 'name' | 'high' | 'low')}
        >
          <option value="name">Sort by Name</option>
          <option value="high">Higher Price</option>
          <option value="low">Lower Price</option>
        </select>
      </div>
      <main className="max-w-6xl mx-auto px-4">
        {loading ? <div className="text-center py-8">Loading...</div> : error ? <div className="text-red-500">{String(error)}</div> : (
          <>
            <div className="mb-4 text-sm text-gray-400">Showing {visibleItems.length} of {filtered.length}</div>
            <ContentList items={visibleItems} />
            <div ref={sentinelRef} style={{ height: 1 }} />
            {visible < filtered.length && <div className="py-4 text-center text-gray-400">Loading more...</div>}
          </>
        )}
      </main>
      <footer className="max-w-6xl mx-auto px-4 py-8 text-xs text-gray-500">Data from provided API. Filters persist via URL query params.</footer>
    </div>
  );
}
