import { ChevronRight, Database, Cpu, BarChart3, GitCompare, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const quickLinks = [
    { id: 'fundamentals', name: 'Fundamentals', icon: Database, color: 'blue' },
    { id: 'modern', name: 'Modern Indexing', icon: Cpu, color: 'green' },
    { id: 'performance', name: 'Performance Evaluation', icon: BarChart3, color: 'orange' },
    { id: 'comparative', name: 'Comparative Analysis', icon: GitCompare, color: 'purple' },
    { id: 'future', name: 'Future Trends', icon: Sparkles, color: 'pink' },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Database Indexing Techniques and Their Evaluation
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            This project explores classical and modern database indexing methods — from B+ Trees and Hash Indexes
            to hardware-aware and approximate structures — and evaluates their performance across various storage
            technologies such as SSD, NVM, and main memory.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Research Overview</h2>
          <p className="text-blue-800 leading-relaxed">
            In the era of rapidly evolving storage technologies, database indexing techniques must adapt to leverage
            the unique characteristics of modern hardware. This comprehensive research examines how traditional
            indexing structures perform alongside cutting-edge approaches designed specifically for SSDs,
            non-volatile memory, and in-memory databases.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const colorClasses = {
                blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700',
                green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700',
                orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
                purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
                pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700',
              };

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`${colorClasses[link.color as keyof typeof colorClasses]} p-6 rounded-lg border transition-colors text-left flex items-center justify-between group`}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="w-8 h-8" />
                    <span className="font-semibold text-lg">{link.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Objectives</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Study classical and modern indexing techniques across different storage paradigms</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Evaluate performance using comprehensive metrics including latency, throughput, and scalability</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Analyze trade-offs between speed, storage efficiency, and data persistence</p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Provide recommendations for optimal indexing strategies in various application scenarios</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
