import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

export const getGoogleRoutes = async (
  fetch: Function,
  origin: [string, string],
  destination: [string, string],
  intermediates: [string, string][],
) => {
  const body = JSON.stringify({
    routingPreference: 'TRAFFIC_AWARE',
    travelMode: 'DRIVE',
    languageCode: 'en-US',
    units: 'IMPERIAL',
    origin: {
      location: {
        latLng: {
          latitude: origin[0],
          longitude: origin[1],
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination[0],
          longitude: destination[1],
        },
      },
    },
    intermediates: intermediates?.map(([latitude, longitude]) => ({
      location: {
        latLng: {
          latitude,
          longitude,
        },
      },
    })),
  });

  const data = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PUBLIC_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask':
        'routes.localizedValues,routes.polyline,routes.warnings,routes.routeToken,routes.legs.localizedValues,routes.legs.polyline',
    },
    body,
  });
  const result = await data.json();
  console.log('getGoogleRoutes: ', result);

  return result;
};
