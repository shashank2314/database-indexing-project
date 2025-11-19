import { Terminal } from 'lucide-react';

interface ResultDisplayProps {
  output: string;
}

export default function ResultDisplay({ output }: ResultDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="bg-slate-700 px-6 py-4 flex items-center gap-2">
        <Terminal className="w-5 h-5 text-white" />
        <h3 className="text-white font-semibold">Tree Output</h3>
      </div>
      <div className="p-6 bg-slate-900 max-h-96 overflow-y-auto">
        <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );
}
