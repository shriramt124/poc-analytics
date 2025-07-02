import { useEffect, useState } from 'react';
import * as gtag from '../lib/gtag';

export function GADebugger() {
  const [gaStatus, setGaStatus] = useState({
    trackingId: null,
    gtagAvailable: false,
    dataLayerAvailable: false,
    scriptLoaded: false,
    eventSent: false,
    lastEventTime: null
  });

  useEffect(() => {
    console.log('GA Debugger Component Loaded');
    console.log('GA_TRACKING_ID:', gtag.GA_TRACKING_ID);
    console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
    
    // Check if dataLayer exists
    console.log('dataLayer exists:', typeof window !== 'undefined' && !!window.dataLayer);
    
    // Update initial status
    setGaStatus(prev => ({
      ...prev,
      trackingId: gtag.GA_TRACKING_ID,
      gtagAvailable: typeof window !== 'undefined' && !!window.gtag,
      dataLayerAvailable: typeof window !== 'undefined' && !!window.dataLayer
    }));
    
    // Check if GA is blocked by ad blockers
    setTimeout(() => {
      const gaScriptExists = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      console.log('GA script loaded in DOM:', !!gaScriptExists);
      
      setGaStatus(prev => ({
        ...prev,
        scriptLoaded: !!gaScriptExists
      }));
      
      // Test event
      if (typeof window !== 'undefined' && window.gtag) {
        console.log('Sending test event from GADebugger...');
        try {
          window.gtag('event', 'ga_debugger_test', {
            event_category: 'testing',
            event_label: 'GA Debugger',
            value: 1,
            debug_mode: true,
            send_to: gtag.GA_TRACKING_ID
          });
          console.log('Test event sent successfully');
          setGaStatus(prev => ({
            ...prev,
            eventSent: true,
            lastEventTime: new Date().toISOString()
          }));
        } catch (error) {
          console.error('Error sending test event:', error);
        }
      } else {
        console.error('Cannot send test event - gtag not available');
      }
    }, 2000);
  }, []);

  const sendManualTestEvent = () => {
    console.log('Manual test event triggered');
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'manual_test', {
          event_category: 'testing',
          event_label: 'Manual Test',
          value: Date.now(),
          debug_mode: true,
          send_to: gtag.GA_TRACKING_ID
        });
        console.log('Manual test event sent successfully');
        setGaStatus(prev => ({
          ...prev,
          eventSent: true,
          lastEventTime: new Date().toISOString()
        }));
        alert('Test event sent! Check GA DebugView or console.');
      } catch (error) {
        console.error('Error sending manual test event:', error);
        alert('Error sending event: ' + error.message);
      }
    } else {
      alert('Error: gtag not available!');
    }
  };

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
      maxWidth: '350px'
    }}>
      <h5 style={{ marginTop: 0 }}>GA Debugger</h5>
      <div style={{ fontSize: '11px', marginBottom: '10px' }}>
        <div><strong>Tracking ID:</strong> {gaStatus.trackingId || 'Not set'}</div>
        <div><strong>gtag available:</strong> {gaStatus.gtagAvailable ? '✅' : '❌'}</div>
        <div><strong>dataLayer available:</strong> {gaStatus.dataLayerAvailable ? '✅' : '❌'}</div>
        <div><strong>GA script loaded:</strong> {gaStatus.scriptLoaded ? '✅' : '❌'}</div>
        <div><strong>Last event sent:</strong> {gaStatus.eventSent ? '✅' : '❌'}</div>
        {gaStatus.lastEventTime && (
          <div><strong>Time:</strong> {gaStatus.lastEventTime}</div>
        )}
      </div>
      <button 
        onClick={sendManualTestEvent}
        style={{
          padding: '5px 10px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '5px'
        }}
      >
        Send Test Event
      </button>
      <button 
        onClick={() => {
          console.log('Current GA Status:', {
            'GA_TRACKING_ID': gtag.GA_TRACKING_ID,
            'window.gtag': typeof window !== 'undefined' ? window.gtag : undefined,
            'window.dataLayer': typeof window !== 'undefined' ? window.dataLayer : undefined,
            'GA script in DOM': document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
          });
          alert('GA status logged to console');
        }}
        style={{
          padding: '5px 10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Log Status
      </button>
    </div>
  );
}