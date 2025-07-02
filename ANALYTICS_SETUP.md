# Google Analytics Setup Guide

## Overview
This project now includes comprehensive Google Analytics 4 (GA4) tracking for e-commerce search and browsing behavior.

## Setup Steps

### 1. Create Google Analytics Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: G-XXXXXXXXXX)

### 2. Configure Environment Variables
Update your `.env` file:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### 3. Install Dependencies
```bash
npm install gtag
# or
yarn add gtag
```

## Tracked Events

### Search Events
- **search**: Tracks search queries with result counts
- **search_performance**: Tracks search response times

### Filter Events
- **filter**: Tracks when users apply/remove filters
- **add_filter**: Tracks filter additions
- **remove_filter**: Tracks filter removals
- **price_filter**: Tracks price range filtering
- **browse_category**: Tracks category navigation

### Product Events
- **view_item**: Tracks product clicks with enhanced e-commerce data
- **sort**: Tracks sorting preference changes

### Navigation Events
- **page_view**: Automatic page view tracking
- **active_filter**: Tracks current filter state

## Custom Dimensions (Recommended)
Set up these custom dimensions in GA4:
1. Search Query
2. Search Results Count
3. Filter Type
4. Product Category
5. Sort Method

## E-commerce Enhanced Events
The implementation includes GA4 Enhanced E-commerce events:
- Item views with product details
- Search tracking with query and results
- Filter usage patterns
- User journey through categories

## Viewing Data
1. Go to your GA4 property
2. Navigate to Reports > Engagement > Events
3. Look for custom events: search, filter, view_item, sort
4. Use Explore to create custom reports

## Privacy Considerations
- All tracking respects user privacy
- No personal information is collected
- Consider implementing cookie consent if required by your jurisdiction
- Data is anonymized by default

## Testing
1. Open browser developer tools
2. Go to Network tab
3. Search for "google-analytics" requests
4. Perform searches and filters to see events being sent

## Troubleshooting
- Ensure `NEXT_PUBLIC_GA_ID` is set correctly
- Check browser console for errors
- Verify GA4 property is active
- Data may take 24-48 hours to appear in reports