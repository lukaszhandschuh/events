import { DateTime } from "luxon";

export type TEvent = {
  id?: number;
  title: string;
  date: string;
  description: string;
  image: string;
  type: TEventType;
  phoneNumber: string;
  email: string;
  address: string;
};

export type TEventForm = {
  title: string;
  date: DateTime | null;
  description: string;
  image: File | null;
  type: TEventType;
  phoneNumber: string;
  email: string;
  address: string;
};

export type TEventType = "sport" | "health" | "culture";

export const eventTypes: TEventType[] = ["sport", "culture", "health"];
