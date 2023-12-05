import {
  type Session,
  type SupabaseClient,
  type User,
  type UserMetadata,
} from '@supabase/supabase-js';

import { type Item, type DndEvent } from 'svelte-dnd-action';

import { type Database } from './DatabaseDefinitions';
import type { HydratedMapMarker } from './routes/(auth)/map/stores/map-marker-store';
import type { EmployeeInfo } from './retrieve-employee-info';

export interface GithubSession extends Session {
  user: User & {
    user_metadata: UserMetadata & {
      avatar_url: string;
      email: string;
      email_verified: boolean;
      full_name: string;
      iss: string;
      name: string;
      preferred_username: string;
      provider_id: string;
      sub: string;
      user_name: string;
    };
  };
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<GithubSession | null>;
      session: GithubSession | null;
      user: EmployeeInfo;
    }
    interface PageData {
      session: GithubSession | null;
    }
    // interface Platform {}
  }
}

declare type DndEvent<Item = HydratedMapMarker> = DndEvent<Item>;
declare type DndEvent<ItemType = Item> = DndEvent<ItemType>;
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:consider'?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void;
    'on:finalize'?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void;
  }
}

export {};
