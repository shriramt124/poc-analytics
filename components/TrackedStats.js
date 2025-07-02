import { useStats, useSearchBox } from 'react-instantsearch';
import { useEffect, useRef } from 'react';
import * as gtag from '../lib/gtag';

export function TrackedStats(props) {
  const { nbHits, processingTimeMS } = useStats(props);
  const { query } = useSearchBox();
  const previousQueryRef = useRef('');

  useEffect(() => {
    // Track search results count when query changes
    if (query && query !== previousQueryRef.current) {
      gtag.trackSearch(query, nbHits);
      previousQueryRef.current = query;
    }
  }, [query, nbHits]);

  let hitCountPhrase;
  if (nbHits === 0) {
    hitCountPhrase = 'No products';
  } else if (nbHits === 1) {
    hitCountPhrase = '1 product';
  } else {
    hitCountPhrase = `${nbHits.toLocaleString()} products`;
  }

  return (
    <div className="ais-Stats">
      <span className="ais-Stats-text">
        {hitCountPhrase} found in {processingTimeMS.toLocaleString()}ms
      </span>
    </div>
  );
}