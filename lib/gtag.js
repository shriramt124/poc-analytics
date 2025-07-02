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
  debug('Pageview attempt', { url, GA_TRACKING_ID, hasGtag: typeof window !== 'undefined' && !!window.gtag });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: url,
        page_path: url,
        send_page_view: true,
        debug_mode: !IS_PRODUCTION // Enable debug mode in development
      });
      debug('Pageview sent', url);
    } catch (error) {
      console.error('Error sending pageview:', error);
    }
  } else {
    debug('Pageview failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID,
      trackingId: GA_TRACKING_ID
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  debug('Event attempt', { action, category, label, value, GA_TRACKING_ID, hasGtag: typeof window !== 'undefined' && !!window.gtag });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        debug_mode: !IS_PRODUCTION,
        send_to: GA_TRACKING_ID
      });
      debug('Event sent', { action, category, label, value });
    } catch (error) {
      console.error('Error sending GA event:', error);
    }
  } else {
    debug('Event failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID,
      trackingId: GA_TRACKING_ID
    });
  }
};

// E-commerce specific tracking functions
export const trackSearch = (searchTerm, resultsCount) => {
  debug('Search event attempt', { searchTerm, resultsCount });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        number_of_results: resultsCount,
        send_to: GA_TRACKING_ID,
        debug_mode: !IS_PRODUCTION
      });
      debug('Search event sent', { searchTerm, resultsCount });
    } catch (error) {
      console.error('Error sending search event:', error);
    }
  } else {
    debug('Search event failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID 
    });
  }
};

export const trackFilter = (filterType, filterValue) => {
  debug('Filter event attempt', { filterType, filterValue });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'filter_applied', {
        filter_type: filterType,
        filter_value: filterValue,
        event_category: 'ecommerce',
        send_to: GA_TRACKING_ID,
        debug_mode: !IS_PRODUCTION
      });
      debug('Filter event sent', { filterType, filterValue });
    } catch (error) {
      console.error('Error sending filter event:', error);
    }
  } else {
    debug('Filter event failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID 
    });
  }
};

export const trackProductView = (productId, productName, category, price) => {
  debug('Product view attempt', { productId, productName, category, price });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: price,
        send_to: GA_TRACKING_ID,
        debug_mode: !IS_PRODUCTION,
        items: [
          {
            item_id: productId,
            item_name: productName,
            item_category: category,
            price: price,
          },
        ],
      });
      debug('Product view sent', { productId, productName });
    } catch (error) {
      console.error('Error sending product view event:', error);
    }
  } else {
    debug('Product view failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID,
      trackingId: GA_TRACKING_ID
    });
  }
};

export const trackSort = (sortType) => {
  debug('Sort event attempt', { sortType });
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    try {
      window.gtag('event', 'sort_applied', {
        sort_type: sortType,
        event_category: 'ecommerce',
        send_to: GA_TRACKING_ID,
        debug_mode: !IS_PRODUCTION
      });
      debug('Sort event sent', { sortType });
    } catch (error) {
      console.error('Error sending sort event:', error);
    }
  } else {
    debug('Sort event failed', { 
      hasWindow: typeof window !== 'undefined', 
      hasGtag: typeof window !== 'undefined' && !!window.gtag, 
      hasTrackingId: !!GA_TRACKING_ID 
    });
  }
};