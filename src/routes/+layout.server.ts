import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();

  if (!session?.user?.email) {
    return {
      session: {},
    };
  }

  const email = session.user.email as string;

  const { id, companyId } = await db.query.profile.findFirst({ where: eq(profile.email, email) });

  return {
    session: {
      id,
      companyId,
      ...session,
    },
  };
};
