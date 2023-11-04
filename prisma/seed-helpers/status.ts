import { type PrismaClient } from '@prisma/client';

export const statuses = async (prisma: PrismaClient, { customer1 }: { customer1: string }) => {
  const pending = '1e596840-4bdc-4c39-b96b-7e7c8b9c37e1';
  const scheduled = '27be955c-44ed-4299-bd10-6fd8525a5d62';
  const in_progress = 'cdf59269-10ec-4690-8a67-8956b8a172b2';
  const completed = '65191e7f-62e9-45dc-a629-b28d8b6280b4';

  await prisma.status.createMany({
    data: [
      {
        status_id: pending,
        customer_id: customer1,
        status_name: 'PENDING',
      },
      {
        status_id: scheduled,
        customer_id: customer1,
        status_name: 'SCHEDULED',
      },
      {
        status_id: in_progress,
        customer_id: customer1,
        status_name: 'IN_PROGRESS',
      },
      {
        status_id: completed,
        customer_id: customer1,
        status_name: 'COMPLETED',
      },
    ],
  });

  return {
    pending,
    scheduled,
    in_progress,
    completed,
  };
};
