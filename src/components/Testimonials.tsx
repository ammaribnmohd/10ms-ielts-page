// FILE: src/components/Testimonials.tsx
import { TestimonialItem } from "@/types/course";
import Image from "next/image";

interface TestimonialsProps {
  items: TestimonialItem[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center mb-4">
                <Image src={item.profile_image} alt={item.name} width={48} height={48} className="rounded-full mr-4" />
                <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
            </div>
          <p className="text-gray-600 italic">{item.testimonial}&quot;</p>
        </div>
      ))}
    </div>
  )
}