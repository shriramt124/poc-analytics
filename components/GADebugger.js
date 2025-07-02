import { useEffect } from 'react';
import * as gtag from '../lib/gtag';

export function GADebugger() {
  useEffect(() => {
    console.log('GA Debugger Component Loaded');
    console.log('GA_TRACKING_ID:', gtag.GA_TRACKING_ID);
    console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
    
    // Check if dataLayer exists
    console.log('dataLayer exists:', typeof window !== 'undefined' && !!window.dataLayer);
    
    // Check if GA is blocked by ad blockers
    setTimeout(() => {
      const gaScriptExists = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      console.log('GA script loaded in DOM:', !!gaScriptExists);
      
      // Test event
      if (typeof window !== 'undefined' && window.gtag) {
        console.log('Sending test event from GADebugger...');
        window.gtag('event', 'ga_debugger_test', {
          event_category: 'testing',
          event_label: 'GA Debugger',
          value: 1,
          debug_mode: true
        });
      } else {
        console.error('Cannot send test event - gtag not available');
      }
    }, 2000);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      left: '10px', 
      zIndex: 9999, 
      background: '#f0f8ff', 
      color: '#333', 
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h5>GA Debugger</h5>
      <p>Check console for GA debug info</p>
      <button 
        onClick={() => {
          console.log('Manual test event triggered');
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'manual_test', {
              event_category: 'testing',
              event_label: 'Manual Test',
              value: Date.now(),
              debug_mode: true
            });
            alert('Test event sent! Check GA DebugView or console.');
          } else {
            alert('Error: gtag not available!');
          }
        }}
        style={{
          padding: '5px 10px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send Test Event
      </button>
    </div>
  );
}