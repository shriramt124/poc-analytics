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
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {gtag.GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            onLoad={() => console.log('GA script loaded')}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            onLoad={() => {
              console.log('GA initialized');
              console.log('GA configured with ID:', gtag.GA_TRACKING_ID);

              // Verify gtag function is available
              if (typeof window !== 'undefined' && window.gtag) {
                console.log('gtag function is available after script load');
              } else {
                console.error('gtag function is NOT available after script load');
              }
            }}
            dangerouslySetInnerHTML={{
              __html: `
                console.log('GA init script running');
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                // Make sure we're using the correct tracking ID
                const trackingId = '${gtag.GA_TRACKING_ID}';
                console.log('Configuring GA with tracking ID:', trackingId);
                
                gtag('config', trackingId, {
                  page_location: window.location.href,
                  page_title: document.title,
                  send_page_view: true,
                  debug_mode: ${process.env.NODE_ENV !== 'production'}
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
