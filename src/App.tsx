import { useState } from 'react';
import { Menu, X, Search, Download, Home, BookOpen, TrendingUp, BarChart3, GitCompare, Sparkles, FileText ,Play} from 'lucide-react';
import HomePage from './pages/HomePage';
import Introduction from './pages/Introduction';
import Fundamentals from './pages/Fundamentals';
import ClassicalIndexing from './pages/ClassicalIndexing';
import ModernIndexing from './pages/ModernIndexing';
import PerformanceEvaluation from './pages/PerformanceEvaluation';
import ComparativeAnalysis from './pages/ComparativeAnalysis';
import FutureDirections from './pages/FutureDirections';
import Conclusion from './pages/Conclusion';
import References from './pages/References';
import IndexingVisualiser from './pages/IndexingVisualiser';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'Visualiser', name: 'Indexing Visualiser', icon: Play },
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'fundamentals', name: 'Fundamentals', icon: BookOpen },
    { id: 'classical', name: 'Classical Indexing', icon: FileText },
    { id: 'modern', name: 'Modern Indexing', icon: Sparkles },
    { id: 'performance', name: 'Performance Evaluation', icon: TrendingUp },
    { id: 'comparative', name: 'Comparative Analysis', icon: GitCompare },
    { id: 'future', name: 'Future Directions', icon: BarChart3 },
    { id: 'conclusion', name: 'Conclusion', icon: FileText },
    { id: 'references', name: 'References', icon: BookOpen },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'Visualiser':
        return <IndexingVisualiser/>;
      case 'introduction':
        return <Introduction />;
      case 'fundamentals':
        return <Fundamentals />;
      case 'classical':
        return <ClassicalIndexing />;
      case 'modern':
        return <ModernIndexing />;
      case 'performance':
        return <PerformanceEvaluation />;
      case 'comparative':
        return <ComparativeAnalysis />;
      case 'future':
        return <FutureDirections />;
      case 'conclusion':
        return <Conclusion />;
      case 'references':
        return <References />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const handleDownload = () => {
    alert('PDF export functionality would be implemented here using a library like jsPDF or html2pdf');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">DB Indexing Research</h1>
            </div>

            {/* <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div> */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-none bg-transparent focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                        currentPage === item.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* <button
                onClick={handleDownload}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button> */}
            </div>
          </aside>

          <main className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm w-full overflow-x-scroll">
            {renderPage()}
          </main>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Database Indexing Techniques and Their Evaluation
            </h3>
            <p className="text-gray-600 mb-1">SHASHANK KUMAR and AMIT BARKHANE</p>
            <p className="text-gray-500 text-sm">© 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
