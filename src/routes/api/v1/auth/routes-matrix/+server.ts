import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleRoutes } from '../routes/get-google-route';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';
import { routesMatrixMock } from '../../../../../../mock/routes-matrix';
import { isLive } from '$lib/env';
import type { RoutesPostResponse } from '../routes/+server';

interface PostBody {
  originLocation: LatitudeLongitude;
  destinationLocations: LatitudeLongitude[];
  isOptimal: boolean;
}

export const POST: RequestHandler = async ({ request, fetch }) => {
  const { originLocation, destinationLocations } = (await request.json()) as PostBody;

  const [firstIntermediate, ...intermediates] = destinationLocations;
  const destination = intermediates.pop() as LatitudeLongitude;

  const matrixIntermediates = intermediates.reduce(
    (prev, cur) => {
      prev.push(originLocation);
      prev.push(cur);

      return prev;
    },
    [firstIntermediate],
  );
  matrixIntermediates.push(originLocation);

  if (isLive) {
    const {
      routes: [{ legs, polyline, localizedValues }],
    } = await getGoogleRoutes(fetch, originLocation, destination, matrixIntermediates, false);

    const filteredLegs = legs.filter((_, index) => (index % 2 ? false : true));

    return json({
      data: { legs: filteredLegs, polyline, localizedValues },
    } satisfies RoutesPostResponse);
  }

  console.log('mocked matrix route');

  const { legs, localizedValues, polyline } = routesMatrixMock[0];
  const filteredLegs = legs.filter((_, index) => (index % 2 ? false : true));

  return json({ data: { legs: filteredLegs, polyline, localizedValues } });
};
