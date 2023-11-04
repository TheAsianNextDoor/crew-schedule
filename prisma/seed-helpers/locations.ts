import { type PrismaClient } from '@prisma/client';

export const locations = async (
  prisma: PrismaClient,
  {
    customer1,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
    address9,
    address10,
    address11,
    address12,
  }: {
    customer1: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    address6: string;
    address7: string;
    address8: string;
    address9: string;
    address10: string;
    address11: string;
    address12: string;
  },
) => {
  const location1 = 'd31f7a07-7df3-4d0b-9bfb-02b5d1e0136f';
  const location2 = '6a332255-0a08-45a9-a97d-8e9946d1cc3a';
  const location3 = '3f94ea2c-408a-4f45-a10e-73c00f4e2cc6';
  const location4 = 'f4518b2f-8d15-4c8b-8d68-7f35dbfcbf84';
  const location5 = '8110de65-9145-47d4-9ee2-6f5022da5f4d';
  const location6 = '34a7734b-4a12-47fb-ae3b-09f646ea14b0';
  const location7 = '84e1c64b-952c-483b-a346-2bafbb3fcb8a';
  const location8 = 'b7e7c8bf-7f39-4aa0-9ce1-54f06e0b6db2';
  const location9 = 'e3d5c20d-7e3e-4e14-9447-482baed0cb9a';
  const location10 = '1fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  const location11 = '2fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  const location12 = '3fd73f6a-936f-41a5-9a03-27e08f8e8e8c';
  await prisma.location.createMany({
    data: [
      {
        location_id: location1,
        customer_id: customer1,
        address_id: address1,
        lat: 51.49,
        lng: -0.09,
      },
      {
        location_id: location2,
        customer_id: customer1,
        address_id: address2,
        lat: 51.53,
        lng: -0.07,
      },
      {
        location_id: location3,
        customer_id: customer1,
        address_id: address3,
        lat: 51.501,
        lng: -0.08,
      },
      {
        location_id: location4,
        customer_id: customer1,
        address_id: address4,
        lat: 51.505,
        lng: -0.06,
      },
      {
        location_id: location5,
        customer_id: customer1,
        address_id: address5,
        lat: 51.509,
        lng: -0.09,
      },
      {
        location_id: location6,
        customer_id: customer1,
        address_id: address6,
        lat: 51.485,
        lng: -0.05,
      },
      {
        location_id: location7,
        customer_id: customer1,
        address_id: address7,
        lat: 51.503,
        lng: -0.07,
      },
      {
        location_id: location8,
        customer_id: customer1,
        address_id: address8,
        lat: 51.502,
        lng: -0.05,
      },
      {
        location_id: location9,
        customer_id: customer1,
        address_id: address9,
        lat: 51.517,
        lng: -0.11,
      },
      {
        location_id: location10,
        customer_id: customer1,
        address_id: address10,
        lat: 51.535,
        lng: -0.12,
      },
      {
        location_id: location11,
        customer_id: customer1,
        address_id: address11,
        lat: 51.51,
        lng: -0.13,
      },
      {
        location_id: location12,
        customer_id: customer1,
        address_id: address12,
        lat: 51.515,
        lng: -0.08,
      },
    ],
  });

  return {
    location1,
    location2,
    location3,
    location4,
    location5,
    location6,
    location7,
    location8,
    location9,
    location10,
    location11,
    location12,
  };
};
