import React from 'react';

export default function Filters({
  paid, free, viewOnly, onTogglePaid, onToggleFree, onToggleViewOnly, onReset
}:{ 
  paid:boolean; free:boolean; viewOnly:boolean;
  onTogglePaid:()=>void; onToggleFree:()=>void; onToggleViewOnly:()=>void; onReset:()=>void;
}){
  return (
    <div className="max-w-6xl mx-auto px-4 mb-4">
      <div className="bg-gray-900 border border-teal-700 p-4 rounded">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-teal-300">Contents Filter</div>
          <button className="text-xs text-gray-400" onClick={onReset}>RESET</button>
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={paid} onChange={onTogglePaid} /> Paid</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={free} onChange={onToggleFree} /> Free</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={viewOnly} onChange={onToggleViewOnly} /> View Only</label>
        </div>
      </div>
    </div>
  )
}
