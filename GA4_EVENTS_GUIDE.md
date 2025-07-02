# GA4 Events Setup Guide

## Standard GA4 Events Being Tracked

### 1. **Search Event**
```javascript
gtag('event', 'search', {
  search_term: 'samsung',
  number_of_results: 25
});
```
**Where to find in GA4:**
- Reports → Engagement → Events → `search`
- Parameters: `search_term`, `number_of_results`

### 2. **View Item Event** (E-commerce)
```javascript
gtag('event', 'view_item', {
  currency: 'USD',
  value: 699.99,
  items: [{
    item_id: 'samsung-galaxy-s7',
    item_name: 'Samsung Galaxy S7',
    category: 'Cell Phones',
    price: 699.99
  }]
});
```
**Where to find in GA4:**
- Reports → Monetization → E-commerce purchases → `view_item`
- Enhanced E-commerce section

### 3. **Filter Events**
```javascript
// When filter is applied
gtag('event', 'filter_applied', {
  filter_type: 'brand',
  filter_value: 'Samsung',
  event_category: 'ecommerce'
});

// When filter is added
gtag('event', 'filter_added', {
  filter_type: 'brand',
  filter_value: 'Samsung',
  event_category: 'ecommerce'
});

// When filter is removed
gtag('event', 'filter_removed', {
  filter_type: 'brand',
  filter_value: 'Samsung',
  event_category: 'ecommerce'
});
```

### 4. **Sort Event**
```javascript
gtag('event', 'sort_applied', {
  sort_type: 'Price (asc)',
  event_category: 'ecommerce'
});
```

## How to View Events in GA4

### **Real-Time (Immediate)**
1. Go to **Reports** → **Real-time**
2. Look for events in the "Events" card
3. Click on event names to see parameters

### **DebugView (Development)**
1. Go to **Configure** → **DebugView**
2. See detailed event parameters in real-time
3. Perfect for testing during development

### **Events Report (24-48 hours)**
1. Go to **Reports** → **Engagement** → **Events**
2. Click on event names to see details
3. View event parameters and counts

### **Custom Exploration**
1. Go to **Explore** → **Free form**
2. Add dimensions: `Event name`, `Search term`, `Filter type`
3. Add metrics: `Event count`, `Users`
4. Create custom reports for your events

## Expected Events in Your GA4

| User Action | Event Name | Key Parameters |
|-------------|------------|----------------|
| Search "samsung" | `search` | `search_term: "samsung"`, `number_of_results: 25` |
| Click product | `view_item` | `item_name`, `item_id`, `category`, `value` |
| Apply brand filter | `filter_applied` | `filter_type: "brand"`, `filter_value: "Samsung"` |
| Add filter | `filter_added` | `filter_type: "brand"`, `filter_value: "Samsung"` |
| Remove filter | `filter_removed` | `filter_type: "brand"`, `filter_value: "Samsung"` |
| Sort by price | `sort_applied` | `sort_type: "Price (asc)"` |

## Custom Dimensions (Recommended)

Set up these custom dimensions in GA4:
1. **Search Term** → `search_term`
2. **Filter Type** → `filter_type`
3. **Filter Value** → `filter_value`
4. **Sort Type** → `sort_type`
5. **Product Category** → `category`

## Testing Your Events

### **Browser Console**
Look for debug messages:
```
[GA Debug] Search event sent {searchTerm: "samsung", resultsCount: 25}
[GA Debug] Filter event sent {filterType: "brand", filterValue: "Samsung"}
[GA Debug] Product view sent {productId: "samsung-s7", productName: "Samsung Galaxy S7"}
```

### **Network Tab**
1. Open DevTools → Network
2. Filter by "google-analytics" or "gtag"
3. Look for requests to `https://www.google-analytics.com/g/collect`
4. Check request payload for your event parameters

### **GA4 DebugView**
1. Enable debug mode (already done in development)
2. Go to GA4 → Configure → DebugView
3. Perform actions on your site
4. See events appear in real-time with full parameter details

## Troubleshooting

**Events not appearing:**
- Check console for debug messages
- Verify GA_TRACKING_ID is correct
- Ensure debug mode is enabled
- Check Network tab for GA requests

**Parameters missing:**
- Events use standard GA4 parameter names
- Custom parameters may take 24-48 hours to appear
- Use DebugView for immediate parameter verification

**E-commerce events not showing:**
- Check Enhanced E-commerce is enabled in GA4
- Verify `view_item` events have proper `items` array
- Currency and value parameters are required