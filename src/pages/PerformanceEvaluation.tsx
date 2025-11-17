import { Activity, BarChart3, TrendingUp } from 'lucide-react';

export default function PerformanceEvaluation() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">5. Performance Evaluation Framework</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          A rigorous performance evaluation framework is essential for objectively comparing indexing techniques
          across different dimensions. This section outlines the experimental setup, metrics, and visualization
          approaches used to assess index performance.
        </p>

        <div className="space-y-12">
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-gray-900">5.1 Experimental Setup</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Comprehensive performance evaluation requires carefully controlled experiments that isolate the
                impact of different factors on index performance.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Hardware Environments</h3>
                <p className="text-gray-800 mb-4">
                  Testing across diverse hardware platforms reveals how different index structures leverage
                  specific hardware characteristics:
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">DRAM Configuration</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• CPU: Intel Xeon or AMD EPYC (16-64 cores)</li>
                      <li>• Memory: 64-512 GB DDR4/DDR5</li>
                      <li>• Cache: 16-64 MB L3 cache</li>
                      <li>• Purpose: In-memory index evaluation</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">SSD Configuration</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Type: NVMe PCIe 4.0/5.0 SSD</li>
                      <li>• Capacity: 1-4 TB</li>
                      <li>• Sequential Read: 5-10 GB/s</li>
                      <li>• Sequential Write: 3-8 GB/s</li>
                      <li>• Random IOPS: 500K-1M</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">NVM Configuration</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Type: Intel Optane DC Persistent Memory</li>
                      <li>• Capacity: 128-512 GB per DIMM</li>
                      <li>• Latency: Read ~300ns, Write ~1μs</li>
                      <li>• Bandwidth: ~40 GB/s per socket</li>
                      <li>• Mode: App Direct (byte-addressable)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dataset Types</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Different data distributions reveal strengths and weaknesses of indexing approaches:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Uniform Distribution</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Keys uniformly distributed across value space.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Random integer keys</li>
                    <li>• UUID/GUID values</li>
                    <li>• Hash values</li>
                    <li>• Tests worst-case behavior</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Skewed Distribution</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Keys follow realistic non-uniform patterns.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Zipfian distribution (α=0.99)</li>
                    <li>• Hotspot patterns (80-20 rule)</li>
                    <li>• Sequential with gaps</li>
                    <li>• Tests real-world scenarios</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Sequential Distribution</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Monotonically increasing keys.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Auto-incrementing IDs</li>
                    <li>• Timestamps</li>
                    <li>• Log sequence numbers</li>
                    <li>• Best-case for many structures</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Real-World Datasets</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Production data for realistic evaluation.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• TPC-H benchmark data</li>
                    <li>• Wikipedia page IDs</li>
                    <li>• Web log timestamps</li>
                    <li>• Captures actual patterns</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tools and Frameworks</h3>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Implementation Languages</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        <strong>C++:</strong> Performance-critical implementations
                        <span className="text-gray-600"> (highest control, optimal performance)</span>
                      </li>
                      <li>
                        <strong>Python:</strong> Prototyping and analysis
                        <span className="text-gray-600"> (rapid development, visualization)</span>
                      </li>
                      <li>
                        <strong>Rust:</strong> Safe systems programming
                        <span className="text-gray-600"> (memory safety, modern tooling)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Database Systems</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        <strong>RocksDB:</strong> LSM-Tree implementation
                      </li>
                      <li>
                        <strong>PostgreSQL:</strong> B+ Tree baseline
                      </li>
                      <li>
                        <strong>Redis:</strong> In-memory hashing
                      </li>
                      <li>
                        <strong>Custom:</strong> Research prototypes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-semibold text-gray-900">5.2 Evaluation Metrics</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Comprehensive metrics capture different aspects of index performance, from latency and throughput
                to space efficiency and scalability.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-6 py-3 text-left font-semibold">Metric</th>
                      <th className="px-6 py-3 text-left font-semibold">Description</th>
                      <th className="px-6 py-3 text-left font-semibold">Measurement</th>
                      <th className="px-6 py-3 text-left font-semibold">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Search Latency</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Time to locate a single record</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Microseconds (μs) or nanoseconds (ns)</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Critical for interactive queries</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Insertion Time</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Time to add a new record</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">μs per insert</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Important for write-heavy workloads</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Update Cost</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Overhead of modifying indexed values</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">μs per update</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Affects dynamic datasets</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Storage Overhead</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Index size relative to data size</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Percentage or bytes/key</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Cost and memory efficiency</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Scalability</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Performance vs. data volume</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Operations at 1M, 10M, 100M, 1B keys</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Long-term viability</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Persistence Cost</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Overhead for durability (NVM)</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Flush/fence count, extra latency</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">NVM-specific concern</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Range Query Performance</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Scan throughput for ranges</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Keys/second or MB/s</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Analytical workloads</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Concurrent Throughput</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Operations/sec with multiple threads</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Million ops/sec (MOPS)</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Multi-user systems</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Write Amplification</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Actual writes / logical writes</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">Ratio (e.g., 10x)</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">SSD endurance and performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-100 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Mixed Workload Metrics</h3>
                <p className="text-gray-800 mb-3">
                  Real applications rarely exhibit pure read or write patterns. Common workload mixes include:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded border border-green-200">
                    <p className="font-semibold text-gray-900 mb-1">OLTP: 50% read, 50% write</p>
                    <p className="text-gray-700">Balanced transactional workload</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-green-200">
                    <p className="font-semibold text-gray-900 mb-1">Read-Heavy: 95% read, 5% write</p>
                    <p className="text-gray-700">Typical web application pattern</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-green-200">
                    <p className="font-semibold text-gray-900 mb-1">Write-Heavy: 20% read, 80% write</p>
                    <p className="text-gray-700">Logging and ingestion scenarios</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-green-200">
                    <p className="font-semibold text-gray-900 mb-1">Scan-Heavy: 70% scan, 30% point</p>
                    <p className="text-gray-700">Analytical query workload</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-semibold text-gray-900">5.3 Visualization</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Effective visualization helps identify performance trends, bottlenecks, and trade-offs across
                different indexing techniques.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Visualization Types</h3>

              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Latency Comparison (Bar Charts)</h4>
                  <div className="bg-white p-4 rounded border border-purple-300 mb-3">
                    <div className="text-center text-gray-500 text-sm mb-2">[Placeholder: Bar Chart]</div>
                    <div className="h-48 bg-gradient-to-t from-purple-100 to-white rounded flex items-end justify-around p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                        <span className="text-xs mt-2">B+ Tree</span>
                        <span className="text-xs text-gray-600">250μs</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-green-500 rounded-t" style={{height: '85%'}}></div>
                        <span className="text-xs mt-2">LSM-Tree</span>
                        <span className="text-xs text-gray-600">350μs</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-orange-500 rounded-t" style={{height: '40%'}}></div>
                        <span className="text-xs mt-2">Hash Index</span>
                        <span className="text-xs text-gray-600">150μs</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-purple-500 rounded-t" style={{height: '30%'}}></div>
                        <span className="text-xs mt-2">Masstree</span>
                        <span className="text-xs text-gray-600">100μs</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Compares average query latency across different index types for fixed dataset size.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Scalability (Line Charts)</h4>
                  <div className="bg-white p-4 rounded border border-blue-300 mb-3">
                    <div className="text-center text-gray-500 text-sm mb-2">[Placeholder: Line Chart - Performance vs Dataset Size]</div>
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-white rounded p-4 relative">
                      <div className="absolute bottom-4 left-4 right-4 top-4">
                        <svg className="w-full h-full">
                          <polyline points="0,140 80,120 160,100 240,85 320,75"
                            fill="none" stroke="#3b82f6" strokeWidth="2"/>
                          <polyline points="0,140 80,130 160,125 240,130 320,140"
                            fill="none" stroke="#10b981" strokeWidth="2"/>
                          <polyline points="0,140 80,100 160,70 240,50 320,35"
                            fill="none" stroke="#f59e0b" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-4 text-xs text-gray-600">1M → 1B keys</div>
                      <div className="absolute top-4 right-4 text-xs space-y-1">
                        <div className="flex items-center"><span className="w-3 h-0.5 bg-blue-500 mr-1"></span>B+ Tree</div>
                        <div className="flex items-center"><span className="w-3 h-0.5 bg-green-500 mr-1"></span>LSM</div>
                        <div className="flex items-center"><span className="w-3 h-0.5 bg-orange-500 mr-1"></span>Learned</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Shows how query performance changes as dataset size grows from millions to billions of keys.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Trade-off Analysis (Scatter Plots)</h4>
                  <div className="bg-white p-4 rounded border border-green-300 mb-3">
                    <div className="text-center text-gray-500 text-sm mb-2">[Placeholder: Scatter Plot - Latency vs Space Overhead]</div>
                    <div className="h-48 bg-gradient-to-br from-green-50 to-white rounded p-4 relative">
                      <div className="absolute bottom-8 left-8 text-xs text-gray-600">← Lower Latency</div>
                      <div className="absolute top-4 left-4 text-xs text-gray-600 -rotate-90 origin-top-left">Space →</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-sm">
                          <div className="absolute" style={{left: '20%', bottom: '70%'}}>
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">Hash</span>
                          </div>
                          <div className="absolute" style={{left: '50%', bottom: '50%'}}>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs">B+</span>
                          </div>
                          <div className="absolute" style={{left: '70%', bottom: '40%'}}>
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-xs">LSM</span>
                          </div>
                          <div className="absolute" style={{left: '30%', bottom: '80%'}}>
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-xs">Bloom</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Visualizes the relationship between multiple metrics, helping identify Pareto-optimal choices.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Throughput Comparison (Grouped Bar Charts)</h4>
                  <div className="bg-white p-4 rounded border border-orange-300 mb-3">
                    <div className="text-center text-gray-500 text-sm mb-2">[Placeholder: Grouped Bar Chart - Read/Write Throughput]</div>
                    <div className="h-48 bg-gradient-to-t from-orange-50 to-white rounded flex items-end justify-around p-4">
                      <div className="flex space-x-1 items-end">
                        <div className="flex flex-col items-center">
                          <div className="w-8 bg-blue-400 rounded-t" style={{height: '80%'}}></div>
                          <div className="w-8 bg-blue-600 rounded-t mt-1" style={{height: '60%'}}></div>
                        </div>
                        <span className="text-xs ml-1">B+</span>
                      </div>
                      <div className="flex space-x-1 items-end">
                        <div className="flex flex-col items-center">
                          <div className="w-8 bg-green-400 rounded-t" style={{height: '70%'}}></div>
                          <div className="w-8 bg-green-600 rounded-t mt-1" style={{height: '90%'}}></div>
                        </div>
                        <span className="text-xs ml-1">LSM</span>
                      </div>
                      <div className="flex space-x-1 items-end">
                        <div className="flex flex-col items-center">
                          <div className="w-8 bg-orange-400 rounded-t" style={{height: '95%'}}></div>
                          <div className="w-8 bg-orange-600 rounded-t mt-1" style={{height: '50%'}}></div>
                        </div>
                        <span className="text-xs ml-1">Hash</span>
                      </div>
                    </div>
                    <div className="flex justify-center mt-2 space-x-4 text-xs">
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-400 mr-1"></span>Read
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-600 mr-1"></span>Write
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Compares read and write throughput side-by-side for mixed workload analysis.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-100 p-6 rounded-lg border border-purple-200 mt-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Tools for Visualization</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span><strong>Python:</strong> matplotlib, seaborn, plotly for publication-quality charts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span><strong>R:</strong> ggplot2 for statistical visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span><strong>Gnuplot:</strong> Scriptable plotting for automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span><strong>Tableau/PowerBI:</strong> Interactive dashboards for exploratory analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
