import { PrismaClient } from '@prisma/client';
import { addresses } from './seed-helpers/address';
import { customers } from './seed-helpers/customer';
import { statuses } from './seed-helpers/status';
import { disciplines } from './seed-helpers/disciplines';
import { clients } from './seed-helpers/clients';
import { roles } from './seed-helpers/roles';
import { persons } from './seed-helpers/persons';
import { profiles } from './seed-helpers/profiles';
import { crews } from './seed-helpers/crews';
import { crewAssignments } from './seed-helpers/crew-assignments';
import { locations } from './seed-helpers/locations';
import { sites } from './seed-helpers/sites';
import { phases } from './seed-helpers/phases';
import { phaseAssignments } from './seed-helpers/phase-assignments';

const prisma = new PrismaClient();

const main = async () => {
  const {
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
  } = await addresses(prisma);

  const { customer1 } = await customers(prisma, {
    address1,
    address2,
    address3,
    address4,
    address5,
  });

  const { completed, in_progress, pending, scheduled } = await statuses(prisma, { customer1 });

  const { asphalt, concrete, striping } = await disciplines(prisma, { customer1 });

  const { client1, client2, client3, client4, client5 } = await clients(prisma, {
    address1,
    address2,
    address3,
    address4,
    address5,
    customer1,
  });

  const { admin, standard } = await roles(prisma, { customer1 });

  const { person1, person2, person3, person4, person5, person6, person7, person8, person9 } =
    await persons(prisma, { customer1, standard });

  await profiles(prisma, { person1, person2, person3, person4, person5 });

  const { crew1, crew2, crew3, crew4, crew5 } = await crews(prisma, {
    customer1,
    concrete,
    asphalt,
    striping,
  });

  await crewAssignments(prisma, {
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
  });

  const {
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
  } = await locations(prisma, {
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
  });

  const { site1, site2, site3, site4, site5, site6, site7, site8, site9, site10, site11, site12 } =
    await sites(prisma, {
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
      customer1,
      client1,
      client2,
      client3,
      client4,
      client5,
      pending,
      completed,
      in_progress,
      scheduled,
    });

  const {
    phase1,
    phase2,
    phase3,
    phase4,
    phase5,
    phase6,
    phase7,
    phase8,
    phase9,
    phase10,
    phase11,
    phase12,
    phase13,
    phase14,
  } = await phases(prisma, {
    site1,
    site2,
    site3,
    site4,
    site5,
    site6,
    site7,
    site8,
    site9,
    site10,
    site11,
    site12,
    pending,
    completed,
    in_progress,
    scheduled,
    asphalt,
    concrete,
    striping,
  });

  await phaseAssignments(prisma, {
    phase1,
    phase2,
    phase3,
    phase4,
    phase5,
    phase6,
    phase7,
    phase8,
    phase9,
    phase10,
    phase11,
    phase12,
    phase13,
    phase14,
    crew1,
    crew2,
    crew3,
    crew4,
    crew5,
    person1,
    person2,
    person3,
    person4,
    person5,
    person6,
    person7,
    person8,
    person9,
    completed,
    in_progress,
    pending,
    scheduled,
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
    process.exit();
  });
