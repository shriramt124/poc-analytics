import { useEffect, useState } from 'react';
import * as gtag from '../lib/gtag';

export function GATest() {
  const [eventSent, setEventSent] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    console.log('GA Test Component Loaded');
    console.log('GA_TRACKING_ID:', gtag.GA_TRACKING_ID);
    console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
    console.log('window.dataLayer exists:', typeof window !== 'undefined' && !!window.dataLayer);
    
    // Test event after 2 seconds
    setTimeout(() => {
      console.log('Sending test event from GATest component...');
      try {
        // Direct gtag call
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'gatest_direct_event', {
            event_category: 'debug',
            event_label: 'GA Test Component Direct',
            value: 1,
            debug_mode: true,
            send_to: gtag.GA_TRACKING_ID
          });
          console.log('Direct gtag call sent');
        }
        
        // Helper function call
        gtag.event({
          action: 'gatest_helper_event',
          category: 'debug',
          label: 'GA Test Component Helper',
          value: 1
        });
        console.log('Helper gtag call sent');
        setEventSent(true);
      } catch (error) {
        console.error('Error sending test event:', error);
      }
    }, 2000);
  }, []);

  const handleTestClick = () => {
    setClickCount(prev => prev + 1);
    console.log(`Test button clicked (${clickCount + 1})`);
    try {
      gtag.trackProductView('test-product-123', 'Test Product', 'Test Category', 99.99);
      console.log('Product view event sent');
      alert('Product view event sent! Check console for details.');
    } catch (error) {
      console.error('Error sending product view event:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      zIndex: 9999, 
      background: '#ff5722', 
      color: 'white', 
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      fontSize: '14px'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <strong>GA Test</strong> {eventSent ? '✅' : '⏳'}
      </div>
      <button 
        onClick={handleTestClick}
        style={{
          padding: '8px 12px',
          background: 'white',
          color: '#ff5722',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Test Product View ({clickCount})
      </button>
    </div>
  );
}