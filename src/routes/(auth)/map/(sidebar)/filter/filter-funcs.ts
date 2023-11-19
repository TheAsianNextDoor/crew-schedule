import { STATUS_ENUM } from '$lib/constants/status';
import type { HydratedMapPhase, HydratedMapSite } from '../../+layout.server';
import type { EQUALITY_ENUM } from '../../../../../lib/constants/equality';

export const FILTER_KEYS = {
  phaseDiscipline: 'phase.discipline',
  phaseStatus: 'phase.status',
  phaseCrewHours: 'phase.crewHours',
  phaseStartDate: 'phase.startDate',
  phaseForeman: 'phase.foreman',

  siteStatus: 'site.status',
  siteClient: 'site.client',
};

export const FILTER_FUNCTIONS = {
  phase: {
    discipline: ({ discipline_name }: HydratedMapPhase, disciplines: string) => {
      const disciplinesArray = disciplines.split(',');

      return disciplinesArray.some((discipline) => discipline === discipline_name);
    },
    status: ({ status_name }: HydratedMapPhase, phaseStatus: string) => {
      if (phaseStatus === STATUS_ENUM.SOLD) {
        return status_name !== STATUS_ENUM.COMPLETED ?? false;
      }
      return status_name === phaseStatus ?? false;
    },
    crewHours: (
      { crewHours }: HydratedMapPhase,
      {
        condition,
        hours,
      }: { condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM]; hours: string },
    ) => {
      const hoursNumber = Number(hours);

      if (!crewHours) return false;
      if (condition === '') return false;
      if (condition === 'lt') return hoursNumber > crewHours;
      if (condition === 'eq') return hoursNumber === crewHours;
      if (condition === 'gt') return hoursNumber < crewHours;

      console.error('[filterByEstimatedHoursFunc] bad condition');

      return false;
    },
    startDate: (
      { scheduled_start_date_time }: HydratedMapPhase,
      { start, end }: { start?: Date; end?: Date },
    ) => {
      if (scheduled_start_date_time === null || !start || !end) return false;

      return (
        scheduled_start_date_time <= new Date(end) && scheduled_start_date_time >= new Date(start)
      );
    },
    foreman: ({ foreman_name }: HydratedMapPhase, foremanName: string) =>
      foreman_name.toLowerCase().includes(foremanName.toLowerCase()),
  },
  site: {
    status: ({ status_name }: HydratedMapSite, siteStatus: string) => {
      if (siteStatus === STATUS_ENUM.SOLD) {
        return status_name !== STATUS_ENUM.COMPLETED ?? false;
      }
      return status_name === siteStatus ?? false;
    },
    client: ({ client_name }: HydratedMapSite, clientName: string) => {
      return client_name.toLowerCase().includes(clientName.toLowerCase());
    },
  },
};
