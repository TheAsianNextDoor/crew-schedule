import queryString from 'query-string';
import { FILTER_KEYS } from '../(sidebar)/filter/filter-funcs';
import { addFilterQueryParam } from '../(sidebar)/filter/filter-store';
import { getBaseHydratedMarkers } from '../stores/map-marker-store';
import { setSelectedEntity } from '../stores/selected-entity-store';

export const hydrateStateFromUrl = (url: URL) => {
  const queryParams = queryString.parse(url.search);

  for (const param in queryParams) {
    const isFilterParam = Object.values(FILTER_KEYS).some((filterKey) => filterKey === param);
    if (isFilterParam) {
      addFilterQueryParam({ [param]: queryParams[param] as string });
    }
    if (param === 'location-id') {
      const entity =
        getBaseHydratedMarkers().find(
          ({ location: { location_id } }) => location_id === queryParams[param],
        ) || null;
      setSelectedEntity(entity);
    }
  }
};
