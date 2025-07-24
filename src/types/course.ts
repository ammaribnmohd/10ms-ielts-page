// src/types/course.ts

// --- Individual Component/Data Types ---

export interface Instructor {
  name: string;
  image: string;
  details: string;
}

export interface ChecklistItem {
  text: string;
}

export interface Media {
  link: string; // The YouTube link
}

export interface FeatureItem {
  // NOTE: Inspect the actual API response for the correct structure.
  // This is a common pattern.
  icon: string;
  title: string;
  description: string;
}

// --- Discriminated Union for Sections ---
// This ensures that if type is 'instructor', data is guaranteed to be Instructor[]

interface BaseSection {
  title: string;
}

interface InstructorSection extends BaseSection {
  type: 'instructor';
  data: Instructor[];
}

interface FeaturesSection extends BaseSection {
  type: 'features';
  data: FeatureItem[];
}

interface PointersSection extends BaseSection {
  type: 'pointers';
  data: string[]; // Usually a simple list of strings
}

interface AboutSection extends BaseSection {
  type: 'about';
  data: string; // Usually an HTML string
}

// The main Section type is a union of all possible section types
export type Section = InstructorSection | FeaturesSection | PointersSection | AboutSection;


// --- Main Course Data Structure ---

export interface CourseData {
  title: string;
  description: string; // This is an HTML string
  media: Media[];
  checklist: ChecklistItem[];
  cta_text: {
    single: string;
  };
  sections: Section[];
  seo: {
    title: string;
    description: string;
    image: string;
  };
}