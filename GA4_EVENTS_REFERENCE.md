# Google Analytics 4 (GA4) Events Reference for Next.js

## Overview

This document provides a comprehensive reference for implementing Google Analytics 4 (GA4) events in a Next.js application. It covers standard GA4 events, custom events, and best practices for implementation.

## Standard GA4 Events

GA4 has a set of recommended events with predefined parameters. Here are the most common ones used in e-commerce applications:

### Navigation & Engagement Events

| Event Name | Description | Required Parameters | Optional Parameters |
|------------|-------------|---------------------|--------------------|
| `page_view` | User views a page | `page_location`, `page_title` | `page_referrer` |
| `scroll` | User scrolls page | `percent_scrolled` | - |
| `click` | User clicks an element | `element_name`, `element_class` | `element_id` |
| `file_download` | User downloads a file | `file_name`, `file_extension` | `link_url`, `link_text` |
| `video_start` | User starts a video | `video_title` | `video_duration` |

### Search Events

| Event Name | Description | Required Parameters | Optional Parameters |
|------------|-------------|---------------------|--------------------|
| `search` | User performs a search | `search_term` | `number_of_results` |
| `view_search_results` | User views search results | `search_term` | `number_of_results` |

### E-commerce Events

| Event Name | Description | Required Parameters | Optional Parameters |
|------------|-------------|---------------------|--------------------|
| `view_item_list` | User views a list of items | `items` | `item_list_name`, `item_list_id` |
| `view_item` | User views an item | `items` | `currency`, `value` |
| `select_item` | User selects an item | `items`, `item_list_name` | `item_list_id` |
| `add_to_cart` | User adds item to cart | `items`, `currency`, `value` | - |
| `remove_from_cart` | User removes item from cart | `items`, `currency`, `value` | - |
| `view_cart` | User views cart | `items`, `currency`, `value` | - |
| `begin_checkout` | User begins checkout | `items`, `currency`, `value` | `coupon` |
| `add_shipping_info` | User adds shipping info | `items`, `currency`, `value`, `shipping_tier` | `coupon` |
| `add_payment_info` | User adds payment info | `items`, `currency`, `value`, `payment_type` | `coupon` |
| `purchase` | User completes purchase | `transaction_id`, `items`, `currency`, `value` | `tax`, `shipping`, `coupon` |

## Implementation Examples

### Basic Pageview Tracking

```javascript
// In lib/gtag.js
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: url,
        page_path: url,
        send_page_view: true
      });
    } catch (error) {
      console.error('Error sending pageview:', error);
    }
  }
};

// In _app.js
useEffect(() => {
  const handleRouteChange = (url) => {
    gtag.pageview(url);
  };
  router.events.on('routeChangeComplete', handleRouteChange);
  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
}, [router.events]);
```

### Search Event

```javascript
// In lib/gtag.js
export const trackSearch = (searchTerm, resultsCount) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        number_of_results: resultsCount,
        send_to: GA_TRACKING_ID
      });
    } catch (error) {
      console.error('Error sending search event:', error);
    }
  }
};

// In your search component
const handleSearch = (term) => {
  // Perform search...
  const results = performSearch(term);
  // Track the search
  gtag.trackSearch(term, results.length);
};
```

### Product View Event

```javascript
// In lib/gtag.js
export const trackProductView = (productId, productName, category, price) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: price,
        send_to: GA_TRACKING_ID,
        items: [
          {
            item_id: productId,
            item_name: productName,
            item_category: category,
            price: price,
          },
        ],
      });
    } catch (error) {
      console.error('Error sending product view event:', error);
    }
  }
};

// In your product component
useEffect(() => {
  gtag.trackProductView(product.id, product.name, product.category, product.price);
}, [product]);
```

## Custom Events

You can also create custom events for specific actions in your application:

```javascript
// In lib/gtag.js
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        send_to: GA_TRACKING_ID
      });
    } catch (error) {
      console.error('Error sending GA event:', error);
    }
  }
};

// Usage in a component
const handleButtonClick = () => {
  gtag.event({
    action: 'button_click',
    category: 'engagement',
    label: 'signup_button',
    value: 1
  });
};
```

## E-commerce Item Structure

For e-commerce events, the `items` parameter should be an array of objects with this structure:

```javascript
items: [
  {
    item_id: 'SKU_12345',
    item_name: 'Product Name',
    item_brand: 'Brand Name',
    item_category: 'Category',
    item_category2: 'Subcategory',
    item_variant: 'Variant',
    price: 19.99,
    quantity: 1,
    discount: 2.00,
    coupon: 'SUMMER_SALE',
    index: 0, // Position in a list
    item_list_name: 'Search Results',
    item_list_id: 'search_results_123'
  }
]
```

## Best Practices

1. **Error Handling**: Always wrap GA calls in try/catch blocks
2. **Check for Window**: Ensure `window` is defined before using it (for SSR compatibility)
3. **Check for GA**: Verify that `window.gtag` exists before calling it
4. **Debug Mode**: Enable debug mode in development
5. **Consistent Parameters**: Use consistent parameter names across events
6. **Minimal Data**: Only send the data you need for analysis
7. **User Privacy**: Respect user privacy and comply with regulations like GDPR

## Debugging

To debug GA4 events:

1. Use the GA4 DebugView in the Google Analytics dashboard
2. Enable debug mode in your GA configuration
3. Use the Google Analytics Debugger Chrome extension
4. Check the Network tab in your browser's developer tools
5. Use the debugging components included in this project

## Resources

- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 E-commerce Guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Next.js Script Component](https://nextjs.org/docs/api-reference/next/script)