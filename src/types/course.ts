// A simplified version based on the prompt. You can expand this
// by inspecting the actual API response in your browser.

export interface Instructor {
  name: string;
  image: string;
  details: string; // e.g., "IELTS 8.5 Scorer"
}

export interface Section {
  type: string; // 'instructor', 'features', 'pointers', 'about' etc.
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // The data format depends on the 'type'
}

export interface ChecklistItem {
  text: string;
}

export interface Media {
    // Assuming the trailer is the first item
    // Inspect the actual API response to confirm
    link: string; // This will be the YouTube link
}

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
  }
}