// FILE: src/components/Instructor.tsx

import { Instructor } from '@/types/course';
import Image from 'next/image';

interface InstructorsProps {
  instructors: Instructor[];
}

export default function Instructors({ instructors }: InstructorsProps) {
  return (
    // The wrapper div with padding and background is already in the page,
    // so we can remove it here to avoid double-padding.
    // Or we can keep it and remove it from the page. Let's keep it self-contained.
    <div className="space-y-6"> 
      {instructors.map((instructor) => (
        <div key={instructor.name} className="flex items-start space-x-4">
          <Image
            src={instructor.image}
            alt={instructor.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-xl">{instructor.name}</h3>
            {/* ADD THIS LINE to render the description */}
            <div className="text-gray-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: instructor.description }} />
          </div>
        </div>
      ))}
    </div>
  );
}