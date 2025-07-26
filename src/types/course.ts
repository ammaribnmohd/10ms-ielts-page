// FILE: src/types/course.ts

// --- Base Types from API Response ---

export interface Media {
  name: string;
  resource_type: 'video' | 'image';
  resource_value: string;
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


// --- Section-Specific Item Types ---

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

export interface FeatureExplanationItem {
  title: string;
  file_url: string;
  checklist: string[];
}

export interface TestimonialItem {
    name: string;
    description: string;
    profile_image: string;
    testimonial: string;
}

export interface FaqItem {
    question: string;
    answer: string;
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

interface FeatureExplanationsSection extends BaseSection {
    type: 'feature_explanations';
    values: FeatureExplanationItem[];
}

interface TestimonialsSection extends BaseSection {
    type: 'testimonials';
    values: TestimonialItem[];
}

interface FaqSection extends BaseSection {
    type: 'faq';
    values: FaqItem[];
}

// NOTE: The 'OtherSection' / catch-all has been REMOVED.
// This makes the union "closed", allowing TypeScript to perform proper type narrowing.
// Any section types from the API not defined here will now correctly cause a type error during data fetching.

export type Section = 
  | InstructorsSection 
  | FeaturesSection 
  | PointersSection 
  | AboutSection
  | FeatureExplanationsSection
  | TestimonialsSection
  | FaqSection;


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

// --- UI-Specific Type for Page Translations ---
export type Translations = {
    en: {
        checklistTitle: string;
    };
    bn: {
        checklistTitle:string;
        [key: string]: string; 
    };
};