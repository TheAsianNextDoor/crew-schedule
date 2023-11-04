import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleMatrix } from './get-google-matrix';
import { matrixMock } from '../../../../../../mock/matrix';
import type { LatitudeLongitude } from '$lib/types/latitude-longitude';

interface PostBody {
  originLocations: LatitudeLongitude[];
  destinationLocations: LatitudeLongitude[];
}
export const POST: RequestHandler = async ({ request, fetch }) => {
  const { originLocations, destinationLocations } = (await request.json()) as PostBody;

  // const data = await getGoogleMatrix(fetch, originLocations, destinationLocations);
  // return json({ data });

  return json({ data: matrixMock });

  // return json({ data: { routes: routesData } });
};
