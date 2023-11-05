import { type PrismaClient } from '@prisma/client';

export const mobilizationHubs = async (
  prisma: PrismaClient,
  {
    customer1,
    location13,
    location14,
  }: {
    customer1: string;
    location13: string;
    location14: string;
  },
) => {
  const mobilizationHub1 = '9a8af58e-7bea-11ee-b962-0242ac120002';
  const mobilizationHub2 = '9a8af7fa-7bea-11ee-b962-0242ac120002';

  await prisma.mobilizationHub.createMany({
    data: [
      {
        mobilization_hub_id: mobilizationHub1,
        customer_id: customer1,
        location_id: location13,
        hub_name: 'hub1',
      },
      {
        mobilization_hub_id: mobilizationHub2,
        customer_id: customer1,
        location_id: location14,
        hub_name: 'hub2',
      },
    ],
  });

  return {
    mobilizationHub1,
    mobilizationHub2,
  };
};
