import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleRoutes } from '../routes/get-google-route';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';
import { routesMatrixMock } from '../../../../../../mock/routes-matrix';

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

  // const data = await getGoogleRoutes(
  //   fetch,
  //   originLocation,
  //   destination,
  //   matrixIntermediates,
  //   false,
  // );
  // return json({ data });

  return json({ data: routesMatrixMock });
};
