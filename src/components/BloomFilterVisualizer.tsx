interface BloomFilterVisualizerProps {
  bits: boolean[];
}

export function BloomFilterVisualizer({ bits }: BloomFilterVisualizerProps) {
  const maxDisplay = 100;
  const displayBits = bits.slice(0, maxDisplay);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Bloom Filter</h3>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-1">
          {displayBits.map((bit, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs ${
                bit ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}
              title={`Bit ${index}: ${bit ? '1' : '0'}`}
            >
              {bit ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Filter size: {bits.length} bits</p>
        <p className="mt-1">
          Set bits: {bits.filter(b => b).length} (
          {((bits.filter(b => b).length / bits.length) * 100).toFixed(1)}%)
        </p>
        <p className="mt-1 text-xs italic">Approximate membership testing with false positive rate</p>
      </div>
    </div>
  );
}
