import { type PrismaClient } from '@prisma/client';

export const disciplines = async (prisma: PrismaClient, { customer1 }: { customer1: string }) => {
  const asphalt = '65e50c99-1dd4-474e-a964-8829f079215e';
  const concrete = '45e6ed2e-97ab-4083-87c7-804c36affa26';
  const striping = '49d843bc-6d30-4638-8e0e-30a548c6aeff';

  await prisma.discipline.createMany({
    data: [
      {
        discipline_id: asphalt,
        customer_id: customer1,
        discipline_name: 'asphalt',
      },
      {
        discipline_id: concrete,
        customer_id: customer1,
        discipline_name: 'concrete',
      },
      {
        discipline_id: striping,
        customer_id: customer1,
        discipline_name: 'striping',
      },
    ],
  });

  return {
    asphalt,
    concrete,
    striping,
  };
};
