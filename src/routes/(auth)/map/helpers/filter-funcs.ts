import {
  addFilterConditionFunc,
  filterMapMarkers,
  removeFilterConditionFunc,
  type FilterConditionFunc,
  type HydratedMapMarker,
} from '../stores/map-marker-store';

const maybeFilterByValue = (
  filterName: string,
  shouldFilter: boolean,
  filterConditionFunc: FilterConditionFunc,
) => {
  if (shouldFilter) {
    addFilterConditionFunc(filterName, filterConditionFunc);
  } else {
    removeFilterConditionFunc(filterName);
  }

  filterMapMarkers();
};

const filterByForemanFunc = ({ site }: HydratedMapMarker, foremanName: string) =>
  site.currentPhase?.foreman_name.includes(foremanName) ?? false;

export const filterByForeman = (
  e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
  },
) => {
  const value = e.currentTarget.value;
  const shouldFilter = value.length !== 0;

  maybeFilterByValue('foreman', shouldFilter, (hydratedMapMarker) =>
    filterByForemanFunc(hydratedMapMarker, value),
  );
};

const filterByEstimatedHoursFunc = ({ site }: HydratedMapMarker, estimatedHours: number) =>
  site.currentPhase?.estimated_hours === estimatedHours ?? false;

export const filterByEstimatedHours = (
  e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
  },
) => {
  const value = Number(e.currentTarget.value);
  const shouldFilter = value !== 0;

  maybeFilterByValue('estimatedHours', shouldFilter, (hydratedMapMarker) =>
    filterByEstimatedHoursFunc(hydratedMapMarker, value),
  );
};

const filterByStatusFunc = ({ site }: HydratedMapMarker, status: string) =>
  site.currentPhase?.status_name === status ?? false;

export const filterByStatusName = (
  e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
  },
) => {
  const value = e?.target?.value;
  const shouldFilter = value !== '';

  maybeFilterByValue('estimatedHours', shouldFilter, (hydratedMapMarker) =>
    filterByStatusFunc(hydratedMapMarker, value),
  );
};
