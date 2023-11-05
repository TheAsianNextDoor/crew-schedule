import { type PrismaClient } from '@prisma/client';

export const addresses = async (prisma: PrismaClient) => {
  const fargo = await prisma.city.create({
    data: {
      city_id: '9f1f5b84-580e-4bbb-94c9-7db589658ab6',
      city: 'Fargo',
    },
  });

  const ND = await prisma.state.create({
    data: {
      state_id: '30b50922-a66b-4fe0-b5ad-9c24a41c57ea',
      state: 'ND',
    },
  });

  const US = await prisma.country.create({
    data: {
      country_id: '7538a546-5785-4fa7-aa09-00a8bcdf4ff8',
      country: 'US',
    },
  });

  const zip = await prisma.zipCode.create({
    data: {
      zip_code_id: '573cde07-024d-4dfe-8453-9d9408a5b333',
      zip_code: '58102',
    },
  });

  const address1 = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
  const address2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  const address3 = '550e8400-e29b-41d4-a716-446655440000';
  const address4 = '5a036ddf-8e16-4f63-9388-23c8b9a0e497';
  const address5 = 'efd65889-9d93-487d-bf10-93331d7ac7d5';
  const address6 = '4e90a750-ec50-4e68-951e-464b0e5f8fa5';
  const address7 = '965f70d3-8c52-4e97-8e42-5e3d75c60d75';
  const address8 = '38f3c520-6d2f-4e61-bc40-12baf92df1d9';
  const address9 = 'ab4a6c84-eb07-4947-b142-643229bc8db0';
  const address10 = 'd82b8a3e-413d-4dfb-b6ea-214a98e4a41c';
  const address11 = 'a82b8a3e-413d-4dfb-b6ea-214a98e4a41c';
  const address12 = 'c82b8a3e-413d-4dfb-b6ea-214a98e4a41c';
  const address13 = 'c72b8a3e-413d-4dfb-b6ea-214a98e4a41c';
  const address14 = 'c92b8a3e-413d-4dfb-b6ea-214a98e4a41c';

  await prisma.address.createMany({
    data: [
      {
        address_id: address1,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '123 Oak Street',
      },
      {
        address_id: address2,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '456 Maple Avenue',
      },
      {
        address_id: address3,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '789 Elm Road',
      },
      {
        address_id: address4,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '321 Pine Lane',
      },
      {
        address_id: address5,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '567 Cedar Drive',
      },
      {
        address_id: address6,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '890 Birch Court',
      },
      {
        address_id: address7,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '234 Walnut Place',
      },
      {
        address_id: address8,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '678 Spruce Street',
      },
      {
        address_id: address9,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '901 Redwood Boulevard',
      },
      {
        address_id: address10,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '345 Aspen Lane',
      },
      {
        address_id: address11,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '901 Purple Boulevard',
      },
      {
        address_id: address12,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '345 Oak Lane',
      },
      {
        address_id: address13,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '120 Sesame Street',
      },
      {
        address_id: address14,
        city_id: fargo.city_id,
        state_id: ND.state_id,
        zip_code_id: zip.zip_code_id,
        country_id: US.country_id,
        street: '333 Golden Lane',
      },
    ],
  });

  return {
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
    address13,
    address14,
  };
};
