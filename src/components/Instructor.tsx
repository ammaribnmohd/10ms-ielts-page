import { Instructor } from '@/types/course';
import Image from 'next/image';
interface InstructorsProps {
  instructors: Instructor[];
}

export default function Instructors({ instructors }: InstructorsProps) {
  return (
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

            <h3 className="font-semibold text-xl flex items-center mb-1">

              {/* The instructor name */}
              <span>{instructor.name}</span>
              <svg
                width="10"
                height="14"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" ml-1 flex-shrink-0"
              >
                <path d="M1.49994 11C1.36833 11.0008 1.23787 10.9755 1.11603 10.9258C0.994195 10.876 0.883379 10.8027 0.789939 10.71C0.696211 10.617 0.621816 10.5064 0.571048 10.3846C0.520279 10.2627 0.494141 10.132 0.494141 9.99999C0.494141 9.86798 0.520279 9.73727 0.571048 9.61541C0.621816 9.49355 0.696211 9.38295 0.789939 9.28999L4.09994 5.99999L0.919939 2.68999C0.733688 2.50263 0.629147 2.24918 0.629147 1.98499C0.629147 1.7208 0.733688 1.46735 0.919939 1.27999C1.0129 1.18626 1.1235 1.11187 1.24536 1.0611C1.36722 1.01033 1.49793 0.984192 1.62994 0.984192C1.76195 0.984192 1.89266 1.01033 2.01452 1.0611C2.13638 1.11187 2.24698 1.18626 2.33994 1.27999L6.19994 5.27999C6.38317 5.46692 6.4858 5.71824 6.4858 5.97999C6.4858 6.24174 6.38317 6.49306 6.19994 6.67999L2.19994 10.68C2.11018 10.7769 2.00211 10.8551 1.88196 10.91C1.76181 10.965 1.63197 10.9955 1.49994 11Z"
                  fill="#6B7280"
                />
              </svg>
            </h3>

            <div className="text-gray-600 font-semibold prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: instructor.description }} />
          </div>
        </div>
      ))}
    </div>
  );
}