export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Debug function
const debug = (message, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GA Debug] ${message}`, data);
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  debug('Pageview attempt', { url, GA_TRACKING_ID, hasGtag: !!window.gtag });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      debug_mode: !IS_PRODUCTION, // Enable debug mode in development
    });
    debug('Pageview sent', url);
  } else {
    debug('Pageview failed', { hasWindow: typeof window !== 'undefined', hasGtag: !!window.gtag, hasTrackingId: !!GA_TRACKING_ID });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  debug('Event attempt', { action, category, label, value, GA_TRACKING_ID, hasGtag: !!window.gtag });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      debug_mode: !IS_PRODUCTION,
    });
    debug('Event sent', { action, category, label, value });
  } else {
    debug('Event failed', { hasWindow: typeof window !== 'undefined', hasGtag: !!window.gtag, hasTrackingId: !!GA_TRACKING_ID });
  }
};

// E-commerce specific tracking functions
export const trackSearch = (searchTerm, resultsCount) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      number_of_results: resultsCount,
    });
    debug('Search event sent', { searchTerm, resultsCount });
  }
};

export const trackFilter = (filterType, filterValue) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      event_category: 'ecommerce',
    });
    debug('Filter event sent', { filterType, filterValue });
  }
};

export const trackProductView = (productId, productName, category, price) => {
  debug('Product view attempt', { productId, productName, category, price });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          category: category,
          price: price,
        },
      ],
    });
    debug('Product view sent', { productId, productName });
  } else {
    debug('Product view failed', { hasWindow: typeof window !== 'undefined', hasGtag: !!window.gtag, hasTrackingId: !!GA_TRACKING_ID });
  }
};

export const trackSort = (sortType) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'sort_applied', {
      sort_type: sortType,
      event_category: 'ecommerce',
    });
    debug('Sort event sent', { sortType });
  }
};