import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';

export type RoutesResponse = {
  legs: {
    polyline: {
      encodedPolyline: string;
    };
    localizedValues: {
      distance: {
        text: string;
      };
      duration: {
        text: string;
      };
      staticDuration: {
        text: string;
      };
    };
  }[];
  polyline: {
    encodedPolyline: string;
  };
  warnings: string[];
  localizedValues: {
    distance: {
      text: string;
    };
    duration: {
      text: string;
    };
    staticDuration: {
      text: string;
    };
  };
  routeToken: string;
}[];

export const getGoogleRoutes = async (
  fetch: Function,
  origin: LatitudeLongitude,
  destination: LatitudeLongitude,
  intermediates: LatitudeLongitude[],
  isOptimal: boolean,
) => {
  const body = JSON.stringify({
    routingPreference: 'TRAFFIC_AWARE',
    travelMode: 'DRIVE',
    languageCode: 'en-US',
    units: 'IMPERIAL',
    optimizeWaypointOrder: isOptimal,
    origin: {
      location: {
        latLng: {
          latitude: origin.lat,
          longitude: origin.lng,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination.lat,
          longitude: destination.lng,
        },
      },
    },
    intermediates: intermediates?.map(({ lat, lng }) => ({
      location: {
        latLng: {
          latitude: lat,
          longitude: lng,
        },
      },
    })),
  });

  const data = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PUBLIC_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': `routes.localizedValues,routes.polyline,routes.warnings,routes.routeToken,routes.legs.localizedValues,routes.legs.polyline,${
        isOptimal ? 'routes.optimized_intermediate_waypoint_index' : ''
      }`,
    },
    body,
  });
  const result = (await data.json()) as RoutesResponse;
  console.log('getGoogleRoutes: ', JSON.stringify(result));

  return result;
};
