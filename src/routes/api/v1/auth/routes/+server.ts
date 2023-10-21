import { routesData } from '$lib/routes-filter';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getGoogleRoutes } from './get-google-routes';

export const POST: RequestHandler = async ({ request, fetch }) => {
  const { routes } = (await request.json()) as { routes: [string, string][] };

  const [origin, ...intermediates] = routes;
  const destination = intermediates.pop() as [string, string];

  // return getGoogleRoutes(fetch, origin, destination, intermediates);

  return json({ data: { routes: routesData } });
};
