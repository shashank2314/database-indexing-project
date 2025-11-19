import { GitBranch, Network, Grid3x3, Hash } from 'lucide-react';

interface TreeSelectorProps {
  onSelect: (type: 'btree' | 'bplus' | 'bitmap' | 'hash') => void;
}

export default function TreeSelector({ onSelect }: TreeSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Choose Your Indexing Structure
        </h2>
        <p className="text-slate-600">
          Select an indexing strategy: B-Trees, Bitmap, or Hash-based implementations
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onSelect('btree')}
          className="group bg-white rounded-xl shadow-md border-2 border-slate-200 p-6 hover:border-slate-400 hover:shadow-xl transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <GitBranch className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">B-Tree</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Balanced tree with data in all nodes
            </p>
            <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
              Select →
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('bplus')}
          className="group bg-white rounded-xl shadow-md border-2 border-slate-200 p-6 hover:border-slate-400 hover:shadow-xl transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <Network className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">B+ Tree</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Data only in leaf nodes
            </p>
            <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
              Select →
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('bitmap')}
          className="group bg-white rounded-xl shadow-md border-2 border-slate-200 p-6 hover:border-slate-400 hover:shadow-xl transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <Grid3x3 className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Bitmap Index</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bit vectors for distinct values
            </p>
            <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
              Select →
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect('hash')}
          className="group bg-white rounded-xl shadow-md border-2 border-slate-200 p-6 hover:border-slate-400 hover:shadow-xl transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <Hash className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Hash Index</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hash table based indexing
            </p>
            <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
              Select →
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
