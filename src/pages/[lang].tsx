// FILE: src/pages/[lang].tsx

import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Import all necessary types
import type { CourseData, Section, Translations, SeoMetaTag } from '@/types/course';

// Import ALL reusable components
import Navbar from '@/components/Navbar'; // <-- IMPORT THE NEW NAVBAR
import Hero from '@/components/Hero';
import Trailer from '@/components/Trailer';
import Checklist from '@/components/Checklist';
import CTA from '@/components/CTA';
import Instructors from '@/components/Instructor';
import Features from '@/components/Features';
import Pointers from '@/components/Pointers';
import About from '@/components/About';
import FeatureExplanations from '@/components/FeatureExplanations';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';


// --- DynamicSection with Translation and Component-Routing Logic ---
const DynamicSection = ({ section, lang, translations }: { section: Section; lang: 'en' | 'bn'; translations: Translations; }) => {
  if (!section.values || section.values.length === 0) {
    return null;
  }
  
  let title = section.name; 
  if (lang === 'bn' && translations.bn[section.name]) {
      title = translations.bn[section.name];
  }

  const renderSectionContent = () => {
    switch (section.type) {
      case 'instructors': return <Instructors instructors={section.values} />;
      case 'features': return <Features features={section.values} />;
      case 'pointers': return <Pointers pointers={section.values} />;
      case 'about': return <About items={section.values} />;
      case 'faq': return <Faq items={section.values} />;
      case 'feature_explanations': return <FeatureExplanations items={section.values} />;
      case 'testimonials': return <Testimonials items={section.values} />;
      default: return null;
    }
  }

  const content = renderSectionContent();
  if (!content) return null;

  const useWrapper = !['about', 'faq'].includes(section.type);

  return (
    <div className="py-4">
      {title && <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>}
      {useWrapper ? (
         <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
            {content}
         </div>
      ) : (
        content
      )}
    </div>
  );
};


// --- Main Page Component ---
export default function CoursePage({ courseData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading page...</div>;
  if (!courseData) return <div>Error loading course data. Please try again later.</div>;
  
  const trailerVideo = courseData.media.find(m => m.resource_type === 'video');
  const trailerUrl = trailerVideo ? `https://www.youtube.com/watch?v=${trailerVideo.resource_value}` : '';
  
  const handleLanguageToggle = () => {
    const newLang = router.query.lang === 'en' ? 'bn' : 'en';
    router.push(`/${newLang}`);
  };

  const lang = (router.query.lang as 'en' | 'bn') || 'en';

  const translations: Translations = {
      en: {
          checklistTitle: 'What you get in this course'
      },
      bn: {
          checklistTitle: 'এই কোর্সে যা থাকছে',
          "Course instructor": "কোর্স ইন্সট্রাক্টর",
          "How the course is laid out": "কোর্সটি যেভাবে সাজানো হয়েছে",
          "What you will learn by doing the course": "কোর্সটি করে যা শিখবেন",
          "Course details": "কোর্স সম্পর্কে বিস্তারিত",
          "Course Exclusive Feature": "কোর্স এক্সক্লুসিভ ফিচার",
          "Students opinion": "শিক্ষার্থীদের মতামত",
          "Frequently Ask Questions": "সাধারণ জিজ্ঞাসা"
      }
  };
  const t = translations[lang];

  return (
    <>
      <Head>
        <title>{courseData.seo.title}</title>
        <meta name="description" content={courseData.seo.description} />
        <meta property="og:title" content={courseData.seo.title} />
        <meta property="og:description" content={courseData.seo.description} />
        <meta property="og:image" content={courseData.seo.image} />
      </Head>

      {/* Changed bg-white to bg-gray-50 for a slightly off-white background */}
      <div className="font-sans bg-gray-50">
        <Navbar 
          currentLang={lang}
          onLanguageToggle={handleLanguageToggle}
        />
        <main>
          <Hero 
            title={courseData.title}
            description={courseData.description}
            backgroundImage="https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16">
                  
                  {/* --- LEFT COLUMN --- */}
                  {/* -mt-24 pulls this column's content up slightly to create a small overlap */}
                  <div className="lg:col-span-2 space-y-4 -mt-24">
                      {/* This empty div with height acts as a spacer, pushing content down below the navbar area */}
                      <div className="h-24"></div> 
                      {courseData.sections.map((section, index) => (
                      <DynamicSection
                          key={index}
                          section={section}
                          lang={lang}
                          translations={translations}
                      />
                      ))}
                  </div>

                  {/* --- RIGHT COLUMN (ABSOLUTELY POSITIONED) --- */}
                  <div className="lg:absolute lg:top-0 lg:right-0 lg:w-1/3 lg:-mt-24 px-4 sm:px-6 lg:px-8 space-y-6">
                      {trailerUrl && <Trailer videoUrl={trailerUrl} />}
                      <CTA ctaText={courseData.cta_text.name} price={3850} />
                      
                      {courseData.checklist?.length > 0 && (
                      <Checklist title={t.checklistTitle} items={courseData.checklist} />
                      )}
                  </div>
              </div>
          </div>
        </main>
      </div>
    </>
  );
}


// --- Data Fetching with ISR (No changes needed) ---
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { lang: 'en' } }, { params: { lang: 'bn' } }], fallback: 'blocking' };
};
export const getStaticProps: GetStaticProps<{
  courseData: CourseData | null;
}> = async (context) => {
  const lang = context.params?.lang || 'en';
  const API_URL = `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`;
  try {
    const res = await fetch(API_URL, { headers: { 'X-TENMS-SOURCE-PLATFORM': 'web' } });
    if (!res.ok) throw new Error(`API call failed: ${res.status}`);
    const jsonResponse = await res.json();
    const apiData = jsonResponse.data;
    const courseData: CourseData = {
        ...apiData,
        cta_text: {
            name: apiData.cta_text.name || 'Enroll Now',
            value: apiData.cta_text.value
        },
        seo: {
            title: apiData.seo.title,
            description: apiData.seo.description,
            image: apiData.seo.defaultMeta.find((meta: SeoMetaTag) => meta.value === 'og:image')?.content || ''
        }
    };
    return { props: { courseData }, revalidate: 3600 };
  } catch (error) {
    console.error('Data fetching error:', error);
    return { props: { courseData: null }, revalidate: 60 };
  }
};