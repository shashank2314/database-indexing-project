import { useState } from 'react';
import { Code, Play, FileCode } from 'lucide-react';
import TreeSelector from '../components/TreeSelector';
import CodeDisplay from '../components/CodeDisplay';
import InputForm from '../components/InputForm';
import ResultDisplay from '../components/ResultDisplay';

type IndexType = 'btree' | 'bplus' | 'bitmap' | 'hash' | null;

function CodeVisualiser() {
  const [selectedIndex, setSelectedIndex] = useState<IndexType>(null);
  const [showCode, setShowCode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleIndexSelect = (type: IndexType) => {
    setSelectedIndex(type);
    setShowCode(false);
    setShowInput(false);
    setResult(null);
  };

  const handleShowCode = () => {
    setShowCode(true);
    setShowInput(true);
  };

  const handleExecute = (output: string) => {
    setResult(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-8 h-8 text-slate-700" />
            <h1 className="text-2xl font-semibold text-slate-800">B-Tree Visualizer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!selectedIndex && (
          <TreeSelector onSelect={handleIndexSelect} />
        )}

        {selectedIndex && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleIndexSelect(null)}
                className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                ← Change Index Type
              </button>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-700 text-white text-sm font-medium rounded-full">
                  {selectedIndex === 'btree' ? 'B-Tree' : selectedIndex === 'bplus' ? 'B+ Tree' : selectedIndex === 'bitmap' ? 'Bitmap Index' : 'Hash Index'}
                </span>
              </div>
            </div>

            {!showCode && (
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 text-center">
                <button
                  onClick={handleShowCode}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
                >
                  <Code className="w-5 h-5" />
                  Show C++ Code
                </button>
              </div>
            )}

            {showCode && (
              <>
                <CodeDisplay indexType={selectedIndex} />
                <InputForm indexType={selectedIndex} onExecute={handleExecute} />
                {result && <ResultDisplay output={result} />}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default CodeVisualiser;
