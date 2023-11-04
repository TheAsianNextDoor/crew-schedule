import { type PrismaClient } from '@prisma/client';

export const crewAssignments = async (
  prisma: PrismaClient,
  {
    customer1,
    person1,
    person2,
    person3,
    person4,
    person5,
    crew1,
    crew2,
    crew3,
    crew4,
    crew5,
  }: {
    customer1: string;
    person1: string;
    person2: string;
    person3: string;
    person4: string;
    person5: string;
    crew1: string;
    crew2: string;
    crew3: string;
    crew4: string;
    crew5: string;
  },
) => {
  await prisma.crewAssignment.createMany({
    data: [
      {
        crew_assignment_id: '1be3f4c2-7b4b-4e9c-bd57-7f4c131fd365',
        customer_id: customer1,
        person_id: person1,
        crew_id: crew1,
      },
      {
        crew_assignment_id: '25f7828d-50dd-4d1d-97f4-3296890db1cd',
        customer_id: customer1,
        person_id: person2,
        crew_id: crew2,
      },
      {
        crew_assignment_id: '3a6af98e-10f2-4e32-b5e9-246c34a63d4e',
        customer_id: customer1,
        person_id: person3,
        crew_id: crew3,
      },
      {
        crew_assignment_id: '4d7b9e51-5461-413f-b7ef-bb00d5ea7de2',
        customer_id: customer1,
        person_id: person4,
        crew_id: crew4,
      },
      {
        crew_assignment_id: '5fb3019f-af3d-4f4e-9fa7-545d8c3b6605',
        customer_id: customer1,
        person_id: person5,
        crew_id: crew5,
      },
    ],
  });
};
