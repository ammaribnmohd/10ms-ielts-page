import React from 'react';
import CTA from '@/components/CTA';
import Checklist from '@/components/Checklist';
import { ChecklistItem } from '@/types/course';

interface MobileTopCtaBlockProps {
    ctaText: string;
    checklistTitle: string;
    checklist: ChecklistItem[];
}

const MobileTopCtaBlock = React.forwardRef<HTMLDivElement, MobileTopCtaBlockProps>(
    ({ ctaText, checklistTitle, checklist }, ref) => {
        return (
            <div className="md:hidden pb-8">
                <div className="bg-white">
                    <div ref={ref}>
                        <CTA ctaText={ctaText} />
                    </div>
                    {checklist?.length > 0 && (
                        <Checklist title={checklistTitle} items={checklist} />
                    )}
                </div>
            </div>
        );
    }
);

MobileTopCtaBlock.displayName = 'MobileTopCtaBlock';
export default MobileTopCtaBlock;