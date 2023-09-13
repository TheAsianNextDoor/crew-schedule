import type { MapPhase } from '../queries/retreive-phases-by-site';
import type { MapSite } from '../queries/retrieve-map-sites';
import {
  addFilterConditionFunc,
  filterMapMarkers,
  removeFilterConditionFunc,
  type FilterType,
} from '../stores/map-marker-store';
import type { EQUALITY_ENUM } from './equality-utils';

const maybeFilterByValue = (
  filterName: string,
  shouldFilter: boolean,
  filterConditionFunc: ((phase: MapPhase) => boolean) | ((site: MapSite) => boolean),
  filterType: FilterType,
) => {
  if (shouldFilter) {
    addFilterConditionFunc(filterName, filterConditionFunc, filterType);
  } else {
    removeFilterConditionFunc(filterName);
  }

  filterMapMarkers();
};

const filterByForemanFunc = (phase: MapPhase, foremanName: string) =>
  phase.foreman_name.includes(foremanName) ?? false;

export const filterByForeman = (
  e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
  },
) => {
  const value = e.currentTarget.value;
  const shouldFilter = value.length !== 0;

  maybeFilterByValue(
    'foreman',
    shouldFilter,
    (phase: MapPhase) => filterByForemanFunc(phase, value),
    'phase',
  );
};

const filterByEstimatedHoursFunc = (
  phase: MapPhase,
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  hours: number,
) => {
  if (condition === 'lt') return hours > phase.estimated_hours;
  if (condition === 'eq') return hours === phase.estimated_hours;
  if (condition === 'gt') return hours < phase.estimated_hours;

  console.error('[filterByEstimatedHoursFunc] bad condition');

  return false;
};

export const filterByEstimatedHours = (
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  estimatedHours: number | undefined,
) => {
  const hours = estimatedHours ?? 0;
  const shouldFilter = hours !== 0;

  maybeFilterByValue(
    'estimatedHours',
    shouldFilter,
    (phase: MapPhase) => filterByEstimatedHoursFunc(phase, condition, hours),
    'phase',
  );
};

const filterByStatusFunc = (phase: MapPhase, phaseStatus: string) =>
  phase.status_name === phaseStatus ?? false;

export const filterByStatusName = (
  e: Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  },
) => {
  const value = e?.target?.value;
  const shouldFilter = value !== '';

  maybeFilterByValue(
    'phaseStatus',
    shouldFilter,
    (phase: MapPhase) => filterByStatusFunc(phase, value),
    'phase',
  );
};
