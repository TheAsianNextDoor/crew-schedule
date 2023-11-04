import { type PrismaClient } from '@prisma/client';

export const customers = async (
  prisma: PrismaClient,
  { address1, address2, address3, address4, address5 }: Record<string, string>,
) => {
  const customer1 = '8c619eb3-b8b1-4520-bc6a-f51e0677ec37';

  await prisma.customer.createMany({
    data: [
      {
        customer_id: customer1,
        address_id: address1,
        customer_name: 'Customer 1',
        phone_number: '1234567890',
        email: 'customer1@example.com',
      },
      {
        customer_id: '0123e406-c408-4b88-88dc-8b2f27c741ab',
        address_id: address2,
        customer_name: 'Customer 2',
        phone_number: '1234567890',
        email: 'customer2@example.com',
      },
      {
        customer_id: 'f380f753-9ed5-44df-9e7a-67946cc2ab17',
        address_id: address3,
        customer_name: 'Customer 3',
        phone_number: '1234567890',
        email: 'customer3@example.com',
      },
      {
        customer_id: '049d87ce-7bb9-48b3-b651-4b7b1708ae8d',
        address_id: address4,
        customer_name: 'Customer 4',
        phone_number: '1234567890',
        email: 'customer4@example.com',
      },
      {
        customer_id: 'a13502fb-d3e0-4c7e-a444-5d4943c34f46',
        address_id: address5,
        customer_name: 'Customer 5',
        phone_number: '1234567890',
        email: 'customer5@example.com',
      },
    ],
  });

  return { customer1 };
};
