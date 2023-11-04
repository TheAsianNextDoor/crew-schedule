import { type PrismaClient } from '@prisma/client';

export const clients = async (
  prisma: PrismaClient,
  {
    address1,
    address2,
    address3,
    address4,
    address5,
    customer1,
  }: {
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    customer1: string;
  },
) => {
  const client1 = '1151d9e7-9bca-4d34-9651-59f3e17961e0';
  const client2 = '2aa7ebf6-78f3-4aeb-a6c2-67f73992a4f5';
  const client3 = '3301a8de-275f-4de0-9c6e-3fca97c303c6';
  const client4 = '4a7766f5-2f7a-442e-9a2a-d392a74b51d5';
  const client5 = '5b7f14c2-f29a-4f92-b5fe-4970da3d2e8e';

  await prisma.client.createMany({
    data: [
      {
        client_id: client1,
        address_id: address1,
        customer_id: customer1,
        client_name: 'Client 1',
        contact_first_name: 'John',
        contact_last_name: 'Doe',
        email: 'client1@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client2,
        address_id: address2,
        customer_id: customer1,
        client_name: 'Client 2',
        contact_first_name: 'Emily',
        contact_last_name: 'Brown',
        email: 'client2@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client3,
        address_id: address3,
        customer_id: customer1,
        client_name: 'Client 3',
        contact_first_name: 'Jane',
        contact_last_name: 'Smith',
        email: 'client3@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client4,
        address_id: address4,
        customer_id: customer1,
        client_name: 'Client 4',
        contact_first_name: 'Michael',
        contact_last_name: 'Johnson',
        email: 'client4@example.com',
        phone_number: '1234567890',
      },
      {
        client_id: client5,
        address_id: address5,
        customer_id: customer1,
        client_name: 'Client 5',
        contact_first_name: 'David',
        contact_last_name: 'Jones',
        email: 'client5@example.com',
        phone_number: '1234567890',
      },
    ],
  });

  return {
    client1,
    client2,
    client3,
    client4,
    client5,
  };
};
