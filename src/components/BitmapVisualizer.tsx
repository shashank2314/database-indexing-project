interface BitmapVisualizerProps {
  bitmap: number[];
}

export function BitmapVisualizer({ bitmap }: BitmapVisualizerProps) {
  const maxDisplay = 50;
  const displayBitmap = bitmap.slice(0, maxDisplay);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Bitmap Index</h3>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-1">
          {displayBitmap.map((bit, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-12 h-16 rounded ${
                bit === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <span className="text-xs">{index}</span>
              <span className="font-bold text-lg">{bit}</span>
            </div>
          ))}
        </div>
        {bitmap.length > maxDisplay && (
          <p className="text-sm text-gray-500 mt-2">
            Showing first {maxDisplay} of {bitmap.length} bits
          </p>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Total bits: {bitmap.length}</p>
        <p className="mt-1">
          Active bits: {bitmap.filter(b => b === 1).length} (
          {((bitmap.filter(b => b === 1).length / bitmap.length) * 100).toFixed(1)}%)
        </p>
      </div>
    </div>
  );
}
