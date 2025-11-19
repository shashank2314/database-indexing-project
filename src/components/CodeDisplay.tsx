import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { BTREE_CODE, BPLUS_CODE, BITMAP_CODE, HASH_CODE } from '../data/treeCodes';

interface CodeDisplayProps {
  indexType: 'btree' | 'bplus' | 'bitmap' | 'hash';
}

export default function CodeDisplay({ indexType }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const codeMap = {
    btree: BTREE_CODE,
    bplus: BPLUS_CODE,
    bitmap: BITMAP_CODE,
    hash: HASH_CODE,
  };

  const titleMap = {
    btree: 'B-Tree',
    bplus: 'B+ Tree',
    bitmap: 'Bitmap Index',
    hash: 'Hash Index',
  };

  const code = codeMap[indexType];
  const title = titleMap[indexType];

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-semibold">
          {title} Implementation
        </h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-6 bg-slate-50 max-h-96 overflow-y-auto">
        <pre className="text-sm text-slate-800 font-mono leading-relaxed whitespace-pre-wrap break-words">
          {code}
        </pre>
      </div>
    </div>
  );
}
