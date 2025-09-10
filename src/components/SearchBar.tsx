import React from 'react';

export default function SearchBar({ value, onChange }:{ value:string; onChange:(s:string)=>void }){
  return (
    <div className="max-w-6xl mx-auto px-4 mb-4">
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder="Find the items you're looking for"
        className="w-full p-3 bg-gray-800 text-gray-200 rounded border border-gray-700"
      />
    </div>
  );
}
