// FILE: src/components/Features.tsx

// 1. Import the correct type from your central types file.
import { FeatureItem } from "@/types/course";
import Image from "next/image";

// 2. Update the props interface to expect an array of FeatureItem.
//    We no longer need a separate 'title' prop as the parent component handles that.
interface FeaturesProps {
  features: FeatureItem[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    // This layout will present the features in a clean grid.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature) => (
        <div key={feature.title} className="flex items-start space-x-4">
          <Image 
            src={feature.icon} 
            alt="" // Decorative image, alt text is not required
            width={40} 
            height={40} 
            className="mt-1 flex-shrink-0" 
          />
          <div>
            {/* 3. Use the correct properties from the FeatureItem type: .title and .subtitle */}
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-gray-600">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}