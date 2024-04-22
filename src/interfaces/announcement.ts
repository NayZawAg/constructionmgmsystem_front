import { User } from "./user";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  user: User;
}