import { useState, useEffect, useRef } from 'react';
import Trailer from '@/components/Trailer';
import CTA from '@/components/CTA';
import Checklist from '@/components/Checklist';
import { Media, ChecklistItem } from '@/types/course';

interface DesktopSidebarProps {
    mediaItems: Media[];
    ctaText: string;
    checklistTitle: string;
    checklist: ChecklistItem[];
}

export default function DesktopSidebar({ mediaItems, ctaText, checklistTitle, checklist }: DesktopSidebarProps) {
    const [isSidebarCompact, setIsSidebarCompact] = useState(false);
    const stickyWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) {
                setIsSidebarCompact(false);
                return;
            }
            if (stickyWrapperRef.current) {
                const stickyOffset = 96;
                const elementTop = stickyWrapperRef.current.getBoundingClientRect().top;
                setIsSidebarCompact(elementTop <= stickyOffset);
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

    return (
        <div className="hidden md:block md:col-span-2">
            <div ref={stickyWrapperRef} className={`md:sticky md:top-24 h-fit transition-all duration-300 ${isSidebarCompact ? 'md:mt-0' : 'md:-mt-72'}`}>
                <div className="border border-gray-200 overflow-hidden bg-gray-50">
                    {!isSidebarCompact && <Trailer mediaItems={mediaItems} />}
                    <CTA ctaText={ctaText} />
                    {checklist?.length > 0 && (
                        <Checklist title={checklistTitle} items={checklist} />
                    )}
                </div>
            </div>
        </div>
    );
}