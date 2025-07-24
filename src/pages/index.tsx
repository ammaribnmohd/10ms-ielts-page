import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Import custom types. Make sure the path is correct based on your folder structure.
import type { CourseData, Section, Instructor as InstructorType } from '@/types/course';

// Import all the components we created.
import Trailer from '@/components/Trailer';
import Checklist from '@/components/Checklist';
import CTA from '@/components/cta';
import Instructors from '@/components/Instructor';

// Helper function to find a specific section by its 'type' property from the API response.
// This keeps our main component cleaner.
const findSectionData = (sections: Section[], type: string): unknown | null => {
  const section = sections.find(s => s.type === type);
  // Return the data property of the found section, or null if not found.
  return section ? section.data : null;
};

// This is our main Page Component.
export default function Home({ courseData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // The useRouter hook gives us access to the router object, including query params.
  const router = useRouter();

  // A guard clause to handle cases where the API call might fail.
  // This prevents the page from crashing and shows a user-friendly message.
  if (!courseData) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p className="text-gray-700">Failed to load course data. Please try refreshing the page.</p>
            </div>
        </div>
    );
  }
  
  // Extract the specific data needed for our components using the helper function.
  // This makes the JSX below much more readable.
  const instructorsData = findSectionData(courseData.sections, 'instructor') as InstructorType[];
  const trailerUrl = courseData.media.length > 0 ? courseData.media[0].link : '';

  // Function to handle the language toggle button click.
  const handleLanguageToggle = () => {
    const currentLang = router.query.lang || 'en';
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    // Pushes a new URL to the browser, which triggers a new server-side render
    // with the new language query parameter.
    router.push(`/?lang=${newLang}`);
  };

  return (
    <>
      {/* The Head component from Next.js for SEO and page metadata. */}
      <Head>
        <title>{courseData.seo.title}</title>
        <meta name="description" content={courseData.seo.description} />
        <meta property="og:title" content={courseData.seo.title} />
        <meta property="og:description" content={courseData.seo.description} />
        <meta property="og:image" content={courseData.seo.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main content container with some padding and responsive centering. */}
      <main className="font-sans container mx-auto p-4 md:p-8 bg-white">
        
        {/* Language Toggle Button at the top right. */}
        <div className="text-right mb-4">
          <button 
            onClick={handleLanguageToggle}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-colors duration-200"
          >
            Switch to {router.query.lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>

        {/* Main layout grid. It's a single column on mobile and a 3-column grid on larger screens. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Spans 2 of 3 columns on large screens. */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{courseData.title}</h1>
            
            {/* Renders the HTML description from the API. */}
            {/* The `prose` class from Tailwind Typography provides beautiful default styling for HTML content. */}
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: courseData.description }}
            />
            
            {/* Conditionally render the Instructors component only if instructor data exists. */}
            {instructorsData && <Instructors instructors={instructorsData} />}
            
            {/* TODO: You can add more components here for 'features', 'pointers', 'about' etc. */}
            {/* Example: const featuresData = findSectionData(courseData.sections, 'features'); */}
            {/* {featuresData && <FeaturesComponent features={featuresData} />} */}
          </div>

          {/* Right Column: Spans 1 of 3 columns. `lg:sticky` makes it "stick" to the top on scroll for large screens. */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            
            {/* Conditionally render the Trailer if a URL is available. */}
            {trailerUrl && <Trailer videoUrl={trailerUrl} />}
            
            <CTA ctaText={courseData.cta_text.single} price={1000} />
            
            {/* Conditionally render the Checklist if checklist data exists. */}
            {courseData.checklist && courseData.checklist.length > 0 && <Checklist items={courseData.checklist} />}
          </div>
        </div>
      </main>
    </>
  );
}

// This function runs ON THE SERVER for every single request to this page.
// It's the core of Server-Side Rendering (SSR).
export const getServerSideProps: GetServerSideProps<{
  courseData: CourseData | null;
}> = async (context) => {
  // Get the 'lang' query parameter from the URL (e.g., /?lang=bn). Default to 'en' if not present.
  const lang = context.query.lang || 'en';

  const API_URL = `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`;
  console.log(`Fetching data from: ${API_URL}`); // Helpful for debugging in the server console.

  try {
    const res = await fetch(API_URL, {
      headers: {
        'X-TENMS-SOURCE-PLATFORM': 'web',
        'Accept': 'application/json',
      },
    });

    // If the API response is not OK (e.g., 404, 500), return null for the data.
    // The component on the client-side will then handle this case.
    if (!res.ok) {
      console.error('Failed to fetch API:', res.status, res.statusText);
      return { props: { courseData: null } };
    }

    const jsonResponse = await res.json();
    
    // The actual course information is nested inside a `data` property in the API response.
    const courseData = jsonResponse.data;

    // Return the fetched data as props to the Home component.
    return { props: { courseData } };

  } catch (error) {
    console.error('An error occurred while fetching course data:', error);
    // In case of a network error or other exception, also return null.
    return { props: { courseData: null } };
  }
};