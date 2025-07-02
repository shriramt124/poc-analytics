import { useState, useEffect } from 'react';
import * as gtag from '../lib/gtag';

export function GAEventTester() {
  const [eventHistory, setEventHistory] = useState([]);
  const [eventType, setEventType] = useState('custom_event');
  const [eventName, setEventName] = useState('test_event');
  
  // Log all events to our history
  const logEvent = (type, name, params) => {
    const timestamp = new Date().toISOString();
    setEventHistory(prev => [
      { type, name, params, timestamp, status: 'sent' },
      ...prev
    ].slice(0, 10)); // Keep only the last 10 events
  };

  // Send a custom event
  const sendCustomEvent = () => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        const eventParams = {
          event_category: 'testing',
          event_label: 'Custom Test',
          value: Date.now(),
          debug_mode: true,
          send_to: gtag.GA_TRACKING_ID
        };
        
        window.gtag('event', eventName, eventParams);
        console.log(`Custom event '${eventName}' sent with params:`, eventParams);
        logEvent('custom', eventName, eventParams);
        alert(`Event '${eventName}' sent! Check console for details.`);
      } else {
        alert('Error: gtag not available!');
      }
    } catch (error) {
      console.error('Error sending custom event:', error);
      alert(`Error sending event: ${error.message}`);
    }
  };

  // Send a standard GA4 event
  const sendStandardEvent = () => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        // Different event types with their required parameters
        const eventParams = {
          debug_mode: true,
          send_to: gtag.GA_TRACKING_ID
        };
        
        // Add specific parameters based on event type
        switch(eventType) {
          case 'page_view':
            Object.assign(eventParams, {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname
            });
            break;
          case 'search':
            Object.assign(eventParams, {
              search_term: 'test search query',
              number_of_results: 42
            });
            break;
          case 'view_item':
            Object.assign(eventParams, {
              currency: 'USD',
              value: 99.99,
              items: [{
                item_id: 'TEST123',
                item_name: 'Test Product',
                item_category: 'Test Category',
                price: 99.99
              }]
            });
            break;
          default:
            // Keep default params
        }
        
        window.gtag('event', eventType, eventParams);
        console.log(`Standard event '${eventType}' sent with params:`, eventParams);
        logEvent('standard', eventType, eventParams);
        alert(`Event '${eventType}' sent! Check console for details.`);
      } else {
        alert('Error: gtag not available!');
      }
    } catch (error) {
      console.error('Error sending standard event:', error);
      alert(`Error sending event: ${error.message}`);
    }
  };

  // Send event using our gtag.js helper functions
  const sendHelperEvent = () => {
    try {
      switch(eventType) {
        case 'pageview':
          gtag.pageview(window.location.pathname);
          logEvent('helper', 'pageview', { url: window.location.pathname });
          break;
        case 'search':
          gtag.trackSearch('test search query', 42);
          logEvent('helper', 'search', { searchTerm: 'test search query', resultsCount: 42 });
          break;
        case 'filter':
          gtag.trackFilter('category', 'test category');
          logEvent('helper', 'filter', { filterType: 'category', filterValue: 'test category' });
          break;
        case 'product_view':
          gtag.trackProductView('TEST123', 'Test Product', 'Test Category', 99.99);
          logEvent('helper', 'product_view', { 
            productId: 'TEST123', 
            productName: 'Test Product', 
            category: 'Test Category', 
            price: 99.99 
          });
          break;
        case 'sort':
          gtag.trackSort('price_desc');
          logEvent('helper', 'sort', { sortType: 'price_desc' });
          break;
        default:
          gtag.event({
            action: 'custom_helper_event',
            category: 'testing',
            label: 'Helper Test',
            value: Date.now()
          });
          logEvent('helper', 'custom_helper_event', { 
            category: 'testing', 
            label: 'Helper Test', 
            value: Date.now() 
          });
      }
      
      console.log(`Helper event '${eventType}' sent`);
      alert(`Helper event '${eventType}' sent! Check console for details.`);
    } catch (error) {
      console.error('Error sending helper event:', error);
      alert(`Error sending event: ${error.message}`);
    }
  };

  // Check GA status on mount
  useEffect(() => {
    const checkGAStatus = () => {
      const status = {
        trackingId: gtag.GA_TRACKING_ID,
        gtagAvailable: typeof window !== 'undefined' && !!window.gtag,
        dataLayerAvailable: typeof window !== 'undefined' && !!window.dataLayer,
        scriptLoaded: false
      };
      
      if (typeof document !== 'undefined') {
        status.scriptLoaded = !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      }
      
      console.log('GA Status in EventTester:', status);
      return status;
    };
    
    // Check immediately and after a delay
    const initialStatus = checkGAStatus();
    
    setTimeout(() => {
      const delayedStatus = checkGAStatus();
      console.log('GA Status after delay:', delayedStatus);
      
      // If GA is available, send a test event
      if (delayedStatus.gtagAvailable && delayedStatus.trackingId) {
        console.log('Sending initialization test event');
        try {
          window.gtag('event', 'event_tester_init', {
            event_category: 'testing',
            event_label: 'EventTester Initialization',
            debug_mode: true,
            send_to: gtag.GA_TRACKING_ID
          });
          logEvent('init', 'event_tester_init', { status: 'success' });
        } catch (error) {
          console.error('Error sending init test event:', error);
          logEvent('init', 'event_tester_init', { status: 'error', error: error.message });
        }
      }
    }, 2000);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      zIndex: 9999, 
      background: '#f8f9fa', 
      color: '#333', 
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontSize: '14px',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <h4 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '8px' }}>GA Event Tester</h4>
      
      <div style={{ marginBottom: '15px' }}>
        <h5 style={{ marginBottom: '8px' }}>Send Custom Event</h5>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Event Name:</label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <button 
          onClick={sendCustomEvent}
          style={{
            padding: '8px 12px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          Send Custom Event
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h5 style={{ marginBottom: '8px' }}>Send Standard GA4 Event</h5>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Event Type:</label>
          <select 
            value={eventType} 
            onChange={(e) => setEventType(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          >
            <option value="page_view">page_view</option>
            <option value="search">search</option>
            <option value="view_item">view_item</option>
            <option value="add_to_cart">add_to_cart</option>
            <option value="begin_checkout">begin_checkout</option>
            <option value="purchase">purchase</option>
            <option value="custom_event">custom_event</option>
          </select>
        </div>
        <button 
          onClick={sendStandardEvent}
          style={{
            padding: '8px 12px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          Send Standard Event
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h5 style={{ marginBottom: '8px' }}>Use Helper Functions</h5>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Helper Type:</label>
          <select 
            value={eventType} 
            onChange={(e) => setEventType(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          >
            <option value="pageview">pageview</option>
            <option value="search">search</option>
            <option value="filter">filter</option>
            <option value="product_view">product_view</option>
            <option value="sort">sort</option>
            <option value="custom">custom</option>
          </select>
        </div>
        <button 
          onClick={sendHelperEvent}
          style={{
            padding: '8px 12px',
            background: '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Use Helper Function
        </button>
      </div>
      
      <div>
        <h5 style={{ marginBottom: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>Event History</h5>
        {eventHistory.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#666' }}>No events sent yet</p>
        ) : (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {eventHistory.map((event, index) => (
              <div key={index} style={{ 
                fontSize: '12px', 
                padding: '6px', 
                marginBottom: '6px', 
                background: '#f1f1f1',
                borderRadius: '4px'
              }}>
                <div><strong>Type:</strong> {event.type} | <strong>Name:</strong> {event.name}</div>
                <div><strong>Time:</strong> {event.timestamp}</div>
                <div><strong>Status:</strong> {event.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}