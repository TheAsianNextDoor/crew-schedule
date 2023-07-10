import { relations } from 'drizzle-orm';
import {
  type AnyPgColumn,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const sub_contractor = pgTable('sub_contractor', {
  id: uuid('id').primaryKey().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  scheduledDate: timestamp('scheduled_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const client = pgTable('client', {
  id: uuid('id').primaryKey().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const clientRelations = relations(client, ({ many }) => ({
//   sites: many(site),
// }));

export const foreman = pgTable('foreman', {
  id: uuid('id').primaryKey().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const foremanRelations = relations(foreman, ({ many }) => ({
//   crews: many(crew),
// }));

export const crew_member = pgTable('crew_member', {
  id: uuid('id').primaryKey().notNull(),
  crewId: uuid('crew_id')
    .notNull()
    .references(() => crew.id),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const crew = pgTable('crew', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
  size: integer('size').notNull(),
  weeklyHours: real('weekly_hours').notNull(),
  weeklyCapacity: real('weekly_capacity').notNull(),
  discipline: text('discipline').notNull(),
  foremanId: uuid('foreman_id').references(() => foreman.id),
  personnelHourlyCost: real('personnel_hourly_cost').notNull(),
  equipmentHourlyCost: real('equipment_hourly_cost').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const crewRelations = relations(crew, ({ one, many }) => ({
//   foreman: one(foreman, {
//     fields: [crew.foremanId],
//     references: [foreman.id],
//   }),
//   crewMembers: many(crew_member),
// }));

export const phase = pgTable('phase', {
  id: uuid('id').primaryKey(),
  siteId: uuid('site_id')
    .notNull()
    .references((): AnyPgColumn => site.id),
  order: integer('order').notNull(),
  crewEstimatedHours: real('crew_estimated_hours'),
  discipline: text('discipline').notNull(),
  assignedCrewId: uuid('assigned_crew_id').references(() => crew.id),
  // personnelCount: integer('personnel_count'),
  scheduledDateTime: timestamp('scheduled_date_time'),
  startDateTime: timestamp('start_date_time'),
  status: text('status').notNull(),
  subContractorId: uuid('sub_contractor_id')
    .notNull()
    .references(() => sub_contractor.id),
  mobilizationFromLocation: real('mobilization_from_location').array(2),
  estimatedMobilizationTime: timestamp('estimated_mobilization_time'),
  actualMobilizationTime: timestamp('actual_mobilization_time'),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const phaseRelations = relations(phase, ({ one }) => ({
//   crew: one(crew, {
//     fields: [phase.assignedCrewId],
//     references: [crew.id],
//   }),
//   subContractor: one(sub_contractor, {
//     fields: [phase.subContractorId],
//     references: [sub_contractor.id],
//   }),
//   site: one(site, {
//     fields: [phase.siteId],
//     references: [site.id],
//   }),
// }));

export const site = pgTable('site', {
  id: uuid('id').primaryKey(),
  jobNumber: text('job_number'),
  name: text('name'),
  location: real('location').array(2),
  clusterId: text('cluster_id'),
  totalEstimatedHours: real('total_estimated_hours'),
  clientId: uuid('client_id').references(() => client.id),
  attachments: text('attachments').array(),
  notes: text('notes'),
  // currentPhaseId: uuid('current_phase_id'),
  currentPhaseId: uuid('current_phase_id').references((): AnyPgColumn => phase.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const siteRelations = relations(site, ({ one }) => ({
//   currentPhaseId: one(phase, {
//     fields: [site.currentPhaseId],
//     references: [phase.id],
//   }),
// }));
