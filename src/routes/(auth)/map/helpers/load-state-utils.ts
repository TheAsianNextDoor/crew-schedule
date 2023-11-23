import queryString, { type ParsedQuery } from 'query-string';
import { FILTER_KEYS, type CrewHoursValue } from '../filter/filter-funcs';
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

export const loadSelectedHydratedMarkerFromUrl = (selectedLocationId: string) => {
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

export const loadFilterFields = (queryParams: ParsedQuery) => ({
  phaseDisciplines: (queryParams?.[FILTER_KEYS.phaseDiscipline] as string | undefined) || '',
  phaseStatus: (queryParams?.[FILTER_KEYS.phaseStatus] as string | undefined) || '',
  crewHoursValue: JSON.parse(
    (queryParams?.[FILTER_KEYS.phaseCrewHours] as string) || '{}',
  ) as CrewHoursValue,
  phaseStartDate: JSON.parse((queryParams?.[FILTER_KEYS.phaseStartDate] as string) || '{}') as {
    start?: Date;
    end?: Date;
  },
  phaseForeman: (queryParams?.[FILTER_KEYS.phaseForeman] as string | undefined) || '',

  siteClient: (queryParams?.[FILTER_KEYS.siteClient] as string | undefined) || '',
  siteStatus: (queryParams?.[FILTER_KEYS.siteStatus] as string | undefined) || '',

  selectedLocationId: (queryParams?.['selected-location'] as string | undefined) || '',
});
