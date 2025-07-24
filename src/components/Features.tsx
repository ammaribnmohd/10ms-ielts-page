// Assuming the data is an array of objects with 'icon' and 'text' properties.
// You would need to inspect the API response for the actual structure.
interface Feature {
  icon: string;
  text: string;
}

interface FeaturesProps {
  title: string;
  features: Feature[];
}

export default function Features({ title, features }: FeaturesProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {/* You might use an img tag or a more complex icon component here */}
            <span className="mr-3 text-xl">{feature.icon}</span> 
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}