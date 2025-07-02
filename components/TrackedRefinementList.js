import { useRefinementList } from 'react-instantsearch';
import * as gtag from '../lib/gtag';

export function TrackedRefinementList(props) {
  const {
    items,
    refine,
    searchForItems,
    canRefine,
    isFromSearch,
  } = useRefinementList(props);

  const handleRefine = (value) => {
    const item = items.find(item => item.value === value);
    const isRemoving = item?.isRefined;
    
    // Track the filter action
    gtag.trackFilter(props.attribute, value);
    
    // Track specific add/remove action
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', isRemoving ? 'filter_removed' : 'filter_added', {
        filter_type: props.attribute,
        filter_value: value,
        event_category: 'ecommerce',
      });
    }
    
    refine(value);
  };

  if (!canRefine) {
    return null;
  }

  return (
    <div className="ais-RefinementList">
      {props.searchable && (
        <div className="ais-RefinementList-searchBox">
          <input
            className="ais-RefinementList-searchBox-input form-control form-control-sm"
            type="search"
            placeholder={`Search ${props.attribute}...`}
            onChange={(event) => searchForItems(event.currentTarget.value)}
          />
        </div>
      )}
      <ul className="ais-RefinementList-list list-unstyled">
        {items.map((item) => (
          <li key={item.value} className="ais-RefinementList-item">
            <label className="ais-RefinementList-label d-flex align-items-center">
              <input
                className="ais-RefinementList-checkbox me-2"
                type="checkbox"
                checked={item.isRefined}
                onChange={() => handleRefine(item.value)}
              />
              <span className="ais-RefinementList-labelText flex-grow-1">
                {item.label}
              </span>
              <span className="ais-RefinementList-count badge bg-secondary">
                {item.count}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}