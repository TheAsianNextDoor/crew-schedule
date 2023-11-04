import { type PrismaClient } from '@prisma/client';

export const crews = async (
  prisma: PrismaClient,
  {
    customer1,
    asphalt,
    concrete,
    striping,
  }: {
    customer1;
    asphalt;
    concrete;
    striping;
  },
) => {
  const crew1 = '1534b63b-872c-40b2-89b3-d8e98c2dd3b9';
  const crew2 = '250cfaa3-cf5a-4879-99d5-55057be19836';
  const crew3 = '3c409579-9255-4ab4-a22c-13897d3aee5f';
  const crew4 = '4de04dc4-57e6-42d7-8f79-8eb4856f8e2a';
  const crew5 = '56e42e7e-5f1e-4c5d-8b3f-d4ef0658978b';

  await prisma.crew.createMany({
    data: [
      {
        crew_id: crew1,
        customer_id: customer1,
        discipline_id: asphalt,
        crew_name: 'Crew 1',
        size: 10,
        weekly_hours: 40.0,
        weekly_capacity: 400.0,
        personnel_hourly_cost: 25.0,
        equipment_hourly_cost: 50.0,
      },
      {
        crew_id: crew2,
        customer_id: customer1,
        discipline_id: concrete,
        crew_name: 'Crew 2',
        size: 8,
        weekly_hours: 32.0,
        weekly_capacity: 320.0,
        personnel_hourly_cost: 20.0,
        equipment_hourly_cost: 30.0,
      },
      {
        crew_id: crew3,
        customer_id: customer1,
        discipline_id: striping,
        crew_name: 'Crew 3',
        size: 12,
        weekly_hours: 48.0,
        weekly_capacity: 480.0,
        personnel_hourly_cost: 18.0,
        equipment_hourly_cost: 40.0,
      },
      {
        crew_id: crew4,
        customer_id: customer1,
        discipline_id: asphalt,
        crew_name: 'Crew 4',
        size: 6,
        weekly_hours: 24.0,
        weekly_capacity: 240.0,
        personnel_hourly_cost: 22.0,
        equipment_hourly_cost: 35.0,
      },
      {
        crew_id: crew5,
        customer_id: customer1,
        discipline_id: concrete,
        crew_name: 'Crew 5',
        size: 15,
        weekly_hours: 60.0,
        weekly_capacity: 600.0,
        personnel_hourly_cost: 16.0,
        equipment_hourly_cost: 45.0,
      },
    ],
  });

  return {
    crew1,
    crew2,
    crew3,
    crew4,
    crew5,
  };
};
