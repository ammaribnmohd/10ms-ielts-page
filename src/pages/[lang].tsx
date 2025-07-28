
import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

// Import types
import type { CourseData, SeoMetaTag, Translations } from '@/types/course';

// Import layout and page-level components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MobileTopCtaBlock from '@/components/MobileTopCtaBlock';
import StickyMobileCta from '@/components/StickyMobileCta';
import MainContent from '@/components/MainContent';
import DesktopSidebar from '@/components/DesktopSidebar';

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function CoursePage({ courseData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  
  const [showStickyCta, setShowStickyCta] = useState(false);
  const mobileCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileCtaRef.current && window.innerWidth < 768) {
        const rect = mobileCtaRef.current.getBoundingClientRect();
        setShowStickyCta(rect.bottom < 0);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
        return { name: translatedName, id: slugify(section.name) }
    });

  const PRICING_DATA = { price: 3850, originalPrice: 5000, discount: 1150 };

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
        <Navbar currentLang={lang} onLanguageToggle={handleLanguageToggle} />
        <main>
          <Hero
            title={courseData.title}
            description={courseData.description}
            backgroundImage="https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg"
            mediaItems={courseData.media}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            
            <MobileTopCtaBlock
              ref={mobileCtaRef}
              ctaText={lang === 'bn' ? 'কোর্সটি কিনুন' : courseData.cta_text.name}
              checklistTitle={t.checklistTitle}
              checklist={courseData.checklist}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16">
              <MainContent
                navItems={navItems}
                sections={courseData.sections}
                lang={lang}
                translations={translations}
              />
              <DesktopSidebar
                mediaItems={courseData.media}
                ctaText={lang === 'bn' ? 'কোর্সটি কিনুন' : courseData.cta_text.name}
                checklistTitle={t.checklistTitle}
                checklist={courseData.checklist}
              />
            </div>
          </div>
        </main>

        <StickyMobileCta
          show={showStickyCta}
          price={PRICING_DATA.price}
          originalPrice={PRICING_DATA.originalPrice}
          discount={PRICING_DATA.discount}
          ctaText={lang === 'bn' ? 'কোর্সটি কিনুন' : courseData.cta_text.name}
        />
      </div>
    </>
  );
}

// --- Data Fetching with ISR (No changes here) ---
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { lang: 'en' } }, { params: { lang: 'bn' } }], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<{ courseData: CourseData | null; }> = async (context) => {
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