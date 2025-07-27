// src/pages/[lang].tsx

import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react'; // React hooks are already here

// Import all necessary types
import type { CourseData, Section, Translations, SeoMetaTag } from '@/types/course';

// Import ALL reusable components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SectionNav from '@/components/SectionNav';
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
import GroupJoinEngagement from '@/components/GroupJoinEngagement';
import FreeItems from '@/components/FreeItems';



const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


const DynamicSection = ({ section, lang, translations, id }: { section: Section; lang: 'en' | 'bn'; translations: Translations; id: string }) => {
  if ((!section.values || section.values.length === 0) && section.type !== 'free_items') {
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
      case 'group_join_engagement': return <GroupJoinEngagement items={section.values} />;
      case 'free_items': return <FreeItems />;
      default:
        const _exhaustiveCheck: never = section;
        return null;
    }
  }

  const content = renderSectionContent();
  if (!content) return null;

  const useWrapper = !['about', 'faq', 'group_join_engagement', 'free_items','instructor', 'features','feature_explanations', 'testimonials'].includes(section.type);

  return (
    <div id={id} className="scroll-mt-[140px] pb-12">
      {title && !['group_join_engagement'].includes(section.type) && (
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      )}
      {useWrapper ? (
         <div className="border p-6 bg-slate-50 rounded-lg shadow-sm">
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
  
  // --- START: MODIFIED STATE AND SCROLL LOGIC ---
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  const stickyWrapperRef = useRef<HTMLDivElement>(null); // Ref for the sidebar's sticky container

  useEffect(() => {
    const handleScroll = () => {
      if (stickyWrapperRef.current) {
        const stickyOffset = 96; // Corresponds to `top-24` (6rem * 16px/rem = 96px)
        const elementTop = stickyWrapperRef.current.getBoundingClientRect().top;
        
        // When the element's top position reaches the sticky offset, make it compact.
        if (elementTop <= stickyOffset) {
          setIsSidebarCompact(true);
        } else {
          setIsSidebarCompact(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // The effect runs once on mount
  // --- END: MODIFIED STATE AND SCROLL LOGIC ---

  if (router.isFallback) return <div>Loading page...</div>;

  const handleLanguageToggle = () => {
    const newLang = router.query.lang === 'en' ? 'bn' : 'en';
    router.push(`/${newLang}`);
  };

  const lang = (router.query.lang as 'en' | 'bn') || 'en';

  if (!courseData) return <div>Error loading course data. Please try again later.</div>;

  const translations: Translations = {
      en: {
          checklistTitle: 'What you get in this course'
      },
      bn: {
          checklistTitle: 'এই কোর্সে যা থাকছে',
          "Course instructor": "কোর্স ইন্সট্রাক্টর",
          "How the course is laid out": "কোর্সটি যেভাবে সাজানো হয়েছে",
          "What you will learn by doing the course": "কোর্সটি করে যা শিখবেন",
          "Course details": "কোর্স সম্পর্কে বিস্তারিত",
          "Course Exclusive Feature": "কোর্স এক্সক্লুসিভ ফিচার",
          "Students opinion": "শিক্ষার্থীদের মতামত",
          "Frequently Ask Questions": "সাধারণ জিজ্ঞাসা",
          "Free items with this products-": "এই কোর্সের সাথে যা ফ্রি পাচ্ছেন-"
      }
  };
  const t = translations[lang];

  const navItems = courseData.sections
    .filter(section => section.name && ['instructors', 'features', 'pointers', 'about', 'feature_explanations', 'free_items', 'testimonials', 'faq'].includes(section.type))
    .map(section => {
        const translatedName = lang === 'bn' && translations.bn[section.name] ? translations.bn[section.name] : section.name;

        return {
            name: translatedName,
            id: slugify(section.name)
        }
    });


  return (
    <>
      <Head>
        <title>{courseData.seo.title}</title>
        <meta name="description" content={courseData.seo.description} />
        <meta property="og:title" content={courseData.seo.title} />
        <meta property="og:description" content={courseData.seo.description} />
        <meta property="og:image" content={courseData.seo.image} />
      </Head>

      <div className={`bg-gray-50 ${lang === 'bn' ? 'font-bengali' : 'font-sans'}`}>
        <Navbar
          currentLang={lang}
          onLanguageToggle={handleLanguageToggle}
        />
        <main>
          {/* Hero section no longer needs a ref */}
          <div>
            <Hero
              title={courseData.title}
              description={courseData.description}
              backgroundImage="https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg"
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16">

                  {/* --- LEFT COLUMN --- */}
                  <div className="md:col-span-2">
                      <SectionNav items={navItems} />
                      <div className="h-8" />
                      <div>
                        {courseData.sections.map((section, index) => (
                        <DynamicSection
                            key={index}
                            section={section}
                            lang={lang}
                            translations={translations}
                            id={slugify(section.name)}
                        />
                        ))}
                      </div>
                  </div>

                  {/* --- RIGHT COLUMN  --- */}
                  <div className="md:col-span-1">
                      {/* --- MODIFICATION: Added ref to this sticky container --- */}
                      <div ref={stickyWrapperRef} className={`md:sticky md:top-24 h-fit transition-all duration-300 ${isSidebarCompact ? 'md:mt-0' : 'md:-mt-72'}`}>
                          <div className="border border-gray-200 overflow-hidden bg-gray-50">
                            {/* Trailer is still conditionally rendered */}
                            {!isSidebarCompact && <Trailer mediaItems={courseData.media} />}
                            <CTA
                              ctaText={lang === 'bn' ? 'কোর্সটি কিনুন' : courseData.cta_text.name}
                            />
                            {courseData.checklist?.length > 0 && (
                              <Checklist title={t.checklistTitle} items={courseData.checklist} />
                            )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </main>
      </div>
    </>
  );
}


// --- Data Fetching with ISR (No changes here) ---
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