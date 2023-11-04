import { type PrismaClient } from '@prisma/client';

export const persons = async (
  prisma: PrismaClient,
  {
    customer1,
    standard,
  }: {
    customer1: string;
    standard: string;
  },
) => {
  const person1 = '2ab8189a-4b8d-431e-97d5-7e8582ab7453';
  const person2 = '3bc2d31b-8c1b-4b47-8f5d-362669c2681e';
  const person3 = '48e70e38-19ad-4c4a-8d43-4c8035d6a3be';
  const person4 = '5e8d43db-86a0-4e3a-bff2-973d43251d94';
  const person5 = '69b45d89-301e-4b5f-ba0e-1ed5fd3e678b';
  const person6 = '71b45d89-301e-4b5f-ba0e-1ed5fd3e678b';
  const person7 = '51b45d89-301e-4b5f-ba0e-1ed5fd3e678a';
  const person8 = '91b45d89-301e-4b5f-ba0e-1ed5fd3e678c';
  const person9 = '91b45d89-301e-4b5f-ba0e-1ed5fd3e678d';

  await prisma.person.createMany({
    data: [
      {
        person_id: person9,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'imran',
        person_last_name: 'reeds',
        phone_number: '1234567890',
        email: 'imran.artwell@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person1,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 1',
        person_last_name: 'last 1',
        phone_number: '1234567890',
        email: 'aaron.o.scherling@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person8,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'aaron',
        person_last_name: 'scherling',
        phone_number: '1234567890',
        email: 'aaron.scherling11490@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person7,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'aaron',
        person_last_name: 'solie',
        phone_number: '1234567890',
        email: 'solieaaron@gmail.com',
        is_foreman: true,
      },
      {
        person_id: person2,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 2',
        person_last_name: 'last 2',
        phone_number: '1234567890',
        email: 'person2@example.com',
        is_foreman: true,
      },
      {
        person_id: person3,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 3',
        person_last_name: 'last 3',
        phone_number: '1234567890',
        email: 'person3@example.com',
        is_foreman: true,
      },
      {
        person_id: person4,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 4',
        person_last_name: 'last 4',
        phone_number: '1234567890',
        email: 'person4@example.com',
        is_foreman: false,
      },
      {
        person_id: person5,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 5',
        person_last_name: 'last 5',
        phone_number: '5234567890',
        email: 'person5@example.com',
        is_foreman: false,
      },
      {
        person_id: person6,
        customer_id: customer1,
        role_id: standard,
        person_first_name: 'first 6',
        person_last_name: 'last 6',
        phone_number: '1234567890',
        email: 'jordanho.work@gmail.com',
        is_foreman: true,
      },
    ],
  });

  return {
    person1,
    person2,
    person3,
    person4,
    person5,
    person6,
    person7,
    person8,
    person9,
  };
};
