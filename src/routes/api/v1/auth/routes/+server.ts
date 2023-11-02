import { routesData } from '../../../../../../mock/routes';
import { optimalMock } from '../../../../../../mock/optimal';
import { nonOptimalMock } from '../../../../../../mock/non-optimal';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleRoutes } from './get-google-route';

interface PostBody {
  routes: [string, string][];
  isOptimal: boolean;
}

export const POST: RequestHandler = async ({ request, fetch }) => {
  const { routes, isOptimal } = (await request.json()) as PostBody;

  const [origin, ...intermediates] = routes;
  const destination = intermediates.pop() as [string, string];

  // const data = await getGoogleRoutes(fetch, origin, destination, intermediates, isOptimal);
  // return json({ data });

  if (isOptimal) {
    return json({ data: { ...optimalMock } });
  }

  return json({ data: { ...nonOptimalMock } });
};
