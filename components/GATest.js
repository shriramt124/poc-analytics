import { useEffect } from 'react';
import * as gtag from '../lib/gtag';

export function GATest() {
  useEffect(() => {
    console.log('GA Test Component Loaded');
    console.log('GA_TRACKING_ID:', gtag.GA_TRACKING_ID);
    console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
    
    // Test event after 2 seconds
    setTimeout(() => {
      console.log('Sending test event...');
      gtag.event({
        action: 'test_event',
        category: 'debug',
        label: 'GA Test Component',
        value: 1
      });
    }, 2000);
  }, []);

  const handleTestClick = () => {
    console.log('Test button clicked');
    gtag.trackProductView('test-product-123', 'Test Product', 'Test Category', 99.99);
  };

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'red', color: 'white', padding: '10px' }}>
      <button onClick={handleTestClick}>Test GA Product Click</button>
    </div>
  );
}