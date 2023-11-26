import { optimalMock } from '../../../../../../mock/optimal';
import { nonOptimalMock } from '../../../../../../mock/non-optimal';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleRoutes, type GoogleRoute } from './get-google-route';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';
import { isLive } from '$lib/env';

interface PostBody {
  routes: LatitudeLongitude[];
  isOptimal: boolean;
}

export interface RoutesPostResponse {
  data: {
    legs: GoogleRoute['legs'];
    polyline: GoogleRoute['polyline'];
    localizedValues: GoogleRoute['localizedValues'];
  };
}

export const POST: RequestHandler = async ({ request, fetch }): Promise<Response> => {
  const { routes, isOptimal } = (await request.json()) as PostBody;

  const [origin, ...intermediates] = routes;
  const destination = intermediates.pop() as LatitudeLongitude;

  if (isLive) {
    const {
      routes: [{ legs, polyline, localizedValues }],
    } = await getGoogleRoutes(fetch, origin, destination, intermediates, isOptimal);

    return json({ data: { legs, polyline, localizedValues } } satisfies RoutesPostResponse);
  }
  console.log('mocked routes fetch');

  if (isOptimal) {
    const [{ legs, polyline, localizedValues }] = optimalMock;
    return json({ data: { legs, polyline, localizedValues } } satisfies RoutesPostResponse);
  }

  const [{ legs, polyline, localizedValues }] = nonOptimalMock;
  return json({ data: { legs, polyline, localizedValues } } satisfies RoutesPostResponse);
};
