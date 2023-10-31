import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleMatrix } from './get-google-matrix';
import { matrixMock } from '../../../../../../mock/matrix';

interface PostBody {
  originLocations: [string, string][];
  destinationLocations: [string, string][];
}
export const POST: RequestHandler = async ({ request, fetch }) => {
  const { originLocations, destinationLocations } = (await request.json()) as PostBody;

  // const data = await getGoogleMatrix(fetch, originLocations, destinationLocations);
  // return json({ data });

  return json({ data: matrixMock });

  // return json({ data: { routes: routesData } });
};
