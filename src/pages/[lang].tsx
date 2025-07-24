// src/pages/[lang].tsx

import { useState } from 'react';
import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Import all necessary types, including the Translations type from your types file
import type { CourseData, Section, Instructor, FeatureItem, PointerItem, AboutItem, SeoMetaTag, Translations } from '@/types/course';

// Import shared components
import Trailer from '@/components/Trailer';
import Checklist from '@/components/Checklist';
import CTA from '@/components/CTA';

// --- Reusable Icon Components ---
const CheckIcon = () => (
    <svg className="h-6 w-6 text-blue-500 flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 5.056a2 2 0 013.132 0l1.414 1.414a2 2 0 010 3.132l-1.414 1.414a2 2 0 01-3.132 0l-1.414-1.414a2 2 0 010-3.132zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// --- Reusable Section Components ---
const InstructorsSection = ({ values }: { values: Instructor[] }) => (
  <div className="space-y-6">
    {values.map((instructor) => (
      <div key={instructor.name} className="flex items-start space-x-4">
        <Image src={instructor.image} alt={instructor.name} width={80} height={80} className="rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-xl">{instructor.name}</h3>
          <div className="text-gray-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: instructor.description }} />
        </div>
      </div>
    ))}
  </div>
);
const FeaturesSection = ({ values }: { values: FeatureItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {values.map((feature) => (
      <div key={feature.title} className="flex items-start space-x-4">
        <Image src={feature.icon} alt="" width={40} height={40} className="mt-1" />
        <div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-gray-600">{feature.subtitle}</p>
        </div>
      </div>
    ))}
  </div>
);
const PointersSection = ({ values }: { values: PointerItem[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {values.map((pointer, index) => (
            <div key={index} className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700">{pointer.text}</span>
            </div>
        ))}
    </div>
);
const CourseDetailsAccordion = ({ values }: { values: AboutItem[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            {values.map((item, index) => {
                const isOpen = activeIndex === index;
                const cleanTitle = item.title.replace(/<[^>]*>?/gm, '');
                return (
                    <div key={index}>
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 bg-white hover:bg-gray-50"
                            aria-expanded={isOpen}
                        >
                            <span>{cleanTitle}</span>
                            <ChevronDownIcon className={`transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="prose max-w-none px-5 pb-5 text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                        </div>
                        {index < values.length - 1 && (<div className="mx-5 border-b border-dashed border-slate-200"></div>)}
                    </div>
                );
            })}
        </div>
    );
};

// --- DynamicSection with Translation Logic ---
const DynamicSection = ({ section, lang, translations }: { section: Section; lang: 'en' | 'bn'; translations: Translations; }) => {
  if (!section.values || section.values.length === 0) return null;
  
  let title = section.name; 
  if (lang === 'bn' && translations.bn[section.name]) {
      title = translations.bn[section.name];
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      {section.type === 'about' ? (
        <CourseDetailsAccordion values={section.values} />
      ) : (
        <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
          {(() => {
            switch (section.type) {
              case 'instructors': return <InstructorsSection values={section.values} />;
              case 'features': return <FeaturesSection values={section.values} />;
              case 'pointers': return <PointersSection values={section.values} />;
              default: return null;
            }
          })()}
        </div>
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
          "Course Exclusive Feature": "কোর্স এক্সক্লুসিভ ফিচার"
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

      <main className="font-sans container mx-auto p-4 md:p-8 bg-white">
        <div className="flex justify-end mb-4">
            <button
                onClick={handleLanguageToggle}
                className="flex items-center space-x-2 rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                aria-label="Toggle language"
            >
                <GlobeIcon />
                <span>
                    {lang.toUpperCase()}
                </span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{courseData.title}</h1>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: courseData.description }} />
            
            {courseData.sections.map((section, index) => (
              <DynamicSection
                key={index}
                section={section as Section}
                lang={lang}
                translations={translations}
              />
            ))}
          </div>

          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            {trailerUrl && <Trailer videoUrl={trailerUrl} />}
            <CTA ctaText={courseData.cta_text.name} price={3850} />
            
            {courseData.checklist?.length > 0 && (
              <Checklist title={t.checklistTitle} items={courseData.checklist} />
            )}
          </div>
        </div>
      </main>
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