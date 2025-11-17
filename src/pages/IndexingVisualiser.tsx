import { Database } from 'lucide-react';
import { InteractiveVisualizer } from '../components/InteractiveVisualizer';
import { TheorySection } from '../components/TheorySection';


function IndexingVisualiser() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Database className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Database Indexing Visualizer
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Explore classical and modern indexing techniques with interactive visualizations
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <InteractiveVisualizer />
          </section>

          <section>
            <TheorySection />
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Educational tool for understanding database indexing techniques and performance characteristics
          </p>
        </div>
      </footer>
    </div>
  );
}

export default IndexingVisualiser;
