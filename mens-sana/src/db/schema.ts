import { integer, pgEnum, pgTable, serial, text, timestamp, date, boolean, primaryKey, time, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';
import { user } from "./auth-schema"

export const activityTypeEnum = pgEnum('activity_type', ['amount', 'checkbox']);
export const tracksTypeEnum = pgEnum('tracks_type', ['habit', 'energy', 'pleasantness'])

export const habits = pgTable('habits', {
    user_id: text('user_id').notNull().references(() => user.id),
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    type: activityTypeEnum('type'),
    goal: integer('goal'),
    unit: text('unit')
});

export const schedule = pgTable('schedule', {
    user_id: text('user_id').notNull().references(() => user.id),
    habit_id: integer('habit_id').references(() => habits.id, 
      {onDelete: 'cascade'}),
    id: serial('id').notNull(),
    date: date('date').notNull(),
    time: time('time'),
    name: text('name').notNull(),
    type: activityTypeEnum('type').notNull(),
    progress: integer('progress'), //ove tri za checkbox?
    goal: integer('goal'),
    unit: text('unit')
}, (table) => [
    primaryKey({columns: [table.user_id, table.id]})
]);


export const moodTracker = pgTable('moodTracker', {
    user_id: text('user_id').notNull().references(() => user.id),
    date: date('date').notNull(),
    energy: integer('energy').array(),
    pleasantness: integer('pleasantness').array(),
    id: serial('id').primaryKey()
})

export const habitTracker = pgTable('habitsTracker', {
  user_id: text('user_id')
    .notNull()
    .references(() => user.id),

  habit_id: integer('habit_id')
    .notNull()
    .references(() => habits.id,
      {onDelete: 'cascade'}),

  date: date('date').notNull(),

  value: integer('value').notNull(),
}, (table) => [
  primaryKey({ columns: [table.user_id, table.habit_id, table.date] }),
]);

export const charts = pgTable('charts', {
    user_id: text('user_id').notNull().references(() => user.id),
    id: serial('id').notNull(),
    title: text('title').notNull(),
    param1: text('param1').notNull(),
    param2: text('param2'),
    data: jsonb('data').notNull(),
    onHome: boolean().default(false)
}, (table) => [
    primaryKey({ columns: [table.user_id, table.id]})
]);

export interface ChartUI {
  id: string;
  title: string;
  param1: string;
  param2?: string;
  data: {
    x: string;
    values: {v1: number, v2: number}[];
  }[];
  onHome: boolean;
}
