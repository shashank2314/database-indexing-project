import { useState } from 'react';
import {
  BPlusTree,
  BTree,
  HashIndex,
  BitmapIndex,
  BloomFilter,
  IndexPerformance,
  measurePerformance,
  parseInput,
} from '../utils/indexing';
import { BTreeVisualizer } from './BTreeVisualizer';
import { HashVisualizer } from './HashVisualizer';
import { BitmapVisualizer } from './BitmapVisualizer';
import { BloomFilterVisualizer } from './BloomFilterVisualizer';
import { PerformanceChart } from './PerformanceChart';
import { Play, Trash2 } from 'lucide-react';
import { BVisualizer } from './BVisualiser';

export function InteractiveVisualizer() {
  const [input, setInput] = useState('[10, 5, 8, 2, 15, 20, 3, 12, 18, 7]');
  const [bTreeData, setBTreeData] = useState<number[]>([]);
  const [bData, setBData] = useState<number[]>([]);
  const [hashIndex, setHashIndex] = useState<Map<number, number>>(new Map());
  const [bitmap, setBitmap] = useState<number[]>([]);
  const [bloomBits, setBloomBits] = useState<boolean[]>([]);
  const [performances, setPerformances] = useState<IndexPerformance[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    const values = parseInput(input);

    if (values.length === 0) {
      alert('Please enter valid numbers (e.g., [10, 5, 8, 2, 15])');
      return;
    }

    const perfs: IndexPerformance[] = [];

    /* ----------------- B+ Tree ----------------- */
    const bTree = new BPlusTree();
    const bTreePerf = measurePerformance('B+ Tree', () => {
      values.forEach(v => bTree.insert(v));
    }, bTree.getMemoryUsage());
    setBTreeData(bTree.getData());
    perfs.push(bTreePerf);

    /* ----------------- B Tree ----------------- */
    const bsimpleTree = new BTree();
    const bSimplePerf = measurePerformance('B Tree', () => {
      values.forEach(v => bsimpleTree.insert(v));
    }, bsimpleTree.getMemoryUsage());
    setBData(bsimpleTree.getAllKeys()); // ✅ use proper BTree API
    perfs.push(bSimplePerf);

    /* ----------------- Hash Index ----------------- */
    const hash = new HashIndex();
    const hashPerf = measurePerformance('Hash Index', () => {
      values.forEach(v => hash.insert(v));
    }, hash.getMemoryUsage());
    setHashIndex(hash.getIndex());
    perfs.push(hashPerf);

    /* ----------------- Bitmap Index ----------------- */
    const bitmapIdx = new BitmapIndex();
    const bitmapPerf = measurePerformance('Bitmap', () => {
      bitmapIdx.insert(values);
    }, bitmapIdx.getMemoryUsage());
    setBitmap(bitmapIdx.getBitmap());
    perfs.push(bitmapPerf);

    /* ----------------- Bloom Filter ----------------- */
    const bloom = new BloomFilter(100);
    const bloomPerf = measurePerformance('Bloom Filter', () => {
      values.forEach(v => bloom.add(v));
    }, bloom.getMemoryUsage());
    setBloomBits(bloom.getBits());
    perfs.push(bloomPerf);

    /* ----------------- Finalize ----------------- */
    setPerformances(perfs);
    setIsGenerated(true);
  };

  const handleClear = () => {
    setInput('[10, 5, 8, 2, 15, 20, 3, 12, 18, 7]');
    setBTreeData([]);
    setBData([]);
    setHashIndex(new Map());
    setBitmap([]);
    setBloomBits([]);
    setPerformances([]);
    setIsGenerated(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Interactive Indexing Visualizer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter an array of numbers to visualize how different indexing techniques organize and
          store your data.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Array
            </label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="[10, 5, 8, 2, 15]"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Format: [number1, number2, number3, ...]
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Play size={18} />
              Generate Index Visualizations
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Trash2 size={18} />
              Clear Data
            </button>
          </div>
        </div>
      </div>

      {isGenerated && (
        <>
          <div className="flex flex-col items-center gap-2 w-full">
            {/* ✅ Visuals for each index */}
            <BTreeVisualizer data={bTreeData} />
            <BVisualizer data={bData} /> {/* standard B Tree */}
            <HashVisualizer index={hashIndex} />
            <BitmapVisualizer bitmap={bitmap} />
            <BloomFilterVisualizer bits={bloomBits} />
          </div>

          <PerformanceChart performances={performances} />
        </>
      )}
    </div>
  );
}
