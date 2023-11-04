import { type PrismaClient } from '@prisma/client';

export const profiles = async (
  prisma: PrismaClient,
  {
    person1,
    person2,
    person3,
    person4,
    person5,
  }: {
    person1: string;
    person2: string;
    person3: string;
    person4: string;
    person5: string;
  },
) => {
  await prisma.profile.createMany({
    data: [
      {
        profile_id: '1232921e-5b39-42fc-8db0-d89e95c5a5a0',
        profile_pic: 'profile1.jpg',
        person_id: person1,
      },
      {
        profile_id: '234b768d-5946-47df-8a97-22a3c34d5f8c',
        profile_pic: 'profile2.jpg',
        person_id: person2,
      },
      {
        profile_id: '3a2bb36b-7ee5-46c4-b3ae-26f13261ce30',
        profile_pic: 'profile3.jpg',
        person_id: person3,
      },
      {
        profile_id: '4ca3a60f-4777-4d99-8d91-7c853f02f86f',
        profile_pic: 'profile1.jpg',
        person_id: person4,
      },
      {
        profile_id: '5e57bfa6-1d4a-4ee3-9120-1f61587c499e',
        profile_pic: 'profile5.jpg',
        person_id: person5,
      },
    ],
  });
};
