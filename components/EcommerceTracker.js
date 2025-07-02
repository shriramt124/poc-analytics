import { useEffect } from 'react';
import { useInstantSearch } from 'react-instantsearch';
import * as gtag from '../lib/gtag';

export function EcommerceTracker() {
  const { results, uiState } = useInstantSearch();

  useEffect(() => {
    // Track page view with search context
    if (results) {
      const searchQuery = uiState.products?.query || '';
      const refinements = uiState.products?.refinementList || {};
      const hierarchicalMenu = uiState.products?.hierarchicalMenu || {};
      const range = uiState.products?.range || {};
      
      // Track active filters
      Object.entries(refinements).forEach(([attribute, values]) => {
        values.forEach(value => {
          gtag.event({
            action: 'active_filter',
            category: 'ecommerce_state',
            label: `${attribute}: ${value}`,
          });
        });
      });

      // Track category browsing
      Object.entries(hierarchicalMenu).forEach(([attribute, value]) => {
        if (value) {
          gtag.event({
            action: 'browse_category',
            category: 'ecommerce_navigation',
            label: value,
          });
        }
      });

      // Track price range filtering
      Object.entries(range).forEach(([attribute, rangeValue]) => {
        if (rangeValue.min !== undefined || rangeValue.max !== undefined) {
          gtag.event({
            action: 'price_filter',
            category: 'ecommerce_filter',
            label: `${attribute}: ${rangeValue.min || 0}-${rangeValue.max || 'max'}`,
          });
        }
      });

      // Track search performance
      if (searchQuery && results.nbHits !== undefined) {
        gtag.event({
          action: 'search_performance',
          category: 'ecommerce_metrics',
          label: searchQuery,
          value: results.processingTimeMS,
        });
      }
    }
  }, [results, uiState]);

  return null; // This component doesn't render anything
}