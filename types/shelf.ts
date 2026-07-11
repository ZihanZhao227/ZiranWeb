export type ShelfCategory = "Everyday" | "Inedible" | "Medley";

export const SHELF_CATEGORIES: ShelfCategory[] = ["Everyday", "Inedible", "Medley"];

export interface ShelfEntryMeta {
  id: string;
  category: ShelfCategory;
  title: string;
  date: string | null;
}

export type ShelfContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "bulleted"; text: string }
  | { type: "numbered"; text: string }
  | { type: "quote"; text: string }
  | { type: "code"; text: string; language: string }
  | { type: "divider" }
  | { type: "image"; src: string; caption: string };

export interface ShelfEntry extends ShelfEntryMeta {
  content: ShelfContentBlock[];
}
