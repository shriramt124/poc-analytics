# Setup Guide

## Quick Fix for Current Error

The **404 - Not found** error occurs because:
1. Invalid API keys in `.env` file
2. Missing 'products' collection in Typesense
3. Wrong Typesense server configuration

## Solution Steps

### Option 1: Use Local Typesense (Recommended for Development)

1. **Start Local Typesense Server:**
```bash
npm run typesenseServer
```

2. **Update .env for Local Development:**
```env
NEXT_PUBLIC_TYPESENSE_HOST=localhost
NEXT_PUBLIC_TYPESENSE_PORT=8108
NEXT_PUBLIC_TYPESENSE_PROTOCOL=http
NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=xyz
TYPESENSE_ADMIN_API_KEY=xyz
```

3. **Index Sample Data:**
```bash
npm run indexer
```

4. **Start Development Server:**
```bash
npm run dev
```

### Option 2: Use Typesense Cloud

1. **Get Your Typesense Cloud Credentials:**
   - Login to Typesense Cloud Dashboard
   - Copy your cluster URL and API keys

2. **Update .env with Real Credentials:**
```env
NEXT_PUBLIC_TYPESENSE_HOST=your-cluster-id.a1.typesense.net
NEXT_PUBLIC_TYPESENSE_PORT=443
NEXT_PUBLIC_TYPESENSE_PROTOCOL=https
NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=your-real-search-key
TYPESENSE_ADMIN_API_KEY=your-real-admin-key
```

3. **Index Data to Cloud:**
```bash
npm run indexer
```

## Current Issue

Your current `.env` has:
- `NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=Surat` ❌ (Invalid)
- `TYPESENSE_ADMIN_API_KEY=Surat` ❌ (Invalid)

**"Surat" is not a valid API key!**

## How to Run the App

1. **Install Dependencies:**
```bash
npm install
```

2. **Choose Option 1 or 2 above**

3. **Start the App:**
```bash
npm run dev
```

4. **Open:** http://localhost:3000

## Troubleshooting

- **404 Error:** Wrong API keys or missing collection
- **Connection Error:** Check host/port/protocol
- **No Results:** Run `npm run indexer` first