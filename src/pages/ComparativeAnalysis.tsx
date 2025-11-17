export default function ComparativeAnalysis() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">6. Comparative Analysis</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          This comprehensive comparison synthesizes the strengths, weaknesses, and optimal use cases for different
          indexing techniques across various hardware platforms and workload patterns.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Comprehensive Comparison Table</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                    <th className="px-4 py-3 text-left font-semibold">Examples</th>
                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                    <th className="px-4 py-3 text-left font-semibold">Limitations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-4 font-medium text-gray-900">In-Memory Tree</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      CSB+-Tree, Masstree, T-Tree
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Ultra-low latency applications, real-time systems, in-memory databases with DRAM-sized datasets
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Volatile (data lost on crash), limited by DRAM capacity, expensive for large datasets
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-4 font-medium text-gray-900">SSD Tree</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      FD-Tree, LSM-Tree, B+ Tree (SSD)
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Write-heavy workloads, sequential I/O patterns, large persistent datasets on flash storage
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Write amplification in LSM, compaction overhead, read amplification for multi-level structures
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-4 font-medium text-gray-900">NVM Tree</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      NV-Tree, FPTree, wB+-Tree
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Persistent memory systems, fast recovery requirements, byte-addressable storage
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Write endurance concerns, persistence overhead (flushes/fences), hardware availability
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-4 font-medium text-gray-900">In-Memory Hash</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Cuckoo Hash, Hopscotch Hash
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Fast point queries, key-value stores, lookups with exact match requirements
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      No range query support, poor ORDER BY performance, collision handling overhead
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="px-4 py-4 font-medium text-gray-900">SSD Hash</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      SILT, Flash-aware Hash
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Flash-based key-value stores, write-once read-many workloads, large hash tables
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Complex update mechanisms, reorganization costs, limited range query capability
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="px-4 py-4 font-medium text-gray-900">NVM Hash</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Level Hashing, PathHash
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Persistent key-value indexing, crash-consistent hash tables, byte-addressable NVM
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Write consistency overhead, persistence guarantees cost, limited scalability
                    </td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="px-4 py-4 font-medium text-gray-900">Bitmap</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Roaring Bitmap, WAH Compression
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Low-cardinality data, OLAP queries, data warehouses, analytical workloads
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      High space use for high-cardinality, expensive updates, locking issues for OLTP
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50">
                    <td className="px-4 py-4 font-medium text-gray-900">Approximate</td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Bloom Filter, ALEX, PGM-Index
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Fast approximate queries, space-constrained systems, learned index for sorted data
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-sm">
                      Some inaccuracy (false positives), limited to specific data distributions, model retraining
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Trade-off Analysis</h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Read Performance vs. Write Performance</h3>
                <p className="text-gray-800 mb-4">
                  The fundamental tension between optimizing for reads versus writes:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Read-Optimized</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>B+ Trees:</strong> Direct lookup, good cache locality</li>
                      <li>• <strong>Hash Indexes:</strong> O(1) point queries</li>
                      <li>• <strong>In-Memory Structures:</strong> No I/O overhead</li>
                      <li>• <strong>Cost:</strong> Higher write overhead from updates</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Write-Optimized</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>LSM-Trees:</strong> Sequential writes, batching</li>
                      <li>• <strong>Log-Structured:</strong> Append-only patterns</li>
                      <li>• <strong>Buffer Trees:</strong> Delayed propagation</li>
                      <li>• <strong>Cost:</strong> Read amplification, compaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Space Efficiency vs. Query Speed</h3>
                <p className="text-gray-800 mb-4">
                  Compact representations often require more computation:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Space-Efficient</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Compressed Bitmaps:</strong> 10-100x compression</li>
                      <li>• <strong>Learned Indexes:</strong> Model parameters vs data</li>
                      <li>• <strong>Bloom Filters:</strong> Few bits per element</li>
                      <li>• <strong>Cost:</strong> Decompression/computation time</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Speed-Optimized</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Dense Indexes:</strong> Direct access paths</li>
                      <li>• <strong>Cache-Aligned Structures:</strong> Padding for alignment</li>
                      <li>• <strong>Materialized Views:</strong> Precomputed results</li>
                      <li>• <strong>Cost:</strong> Higher memory footprint</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Persistence vs. Performance</h3>
                <p className="text-gray-800 mb-4">
                  Durability guarantees add overhead to operations:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-orange-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Volatile (Fast)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Pure DRAM:</strong> Nanosecond operations</li>
                      <li>• <strong>No Flush/Fence:</strong> No persistence overhead</li>
                      <li>• <strong>Lock-Free Designs:</strong> High concurrency</li>
                      <li>• <strong>Cost:</strong> Data lost on crashes</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border border-orange-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Persistent (Durable)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>NVM Indexes:</strong> Crash consistency</li>
                      <li>• <strong>WAL + Flush:</strong> Recovery guarantees</li>
                      <li>• <strong>Sync I/O:</strong> fsync after writes</li>
                      <li>• <strong>Cost:</strong> 2-10x latency increase</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Point Queries vs. Range Queries</h3>
                <p className="text-gray-800 mb-4">
                  Different access patterns favor different structures:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Point Query Optimized</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Hash Indexes:</strong> O(1) lookups</li>
                      <li>• <strong>Bloom Filters:</strong> Fast membership tests</li>
                      <li>• <strong>Perfect Hashing:</strong> No collisions</li>
                      <li>• <strong>Limitation:</strong> Cannot scan ranges</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Range Query Optimized</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>B+ Trees:</strong> Sequential leaf scan</li>
                      <li>• <strong>Sorted Arrays:</strong> Binary search + scan</li>
                      <li>• <strong>Skip Lists:</strong> Multi-level traversal</li>
                      <li>• <strong>Cost:</strong> Slightly slower point queries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Workload-Specific Recommendations</h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">OLTP (Online Transaction Processing)</h3>
                <p className="text-gray-800 mb-3"><strong>Characteristics:</strong> High concurrency, short transactions, point queries and updates</p>
                <div className="bg-white p-4 rounded border border-blue-300">
                  <p className="font-semibold text-gray-900 mb-2">Recommended Indexes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary:</strong> B+ Tree for balanced read/write performance</li>
                    <li>• <strong>Hot Keys:</strong> In-memory hash indexes for frequently accessed data</li>
                    <li>• <strong>Persistence:</strong> WAL-based recovery with periodic checkpoints</li>
                    <li>• <strong>Concurrency:</strong> MVCC or fine-grained locking</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3"><strong>Examples:</strong> Banking systems, e-commerce transactions, user authentication</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-3">OLAP (Online Analytical Processing)</h3>
                <p className="text-gray-800 mb-3"><strong>Characteristics:</strong> Complex queries, range scans, aggregations, read-heavy</p>
                <div className="bg-white p-4 rounded border border-green-300">
                  <p className="font-semibold text-gray-900 mb-2">Recommended Indexes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary:</strong> Columnar storage with bitmap indexes</li>
                    <li>• <strong>Dimension Tables:</strong> B+ Trees for foreign key lookups</li>
                    <li>• <strong>Low-Cardinality:</strong> Compressed bitmap indexes</li>
                    <li>• <strong>Optimization:</strong> Materialized views and zone maps</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3"><strong>Examples:</strong> Data warehouses, business intelligence, reporting systems</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Key-Value Stores</h3>
                <p className="text-gray-800 mb-3"><strong>Characteristics:</strong> Simple get/put operations, high throughput, eventual consistency</p>
                <div className="bg-white p-4 rounded border border-orange-300">
                  <p className="font-semibold text-gray-900 mb-2">Recommended Indexes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary:</strong> LSM-Tree for write-heavy workloads</li>
                    <li>• <strong>Hot Data:</strong> In-memory hash tables with LRU eviction</li>
                    <li>• <strong>Range Support:</strong> Add sorted string tables if needed</li>
                    <li>• <strong>Bloom Filters:</strong> Reduce read amplification</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3"><strong>Examples:</strong> Caching layers, session stores, configuration management</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Time-Series Databases</h3>
                <p className="text-gray-800 mb-3"><strong>Characteristics:</strong> Append-mostly writes, time-range queries, data retention</p>
                <div className="bg-white p-4 rounded border border-purple-300">
                  <p className="font-semibold text-gray-900 mb-2">Recommended Indexes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary:</strong> LSM-Tree with time-based partitioning</li>
                    <li>• <strong>Time Index:</strong> B+ Tree on timestamp for range queries</li>
                    <li>• <strong>Tag Indexes:</strong> Bitmap or inverted indexes for filtering</li>
                    <li>• <strong>Compression:</strong> Delta encoding and run-length encoding</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3"><strong>Examples:</strong> Monitoring systems, IoT platforms, financial tick data</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
                <h3 className="text-xl font-semibold text-pink-900 mb-3">Graph Databases</h3>
                <p className="text-gray-800 mb-3"><strong>Characteristics:</strong> Relationship traversals, pattern matching, variable depth queries</p>
                <div className="bg-white p-4 rounded border border-pink-300">
                  <p className="font-semibold text-gray-900 mb-2">Recommended Indexes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Adjacency Lists:</strong> Hash indexes for node lookup</li>
                    <li>• <strong>Edge Index:</strong> Composite index on source/target</li>
                    <li>• <strong>Property Index:</strong> B+ Trees for property filtering</li>
                    <li>• <strong>Path Indexes:</strong> Specialized structures for common patterns</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3"><strong>Examples:</strong> Social networks, recommendation engines, fraud detection</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Hardware Platform Considerations</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">DRAM Systems</h3>
                <p className="text-sm text-gray-700 mb-3">Focus on CPU cache efficiency and concurrency</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ CSB+-Tree</li>
                  <li>✓ Masstree</li>
                  <li>✓ Cuckoo Hashing</li>
                  <li>✓ ART (Adaptive Radix Tree)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SSD Systems</h3>
                <p className="text-sm text-gray-700 mb-3">Optimize for write patterns and endurance</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ LSM-Tree</li>
                  <li>✓ FD-Tree</li>
                  <li>✓ SILT</li>
                  <li>✓ B+ Tree (with buffering)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">NVM Systems</h3>
                <p className="text-sm text-gray-700 mb-3">Balance speed with persistence guarantees</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ FPTree</li>
                  <li>✓ wB+-Tree</li>
                  <li>✓ Level Hashing</li>
                  <li>✓ FAST & FAIR</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
