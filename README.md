# Retail Store

<img width="1198" height="944" alt="Screenshot 2025-09-15 at 7 19 14 AM" src="https://github.com/user-attachments/assets/7ad76344-ad63-4865-8544-b7e341d635c4" />
<img width="1138" height="940" alt="Screenshot 2025-09-15 at 7 19 26 AM" src="https://github.com/user-attachments/assets/aa7c114b-4f27-4dc0-8f6c-8166edd7d393" />
<img width="1153" height="944" alt="Screenshot 2025-09-15 at 7 19 36 AM" src="https://github.com/user-attachments/assets/1b04db8d-732e-411b-b4ae-0d60753feed7" />




This is a Vite + React + TypeScript project implementing Retail Store features:
- Keyword search
- Pricing filters (Paid / Free / View Only)
- Responsive content grid
- **Infinite scroll** (loads more items as you scroll to the bottom)
- Sort options (by name, higher price, lower price)
- URL query persistence for filters/search
## Sort Options

You can sort the content list using the dropdown above the grid:
- **Sort by Name**: Alphabetical order (default)
- **Higher Price**: Items with higher price first
- **Lower Price**: Items with lower price first

The selected sort order is applied instantly to the visible items.


## Infinite Scroll Implementation

The content list uses an infinite scroll mechanism:
- As you scroll to the bottom of the list, more items are automatically loaded.
- This is implemented using an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) on a sentinel div at the end of the list (see `App.tsx`).
- The number of visible items increases in increments (default 20 at a time).
- The current scroll state (number of visible items) is also reflected in the URL query params for persistence and shareability.


## Setup

Requires Node.js >= 20.19.0

Install:
```
npm install
```

Run:
```
npm run dev
```

Run tests:
```
npm test
```
