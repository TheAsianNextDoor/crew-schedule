import { type PrismaClient } from '@prisma/client';

export const roles = async (prisma: PrismaClient, { customer1 }: { customer1: string }) => {
  const standard = '3cc8dd25-391e-4b83-92d6-d09e539a6376';
  const admin = '31b4fe1a-c895-46ae-a1cc-00b7c80cb8b6';

  await prisma.role.createMany({
    data: [
      {
        role_id: standard,
        role_name: 'STANDARD',
        customer_id: customer1,
      },
      {
        role_id: admin,
        role_name: 'ADMIN',
        customer_id: customer1,
      },
    ],
  });

  return {
    standard,
    admin,
  };
};
