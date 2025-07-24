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
}

export interface Seo {
  title: string;
  description: string;
  image: string;
}

// We'll use this to type the raw API data during processing
export interface SeoMetaTag {
  content: string;
  type: string;
  value: string;
}


// --- Section-Specific Types ---

export interface Instructor {
  name: string;
  image: string;
  description: string; // The API uses 'description' for details
}

export interface FeatureItem {
  icon: string;
  title: string;
  subtitle: string; // The API uses 'subtitle' for description
}

export interface PointerItem {
  text: string;
}

export interface AboutItem {
  title: string; // Contains <h2><b>...</b></h2>
  description: string; // Contains <li>...</li>
}


// --- Discriminated Union for Sections ---

interface BaseSection {
  type: string;
  name: string; // This is the title of the section
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

// Add other section types here if you want to render them
// e.g. | FaqSection | TestimonialsSection etc.

// This is the final Section type. We only include what we plan to render.
export type Section = InstructorsSection | FeaturesSection | PointersSection | AboutSection;


// --- The Main Course Data Structure ---

export interface CourseData {
  title: string;
  description: string; // This is an HTML string
  media: Media[];
  checklist: ChecklistItem[];
  cta_text: {
    name: string; // The API uses 'name' for the button text
    value: string;
  };
  sections: Section[];
  seo: Seo;
}