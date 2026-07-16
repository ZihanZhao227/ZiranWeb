export type ShelfCategory = "Everyday" | "Inedible" | "Medley";

export const SHELF_CATEGORIES: ShelfCategory[] = ["Everyday", "Inedible", "Medley"];

export interface ShelfEntryMeta {
  id: string;
  category: ShelfCategory;
  title: string;
  date: string | null;
}

export interface RichTextSegment {
  text: string;
  color?: string;
}

export type ShelfContentBlock =
  | { type: "paragraph"; text: RichTextSegment[] }
  | { type: "heading"; level: 1 | 2 | 3; text: RichTextSegment[] }
  | { type: "bulleted"; text: RichTextSegment[] }
  | { type: "numbered"; text: RichTextSegment[] }
  | { type: "quote"; text: RichTextSegment[] }
  | { type: "code"; text: string; language: string }
  | { type: "divider" }
  | { type: "image"; src: string; caption: string };

export interface ShelfEntry extends ShelfEntryMeta {
  content: ShelfContentBlock[];
}
