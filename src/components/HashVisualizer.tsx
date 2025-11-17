interface HashVisualizerProps {
  index: Map<number, number>;
}

export function HashVisualizer({ index }: HashVisualizerProps) {
  const entries = Array.from(index.entries());

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Hash Index Mapping</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {entries.map(([hashKey, value], index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded"
            >
              <div className="flex flex-col">
                <span className="text-xs opacity-80">Hash: {hashKey}</span>
                <span className="font-semibold text-lg">{value}</span>
              </div>
              <div className="text-xs opacity-70">
                Bucket
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Total buckets used: {entries.length}</p>
        <p className="mt-1">Hash function: key % 100</p>
      </div>
    </div>
  );
}
