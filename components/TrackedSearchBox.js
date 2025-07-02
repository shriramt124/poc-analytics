import { useSearchBox } from 'react-instantsearch';
import { useEffect, useRef } from 'react';
import * as gtag from '../lib/gtag';

export function TrackedSearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const timeoutRef = useRef(null);
  const previousQueryRef = useRef('');

  useEffect(() => {
    // Track search with debouncing to avoid too many events
    if (query && query !== previousQueryRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        gtag.trackSearch(query, 0); // Results count will be updated by Stats component
        previousQueryRef.current = query;
      }, 1000); // 1 second debounce
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  return (
    <div className="ais-SearchBox">
      <form className="ais-SearchBox-form" noValidate>
        <input
          className="ais-SearchBox-input form-control"
          type="search"
          placeholder="Search products..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={512}
          value={query}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <button
          className="ais-SearchBox-submit btn btn-primary"
          type="submit"
          title="Submit the search query"
        >
          <svg width="13" height="13" viewBox="0 0 13 13">
            <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4.8495 7.8226c.82666-.82666 2.3684-.82666 3.1951 0 .82666.82666.82666 2.3684 0 3.1951-.82666.82666-2.3684.82666-3.1951 0-.82666-.82666-.82666-2.3684 0-3.1951" />
              <path d="m11.742 11.742-2.06-2.06" />
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}