// src/pages/[lang].tsx

import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Import all our types. Notice 'Seo' is no longer imported directly.
import type { CourseData, Section, Instructor, FeatureItem, PointerItem, AboutItem, SeoMetaTag } from '@/types/course';

// Import shared components
import Trailer from '@/components/Trailer';
import Checklist from '@/components/Checklist';
import CTA from '@/components/CTA';

// --- (The reusable section components like InstructorsSection, etc. remain the same as before) ---
// CheckCircleIcon, InstructorsSection, FeaturesSection, PointersSection, AboutSection, DynamicSection...
// (Assuming these are still here from the previous code)

// --- Reusable Section Components (Copy from previous answer if missing) ---

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
  <ul className="space-y-3 list-disc list-inside text-gray-700">
    {values.map((pointer, index) => (
      <li key={index}>{pointer.text}</li>
    ))}
  </ul>
);

const AboutSection = ({ values }: { values: AboutItem[] }) => (
    <div className="space-y-6">
        {values.map((item, index) => (
            <div key={index}>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.title }}/>
                <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: item.description }}/>
            </div>
        ))}
    </div>
);


const DynamicSection = ({ section }: { section: Section }) => {
  if (!section.values || section.values.length === 0) return null;
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-green-500 pl-4">{section.name}</h2>
      <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
        {(() => {
          switch (section.type) {
            case 'instructors': return <InstructorsSection values={section.values} />;
            case 'features': return <FeaturesSection values={section.values} />;
            case 'pointers': return <PointersSection values={section.values} />;
            case 'about': return <AboutSection values={section.values} />;
            default: return null;
          }
        })()}
      </div>
    </div>
  );
};

// --- Main Page Component (No changes needed here) ---

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
        <div className="text-right mb-4">
            <button onClick={handleLanguageToggle} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Switch to {router.query.lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{courseData.title}</h1>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: courseData.description }} />
            {courseData.sections.map((section, index) => (
              <DynamicSection key={index} section={section as Section} />
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            {trailerUrl && <Trailer videoUrl={trailerUrl} />}
            <CTA ctaText={courseData.cta_text.name} price={1000} />
            {courseData.checklist?.length > 0 && <Checklist items={courseData.checklist} />}
          </div>
        </div>
      </main>
    </>
  );
}

// --- Data Fetching with ISR (This is where the fix is) ---

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { lang: 'en' } }, { params: { lang: 'bn' } }], fallback: 'blocking' };
}

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
            // FIX: We now use the imported 'SeoMetaTag' type instead of 'any'
            image: apiData.seo.defaultMeta.find((meta: SeoMetaTag) => meta.value === 'og:image')?.content || ''
        }
    };
    
    return { props: { courseData }, revalidate: 3600 };

  } catch (error) {
    console.error('Data fetching error:', error);
    return { props: { courseData: null }, revalidate: 60 };
  }
};