import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

export interface MatrixItem {
  originIndex: number;
  destinationIndex: number;
  status: Record<string, unknown>;
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  condition: string;
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
}

export const getGoogleMatrix = async (
  fetch: Function,
  originLocations: [string, string][],
  destinationLocations: [string, string][],
): Promise<MatrixItem[]> => {
  const body = JSON.stringify({
    routingPreference: 'TRAFFIC_AWARE',
    travelMode: 'DRIVE',
    languageCode: 'en-US',
    units: 'IMPERIAL',
    origins: originLocations.map((location) => ({
      waypoint: {
        location: {
          latLng: {
            latitude: location[0],
            longitude: location[1],
          },
        },
      },
    })),
    destinations: destinationLocations.map((location) => ({
      waypoint: {
        location: {
          latLng: {
            latitude: location[0],
            longitude: location[1],
          },
        },
      },
    })),
  });

  const data = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PUBLIC_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': '*',
    },
    body,
  });
  const result = await data.json();
  console.log('getGoogleMatrix: ', JSON.stringify(result));

  return result;
};
