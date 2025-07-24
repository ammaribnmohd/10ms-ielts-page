// src/pages/[lang].tsx

import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Import all types
import type { CourseData, Section, Instructor, FeatureItem } from '@/types/course';

// Import shared components
import Trailer from '@/components/Trailer';
import Checklist from '@/components/Checklist';
import CTA from '@/components/CTA';

// --- Reusable Section Components (can be moved to /components) ---

// Check Icon for list items
const CheckCircleIcon = () => (
    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const InstructorsSection = ({ instructors }: { instructors: Instructor[] }) => (
  <div className="space-y-4">
    {instructors.map((instructor) => (
      <div key={instructor.name} className="flex items-center space-x-4">
        <Image src={instructor.image} alt={instructor.name} width={60} height={60} className="rounded-full" />
        <div>
          <h3 className="font-semibold text-lg">{instructor.name}</h3>
          <p className="text-gray-600">{instructor.details}</p>
        </div>
      </div>
    ))}
  </div>
);

const FeaturesSection = ({ features }: { features: FeatureItem[] }) => (
  <div className="space-y-6">
    {features.map((feature) => (
      <div key={feature.title} className="flex items-start">
        <Image src={feature.icon} alt="" width={40} height={40} className="mr-4" />
        <div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const PointersSection = ({ pointers }: { pointers: string[] }) => (
  <ul className="space-y-2">
    {pointers.map((pointer, index) => (
      <li key={index} className="flex items-center">
        <CheckCircleIcon />
        <span>{pointer}</span>
      </li>
    ))}
  </ul>
);

const AboutSection = ({ htmlContent }: { htmlContent: string }) => (
  <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: htmlContent }} />
);

// This component dynamically renders the correct section based on its 'type'
const DynamicSection = ({ section }: { section: Section }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{section.title}</h2>
      {(() => {
        switch (section.type) {
          case 'instructor':
            return <InstructorsSection instructors={section.data} />;
          case 'features':
            return <FeaturesSection features={section.data} />;
          case 'pointers':
            return <PointersSection pointers={section.data} />;
          case 'about':
            return <AboutSection htmlContent={section.data} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};


// --- Main Page Component ---

export default function CoursePage({ courseData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>; // Fallback state for ISR
  }

  if (!courseData) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p className="text-gray-700">Failed to load course data. Please try again later.</p>
            </div>
        </div>
    );
  }

  const trailerUrl = courseData.media.length > 0 ? courseData.media[0].link : '';

  const handleLanguageToggle = () => {
    const currentLang = router.query.lang || 'en';
    const newLang = currentLang === 'en' ? 'bn' : 'en';
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans container mx-auto p-4 md:p-8 bg-white">
        <div className="text-right mb-4">
          <button 
            onClick={handleLanguageToggle}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-colors duration-200"
          >
            Switch to {router.query.lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{courseData.title}</h1>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: courseData.description }}
            />
            
            {/* Dynamically render all sections from the API */}
            {courseData.sections.map((section, index) => (
              <DynamicSection key={index} section={section} />
            ))}
          </div>

          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            {trailerUrl && <Trailer videoUrl={trailerUrl} />}
            <CTA ctaText={courseData.cta_text.single} price={1000} />
            {courseData.checklist?.length > 0 && <Checklist items={courseData.checklist} />}
          </div>
        </div>
      </main>
    </>
  );
}

// --- Data Fetching with ISR ---

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-render the English and Bengali pages at build time
  const paths = [
    { params: { lang: 'en' } },
    { params: { lang: 'bn' } },
  ];
  // fallback: 'blocking' will SSR a page if it's requested but not pre-rendered
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps<{
  courseData: CourseData | null;
}> = async (context) => {
  const lang = context.params?.lang || 'en';
  const API_URL = `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`;

  try {
    const res = await fetch(API_URL, {
      headers: {
        'X-TENMS-SOURCE-PLATFORM': 'web',
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch API:', res.status, res.statusText);
      return { props: { courseData: null }, revalidate: 60 }; // Re-attempt after 1 minute on failure
    }

    const jsonResponse = await res.json();
    const courseData = jsonResponse.data;

    return {
      props: { courseData },
      // This enables Incremental Static Regeneration.
      // The page will be re-generated at most once every hour (3600s) if a request comes in.
      revalidate: 3600,
    };
  } catch (error) {
    console.error('An error occurred while fetching course data:', error);
    return { props: { courseData: null }, revalidate: 60 };
  }
};