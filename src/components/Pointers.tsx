import { PointerItem } from "@/types/course";

const CheckIcon = () => (
    <svg className="h-6 w-6 text-blue-500 flex-shrink-0 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

interface PointersProps {
    pointers: PointerItem[];
}

export default function Pointers({ pointers }: PointersProps) {
  return (
    <div className=" border-gray-200 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {pointers.map((pointer, index) => (
            <div key={index} className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700">{pointer.text}</span>
            </div>
        ))}
    </div>
  )
}