import '../styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Debug GA loading
  useEffect(() => {
    console.log('GA_TRACKING_ID in _app.js:', gtag.GA_TRACKING_ID);

    // Check if GA is properly initialized after a delay
    setTimeout(() => {
      console.log('Checking GA initialization status...');
      console.log('window.gtag available:', typeof window !== 'undefined' && !!window.gtag);
      console.log('window.dataLayer available:', typeof window !== 'undefined' && !!window.dataLayer);

      // Force a pageview to ensure GA is working
      if (typeof window !== 'undefined' && window.gtag && gtag.GA_TRACKING_ID) {
        console.log('Forcing initial pageview with:', window.location.pathname);
        gtag.pageview(window.location.pathname);
      }
    }, 3000);
  }, []);

  return (
    <>
      {/* We're now using _document.js for the main GA script loading */}
      {/* This script is just for route change tracking and debugging */}
      {gtag.GA_TRACKING_ID && (
        <Script
          id="gtag-route-tracker"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('GA route tracker initialized');
            console.log('Using tracking ID:', gtag.GA_TRACKING_ID);

            // Verify gtag function is available
            if (typeof window !== 'undefined' && window.gtag) {
              console.log('gtag function is available');
              
              // Send an initial pageview to ensure tracking is working
              try {
                gtag.pageview(window.location.pathname);
                console.log('Initial pageview sent for:', window.location.pathname);
              } catch (error) {
                console.error('Error sending initial pageview:', error);
              }
            } else {
              console.error('gtag function is NOT available');
            }
          }}
        />
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
