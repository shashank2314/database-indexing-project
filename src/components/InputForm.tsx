import { useState } from 'react';
import { Play, Eye } from 'lucide-react';
import { buildIndex } from '../utils/indexBuilder';

interface InputFormProps {
  indexType: 'btree' | 'bplus' | 'bitmap' | 'hash';
  onExecute: (output: string) => void;
}

export default function InputForm({ indexType, onExecute }: InputFormProps) {
  const [columns, setColumns] = useState('3');
  const [types, setTypes] = useState('int string int');
  const [rows, setRows] = useState('3');
  const [data, setData] = useState('1 Alice 100\n2 Bob 200\n3 Charlie 150');
  const [indexColumn, setIndexColumn] = useState('1');
  const [order, setOrder] = useState('2');
  const [buckets, setBuckets] = useState('4');
  const [hashFunc, setHashFunc] = useState('1');
  const [showFormat, setShowFormat] = useState(false);

  const handleExecute = () => {
    const output = buildIndex(
      indexType,
      parseInt(columns),
      types.split(' '),
      parseInt(rows),
      data,
      parseInt(indexColumn),
      parseInt(order),
      parseInt(buckets),
      parseInt(hashFunc)
    );
    onExecute(output);
  };

  const titleMap = {
    btree: 'B-Tree Parameters',
    bplus: 'B+ Tree Parameters',
    bitmap: 'Bitmap Index Parameters',
    hash: 'Hash Index Parameters',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">{titleMap[indexType]}</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of Columns
          </label>
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Column Types (space-separated)
          </label>
          <input
            type="text"
            value={types}
            onChange={(e) => setTypes(e.target.value)}
            placeholder="int string int"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of Rows
          </label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Index Column (0-based)
          </label>
          <input
            type="number"
            value={indexColumn}
            onChange={(e) => setIndexColumn(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            min="0"
          />
        </div>

        {(indexType === 'btree' || indexType === 'bplus') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tree Order (minimum degree t ≥ 2)
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
              min="2"
            />
          </div>
        )}

        {indexType === 'hash' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Buckets
              </label>
              <input
                type="number"
                value={buckets}
                onChange={(e) => setBuckets(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hash Function
              </label>
              <select
                value={hashFunc}
                onChange={(e) => setHashFunc(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
              >
                <option value="1">Mod Hash</option>
                <option value="2">Polynomial Rolling Hash</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Data Rows (one row per line, space-separated values)
        </label>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowFormat(!showFormat)}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Eye className="w-5 h-5" />
          {showFormat ? 'Hide' : 'Show'} Result Format
        </button>

        <button
          onClick={handleExecute}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
        >
          <Play className="w-5 h-5" />
          Execute & Build Index
        </button>
      </div>

      {showFormat && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Expected Output Format:</h4>
          <pre className="text-xs text-slate-600 font-mono leading-relaxed">
{indexType === 'btree' ? `===== B-TREE NODES =====
Total nodes: N

NodeID=X | leaf=true/false | keys=N
  Key: [value] | Row: [col1] [col2] ...
  Key: [value] | Row: [col1] [col2] ...
----------------------` : indexType === 'bplus' ? `========== B+ TREE NODES ==========
NodeID=X | leaf=true/false
 Keys: [val1] [val2] ...
   ([val]) -> Row: [col1] [col2] ...
 NEXT LEAF -> NodeID=Y
----------------------------------------` : indexType === 'bitmap' ? `===== BITMAP INDEX =====
Rows: N
Key: [value]
Bitmap: 10101...
Rows: 0, 2, 4, ...
-------------------------` : `===== HASH INDEX =====
Hash Function: [Method]
Total Buckets: N

Bucket[0] Key: [value]
Rows: 0 1 3 ...
-----------------------`}
          </pre>
        </div>
      )}
    </div>
  );
}
