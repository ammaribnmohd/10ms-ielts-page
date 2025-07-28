import SectionNav from '@/components/SectionNav';
import type { Section, Translations } from '@/types/course';

// Import the section components needed for DynamicSection
import Instructors from '@/components/Instructor';
import Features from '@/components/Features';
import Pointers from '@/components/Pointers';
import About from '@/components/About';
import FeatureExplanations from '@/components/FeatureExplanations';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import GroupJoinEngagement from '@/components/GroupJoinEngagement';
import FreeItems from '@/components/FreeItems';

interface MainContentProps {
    navItems: { name: string; id: string; }[];
    sections: Section[];
    lang: 'en' | 'bn';
    translations: Translations;
}

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

    const useWrapper = !['about', 'faq', 'group_join_engagement', 'free_items', 'instructor', 'features', 'feature_explanations', 'testimonials'].includes(section.type);

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


export default function MainContent({ navItems, sections, lang, translations }: MainContentProps) {
    return (
        <div className="md:col-span-3">
            <div className="hidden md:contents">
                <SectionNav items={navItems} />
                <div className="h-8" />
            </div>
            <div>
                {sections.map((section, index) => (
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
    );
}