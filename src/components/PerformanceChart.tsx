import { IndexPerformance } from '../utils/indexing';

interface PerformanceChartProps {
  performances: IndexPerformance[];
}

export function PerformanceChart({ performances }: PerformanceChartProps) {
  if (performances.length === 0) {
    return null;
  }

  const maxTime = Math.max(...performances.map(p => p.constructionTime));
  const maxMemory = Math.max(...performances.map(p => p.memoryUsage));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Performance Comparison</h3>

      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Construction Time (ms)</h4>
          <div className="space-y-2">
            {performances.map((perf, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-600">{perf.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{
                      width: `${(perf.constructionTime / maxTime) * 100}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  >
                    <span className="text-xs text-white font-semibold">
                      {perf.constructionTime.toFixed(3)} ms
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Memory Usage (bytes)</h4>
          <div className="space-y-2">
            {performances.map((perf, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-600">{perf.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{
                      width: `${(perf.memoryUsage / maxMemory) * 100}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  >
                    <span className="text-xs text-white font-semibold">
                      {perf.memoryUsage} bytes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Fastest:</span>
            <span className="ml-2 font-semibold text-gray-800">
              {performances.reduce((min, p) =>
                p.constructionTime < min.constructionTime ? p : min
              ).name}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Most efficient:</span>
            <span className="ml-2 font-semibold text-gray-800">
              {performances.reduce((min, p) =>
                p.memoryUsage < min.memoryUsage ? p : min
              ).name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
