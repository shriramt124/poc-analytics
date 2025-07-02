# Google Analytics 4 Implementation Guide

## Overview

This repository contains a comprehensive implementation of Google Analytics 4 (GA4) in a Next.js application. The implementation follows best practices for Next.js and includes various debugging and testing tools.

## Files and Documentation

### Implementation Files

- **`pages/_document.js`**: Contains the traditional GA4 script implementation in the HTML head
- **`pages/_app.js`**: Contains the Next.js Script component implementation and route change tracking
- **`lib/gtag.js`**: Contains helper functions for tracking pageviews and events

### Documentation

- **`GA_SETUP_GUIDE.md`**: Explains how to set up Google Analytics in a Next.js application
- **`GA_IMPLEMENTATION_OPTIONS.md`**: Compares different implementation approaches (traditional vs. Next.js)
- **`GA4_EVENTS_REFERENCE.md`**: Provides a comprehensive reference for GA4 events
- **`GA_HTML_EXAMPLE.html`**: A standalone HTML example of GA4 implementation

### Testing Components

- **`components/GADebugger.js`**: Shows GA status and sends test events
- **`components/GATest.js`**: Another test component with different event types
- **`components/GAEventTester.js`**: A comprehensive event testing interface
- **`components/GADirectTest.js`**: A direct script implementation for comparison

## Implementation Approach

This project uses a dual approach to ensure Google Analytics is properly loaded and tracked:

1. **Script in `_document.js`**: Ensures the GA script is loaded in the HTML head of every page
2. **Script in `_app.js`**: Uses Next.js's Script component for optimized loading and event tracking

This dual approach provides maximum compatibility and ensures GA is loaded properly in all scenarios.

## Google Analytics Configuration

The Google Analytics tracking ID is stored in the `.env` file as `NEXT_PUBLIC_GA_ID`. The current tracking ID is `G-SSCP8MNF5L`.

## Testing Google Analytics

To test that Google Analytics is working properly:

1. Run the application with `npm run dev`
2. Open the browser console to see debug messages
3. Navigate to different pages to trigger pageview events
4. Use the testing components on the homepage to send test events
5. Check the Google Analytics dashboard to see the events

## Debugging

If Google Analytics is not working properly:

1. Check that the tracking ID in `.env` is correct
2. Verify that the script is loading in the browser (check Network tab)
3. Look for any errors in the browser console
4. Use the GA Debugger components included in this project
5. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension

## Resources

- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 E-commerce Guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Next.js Script Component](https://nextjs.org/docs/api-reference/next/script)