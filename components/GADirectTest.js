import { useEffect } from 'react';
import Head from 'next/head';
import * as gtag from '../lib/gtag';

export function GADirectTest() {
  useEffect(() => {
    console.log('GADirectTest component mounted');
    
    // Check if GA is loaded after a delay
    setTimeout(() => {
      console.log('Checking GA status from GADirectTest...');
      console.log('GA_TRACKING_ID:', gtag.GA_TRACKING_ID);
      console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
      console.log('window.dataLayer exists:', typeof window !== 'undefined' && !!window.dataLayer);
      
      // Try to send a direct event
      if (typeof window !== 'undefined' && window.gtag) {
        try {
          console.log('Sending direct test event...');
          window.gtag('event', 'direct_test_event', {
            event_category: 'testing',
            event_label: 'Direct Test',
            value: Date.now(),
            debug_mode: true,
            send_to: gtag.GA_TRACKING_ID
          });
          console.log('Direct test event sent');
        } catch (error) {
          console.error('Error sending direct test event:', error);
        }
      }
    }, 3000);
  }, []);

  return (
    <Head>
      {/* Add a direct GA script to the head */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log('Direct GA script running');
            
            // Check if GA is already initialized
            if (typeof window !== 'undefined') {
              console.log('GA direct script - window.gtag exists:', !!window.gtag);
              console.log('GA direct script - window.dataLayer exists:', !!window.dataLayer);
              
              // Initialize dataLayer if it doesn't exist
              window.dataLayer = window.dataLayer || [];
              
              // Define gtag function if it doesn't exist
              if (typeof window.gtag !== 'function') {
                console.log('Defining gtag function from direct script');
                window.gtag = function() {
                  window.dataLayer.push(arguments);
                  console.log('Direct gtag called with:', JSON.stringify(Array.from(arguments)));
                };
              }
              
              // Send a test event
              setTimeout(() => {
                try {
                  console.log('Sending inline script test event');
                  window.gtag('event', 'inline_script_test', {
                    event_category: 'testing',
                    event_label: 'Inline Script Test',
                    value: Date.now(),
                    debug_mode: true,
                    send_to: '${gtag.GA_TRACKING_ID}'
                  });
                  console.log('Inline script test event sent');
                } catch (error) {
                  console.error('Error sending inline script test event:', error);
                }
              }, 2000);
            }
          `,
        }}
      />
    </Head>
  );
}