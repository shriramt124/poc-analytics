export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce specific tracking functions
export const trackSearch = (searchTerm, resultsCount) => {
  event({
    action: 'search',
    category: 'ecommerce',
    label: searchTerm,
    value: resultsCount,
  });
};

export const trackFilter = (filterType, filterValue) => {
  event({
    action: 'filter',
    category: 'ecommerce',
    label: `${filterType}: ${filterValue}`,
  });
};

export const trackProductView = (productId, productName, category, price) => {
  if (typeof window !== 'undefined' && window.gtag) {
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
  }
};

export const trackSort = (sortType) => {
  event({
    action: 'sort',
    category: 'ecommerce',
    label: sortType,
  });
};