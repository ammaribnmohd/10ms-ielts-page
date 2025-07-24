// src/types/course.ts

// --- Base Types from API Response ---

export interface Media {
  name: string;
  resource_type: 'video' | 'image';
  resource_value: string; // This is the YouTube ID for videos
  thumbnail_url: string;
}

export interface ChecklistItem {
  icon: string;
  text: string;
  color: string;
  id: string;
  list_page_visibility: boolean;
}

export interface Seo {
  title: string;
  description: string;
  image: string;
}

export interface SeoMetaTag {
  content: string;
  type: string;
  value: string;
}


// --- Section-Specific Types ---

export interface Instructor {
  name: string;
  image: string;
  description: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  subtitle: string;
}

export interface PointerItem {
  text: string;
}

export interface AboutItem {
  title: string;
  description: string;
}


// --- Discriminated Union for Sections ---

interface BaseSection {
  type: string;
  name: string;
}

interface InstructorsSection extends BaseSection {
  type: 'instructors';
  values: Instructor[];
}

interface FeaturesSection extends BaseSection {
  type: 'features';
  values: FeatureItem[];
}

interface PointersSection extends BaseSection {
  type: 'pointers';
  values: PointerItem[];
}

interface AboutSection extends BaseSection {
  type: 'about';
  values: AboutItem[];
}

export type Section = InstructorsSection | FeaturesSection | PointersSection | AboutSection;


// --- The Main Course Data Structure ---

export interface CourseData {
  title: string;
  description: string;
  media: Media[];
  checklist: ChecklistItem[];
  cta_text: {
    name: string;
    value: string;
  };
  sections: Section[];
  seo: Seo;
}

// --- NEW: UI-Specific Type for Page Translations ---
export type Translations = {
    en: {
        checklistTitle: string;
    };
    bn: {
        checklistTitle: string;
        [key: string]: string; // Allows for any string key for section titles
    };
};