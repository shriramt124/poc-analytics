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
            }}
            dangerouslySetInnerHTML={{
              __html: `
                console.log('GA init script running');
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_location: window.location.href,
                  page_title: document.title,
                  send_page_view: true
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
