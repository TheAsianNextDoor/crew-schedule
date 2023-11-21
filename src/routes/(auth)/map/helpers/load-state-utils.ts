import queryString from 'query-string';
import { FILTER_KEYS } from '../filter/filter-funcs';
import { addFilterQueryParam } from '../filter/filter-store';
import {
  getBaseHydratedMarkers,
  setSelectedHydratedMarker,
  type HydratedMapMarker,
} from '../stores/map-marker-store';
import type { HydratedSelectedEntity } from '../../../api/v1/auth/customer/[customerId]/location/types';
import type { HydratedSelectedSite } from '../../../api/v1/auth/customer/[customerId]/location/[locationId]/site/+server';
import type { SelectedMobilizationHub } from '../../../api/v1/auth/customer/[customerId]/location/[locationId]/mobilization-hub/retrieve-selected-mobilization-hub';

export const loadFiltersFromUrl = (url: URL) => {
  const queryParams = queryString.parse(url.search);

  for (const param in queryParams) {
    const isFilterParam = Object.values(FILTER_KEYS).some((filterKey) => filterKey === param);
    if (isFilterParam) {
      addFilterQueryParam({ [param]: queryParams[param] as string });
    }
  }
};

export const loadSelectedHydratedMarkerFromUrl = (url: URL) => {
  const selectedLocationId = url.searchParams.get('selected-location');
  const hydratedMarkers = getBaseHydratedMarkers();

  if (selectedLocationId && hydratedMarkers) {
    const entity =
      hydratedMarkers.find(({ location: { location_id } }) => location_id === selectedLocationId) ||
      null;
    setSelectedHydratedMarker(entity);
  }
};

export const loadSelectedEntityFromUrl = async (
  customerId: string,
  selectedLocation: string,
  selectedHydratedMarker: HydratedMapMarker | null,
): Promise<HydratedSelectedEntity> => {
  if (selectedLocation && selectedHydratedMarker) {
    const entityType = selectedHydratedMarker.location.type;

    if (entityType === 'site') {
      const result = (await (
        await fetch(`/api/v1/auth/customer/${customerId}/location/${selectedLocation}/site`, {
          method: 'GET',
        })
      ).json()) as HydratedSelectedEntity<HydratedSelectedSite[]>;

      return {
        entity: result.entity,
        address: result.address,
        type: result.type,
      };
    }

    if (entityType === 'mobilizationHub') {
      const result = (await (
        await fetch(
          `/api/v1/auth/customer/${customerId}/location/${selectedLocation}/mobilization-hub`,
          {
            method: 'GET',
          },
        )
      ).json()) as HydratedSelectedEntity<SelectedMobilizationHub>;

      return {
        entity: result.entity,
        address: result.address,
        type: result.type,
      };
    }
  }

  return { entity: null, address: '' };
};
