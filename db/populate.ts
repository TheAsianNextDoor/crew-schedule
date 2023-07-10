import { eq } from 'drizzle-orm';

import { db } from '../src/lib/db';
import { client, crew, foreman, phase, site, sub_contractor } from './../src/lib/db/schema';

const populate = async () => {
  const subContractor1 = await db
    .insert(sub_contractor)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      firstName: 'john',
      lastName: 'doe',
      phone: '1234567890',
      email: 'john@example.com',
      scheduledDate: new Date(),
    })
    .returning({ id: sub_contractor.id });

  const subContractor2 = await db
    .insert(sub_contractor)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      firstName: 'mary',
      lastName: 'jane',
      phone: '1234567890',
      email: 'mary@example.com',
      scheduledDate: new Date(),
    })
    .returning({ id: sub_contractor.id });

  const client1 = await db
    .insert(client)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      firstName: 'billy',
      lastName: 'bob',
      phone: '1234567890',
      email: 'john@example.com',
    })
    .returning({ id: client.id });

  const client2 = await db
    .insert(client)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      firstName: 'steven',
      lastName: 'harvey',
      phone: '1234567890',
      email: 'mary@example.com',
    })
    .returning({ id: client.id });

  const foreman1 = await db
    .insert(foreman)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      firstName: 'Ashton',
      lastName: 'kutcher',
      phone: '1234567890',
      email: 'john@example.com',
    })
    .returning({ id: foreman.id });

  const foreman2 = await db
    .insert(foreman)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      firstName: 'lori',
      lastName: 'sanchez',
      phone: '1234567890',
      email: 'mary@example.com',
    })
    .returning({ id: foreman.id });

  const crew1 = await db
    .insert(crew)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'crew a',
      size: 5,
      weeklyHours: 40,
      weeklyCapacity: 40,
      discipline: 'concrete',
      foremanId: foreman1[0].id,
      personnelHourlyCost: 300,
      equipmentHourlyCost: 100,
    })
    .returning({ id: crew.id });

  const crew2 = await db
    .insert(crew)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      name: 'crew b',
      size: 8,
      weeklyHours: 4,
      weeklyCapacity: 22,
      discipline: 'asphalt',
      foremanId: foreman1[0].id,
      personnelHourlyCost: 300,
      equipmentHourlyCost: 100,
    })
    .returning({ id: crew.id });

  const crew3 = await db
    .insert(crew)
    .values({
      id: '33333333-3333-3333-3333-333333333333',
      name: 'crew c',
      size: 10,
      weeklyHours: 20,
      weeklyCapacity: 30,
      discipline: 'striping',
      foremanId: foreman2[0].id,
      personnelHourlyCost: 300,
      equipmentHourlyCost: 100,
    })
    .returning({ id: crew.id });

  const site1 = await db
    .insert(site)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      jobNumber: '1',
      name: 'site1',
      location: [51.515, -0.081],
      clusterId: '12321',
      totalEstimatedHours: 121,
      clientId: client1[0].id,
      attachments: ['attachments.pdf'],
      notes: 'we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const site2 = await db
    .insert(site)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      jobNumber: '2',
      name: 'site2',
      location: [51.515, -0.094],
      clusterId: '12321',
      totalEstimatedHours: 122,
      clientId: client1[0].id,
      attachments: ['attachments.pdf'],
      notes: '2we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const site3 = await db
    .insert(site)
    .values({
      id: '33333333-3333-3333-3333-333333333333',
      jobNumber: '3',
      name: 'site3',
      location: [51.535, -0.096],
      clusterId: '12321',
      totalEstimatedHours: 123,
      clientId: client2[0].id,
      attachments: ['attachments.pdf'],
      notes: '3we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const site4 = await db
    .insert(site)
    .values({
      id: '44444444-4444-4444-4444-444444444444',
      jobNumber: '4',
      name: 'site4',
      location: [51.545, -0.089],
      clusterId: '12321',
      totalEstimatedHours: 124,
      clientId: client2[0].id,
      attachments: ['attachments.pdf'],
      notes: '4we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const site5 = await db
    .insert(site)
    .values({
      id: '55555555-5555-5555-5555-555555555555',
      jobNumber: '5',
      name: 'site5',
      location: [51.505, -0.09],
      clusterId: '12321',
      totalEstimatedHours: 125,
      clientId: client2[0].id,
      attachments: ['attachments.pdf'],
      notes: '5 we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const site6 = await db
    .insert(site)
    .values({
      id: '66666666-6666-6666-6666-666666666666',
      jobNumber: '6',
      name: 'site6',
      location: [51.515, -0.13],
      clusterId: '12321',
      totalEstimatedHours: 126,
      clientId: client1[0].id,
      attachments: ['attachments.pdf'],
      notes: '6 we are falling behind on schedule',
      currentPhaseId: null,
    })
    .returning({ id: site.id });

  const phase1 = await db
    .insert(phase)
    .values({
      id: '11111111-1111-1111-1111-111111111111',
      siteId: site1[0].id,
      order: 0,
      crewEstimatedHours: 10,
      discipline: 'concrete',
      assignedCrewId: crew1[0].id,
      scheduledDateTime: new Date(),
      startDateTime: new Date(),
      status: 'In Progress',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: [51.515, -0.095],
      estimatedMobilizationTime: new Date(),
      actualMobilizationTime: new Date(),
    })
    .returning({ id: phase.id });

  const phase2 = await db
    .insert(phase)
    .values({
      id: '22222222-2222-2222-2222-222222222222',
      siteId: site1[0].id,
      order: 1,
      crewEstimatedHours: null,
      discipline: 'asphalt',
      assignedCrewId: null,
      scheduledDateTime: null,
      startDateTime: null,
      status: 'Pending',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  const phase3 = await db
    .insert(phase)
    .values({
      id: '33333333-3333-3333-3333-333333333333',
      siteId: site1[0].id,
      order: 2,
      crewEstimatedHours: null,
      discipline: 'striping',
      assignedCrewId: null,
      startDateTime: null,
      scheduledDateTime: null,
      status: 'pending',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  const phase4 = await db
    .insert(phase)
    .values({
      id: '44444444-4444-4444-4444-444444444444',
      siteId: site2[0].id,
      order: 0,
      crewEstimatedHours: 10,
      discipline: 'concrete',
      assignedCrewId: crew2[0].id,
      startDateTime: new Date(),
      scheduledDateTime: new Date(),
      status: 'Completed',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: [51.515, -0.095],
      estimatedMobilizationTime: new Date(),
      actualMobilizationTime: new Date(),
    })
    .returning({ id: phase.id });

  const phase5 = await db
    .insert(phase)
    .values({
      id: '55555555-5555-5555-5555-555555555555',
      siteId: site2[0].id,
      order: 1,
      crewEstimatedHours: 13,
      discipline: 'asphalt',
      assignedCrewId: crew2[0].id,
      startDateTime: new Date(),
      scheduledDateTime: new Date(),
      status: 'In Progress',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: [51.515, -0.095],
      estimatedMobilizationTime: new Date(),
      actualMobilizationTime: new Date(),
    })
    .returning({ id: phase.id });

  const phase6 = await db
    .insert(phase)
    .values({
      id: '66666666-6666-6666-6666-666666666666',
      siteId: site3[0].id,
      order: 1,
      crewEstimatedHours: null,
      discipline: 'asphalt',
      assignedCrewId: null,
      startDateTime: null,
      scheduledDateTime: null,
      status: 'In Progress',
      subContractorId: subContractor2[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  const phase7 = await db
    .insert(phase)
    .values({
      id: '77777777-7777-7777-7777-777777777777',
      siteId: site4[0].id,
      order: 0,
      crewEstimatedHours: null,
      discipline: 'asphalt',
      assignedCrewId: null,
      startDateTime: null,
      scheduledDateTime: null,
      status: 'In Progress',
      subContractorId: subContractor2[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  const phase8 = await db
    .insert(phase)
    .values({
      id: '88888888-8888-8888-8888-888888888888',
      siteId: site5[0].id,
      order: 1,
      crewEstimatedHours: 10,
      discipline: 'concrete',
      assignedCrewId: crew1[0].id,
      startDateTime: new Date(),
      scheduledDateTime: new Date(),
      status: 'Completed',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: [51.515, -0.095],
      estimatedMobilizationTime: new Date(),
      actualMobilizationTime: new Date(),
    })
    .returning({ id: phase.id });

  const phase9 = await db
    .insert(phase)
    .values({
      id: '99999999-9999-9999-9999-999999999999',
      siteId: site5[0].id,
      order: 1,
      crewEstimatedHours: 12,
      discipline: 'asphalt',
      assignedCrewId: crew2[0].id,
      startDateTime: new Date(),
      scheduledDateTime: new Date(),
      status: 'Completed',
      subContractorId: subContractor2[0].id,
      mobilizationFromLocation: [51.535, -0.097],
      estimatedMobilizationTime: new Date(),
      actualMobilizationTime: new Date(),
    })
    .returning({ id: phase.id });

  const phase10 = await db
    .insert(phase)
    .values({
      id: '10000000-0000-0000-0000-000000000000',
      siteId: site5[0].id,
      order: 2,
      crewEstimatedHours: 10,
      discipline: 'striping',
      assignedCrewId: crew3[0].id,
      startDateTime: null,
      scheduledDateTime: null,
      status: 'pending',
      subContractorId: subContractor1[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  const phase11 = await db
    .insert(phase)
    .values({
      id: '11000000-0000-0000-0000-000000000000',
      siteId: site6[0].id,
      order: 1,
      crewEstimatedHours: null,
      discipline: 'concrete',
      assignedCrewId: null,
      startDateTime: null,
      scheduledDateTime: null,
      status: 'Pending',
      subContractorId: subContractor2[0].id,
      mobilizationFromLocation: null,
      estimatedMobilizationTime: null,
      actualMobilizationTime: null,
    })
    .returning({ id: phase.id });

  await db.update(site).set({ currentPhaseId: phase2[0].id }).where(eq(site.id, site1[0].id));
  await db.update(site).set({ currentPhaseId: phase6[0].id }).where(eq(site.id, site3[0].id));
  await db.update(site).set({ currentPhaseId: phase7[0].id }).where(eq(site.id, site4[0].id));
  await db.update(site).set({ currentPhaseId: phase10[0].id }).where(eq(site.id, site5[0].id));
  await db.update(site).set({ currentPhaseId: phase11[0].id }).where(eq(site.id, site6[0].id));
};

populate();
