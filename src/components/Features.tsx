
import { FeatureItem } from "@/types/course";
import Image from "next/image";

interface FeaturesProps {
  features: FeatureItem[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <div className="mb-16 grid grid-cols-1 gap-4 rounded-md border bg-[#271124] p-6 md:grid-cols-2 md:gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="flex items-start space-x-4">
          <Image 
            src={feature.icon} 
            alt="" 
            width={40} 
            height={40} 
            className="mt-1 flex-shrink-0" 
          />
          <div>
            <h3 className="text-[18px] font-[500px] leading-[26px] text-white ">{feature.title}</h3>
            <p className="text-[14px] font-[400px] leading-[22px] text-[#9CA3AF]">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}