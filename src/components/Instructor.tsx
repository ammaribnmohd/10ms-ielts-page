import { Instructor } from '@/types/course';
import Image from 'next/image';

interface InstructorsProps {
  instructors: Instructor[];
}

export default function Instructors({ instructors }: InstructorsProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Course Instructors</h2>
      <div className="space-y-4">
        {instructors.map((instructor, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{instructor.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}