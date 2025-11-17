export function TheorySection() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Classical Indexing Techniques</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">B+ Tree Indexing</h3>
            <p className="text-gray-600 mb-3">
              A balanced tree structure where all data is stored at leaf nodes, connected in sorted order.
              Internal nodes store keys for navigation. Provides efficient range queries and maintains
              O(log n) search, insert, and delete operations.
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Characteristics:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>All data at leaf level, linked for sequential access</li>
                <li>Balanced tree structure ensures consistent performance</li>
                <li>Excellent for range queries and sorted data retrieval</li>
                <li>Space overhead: O(n) for nodes and pointers</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hash Indexing</h3>
            <p className="text-gray-600 mb-3">
              Uses a hash function to compute the storage location of data directly. Provides O(1)
              average-case lookup but cannot efficiently handle range queries.
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Characteristics:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Constant-time average lookup performance</li>
                <li>Poor for range queries or sorted access</li>
                <li>Collision handling required for hash conflicts</li>
                <li>Space overhead: O(n) plus bucket structure</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bitmap Indexing</h3>
            <p className="text-gray-600 mb-3">
              Creates a bit array where each position represents whether a value exists. Extremely
              space-efficient for dense datasets with limited value ranges. Supports fast bitwise
              operations for complex queries.
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Characteristics:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Compact representation using single bits</li>
                <li>Fast bitwise AND/OR/NOT operations</li>
                <li>Best for low-cardinality columns</li>
                <li>Space overhead: O(max_value) bits</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bloom Filter (Approximate)</h3>
            <p className="text-gray-600 mb-3">
              A probabilistic data structure for approximate membership testing. Uses multiple hash
              functions to set bits. Can guarantee absence but may return false positives. Extremely
              space-efficient.
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Characteristics:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Probabilistic: may have false positives, never false negatives</li>
                <li>Extremely space-efficient compared to exact structures</li>
                <li>No deletion support in basic implementation</li>
                <li>Space overhead: Fixed size bit array</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Modern Hardware-Aware Indexing</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">In-Memory Optimizations</h3>
            <p className="text-gray-600">
              Modern indexes leverage RAM's fast random access with cache-aware layouts,
              SIMD operations, and lock-free concurrent structures. Cache line optimization
              and memory prefetching dramatically improve performance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">SSD-Based Structures (LSM-Trees)</h3>
            <p className="text-gray-600">
              Log-Structured Merge Trees optimize for SSD characteristics with sequential writes,
              reducing write amplification. Data flows from memory to disk through multiple
              sorted levels, with periodic compaction for read performance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">NVM-Based Indexing</h3>
            <p className="text-gray-600">
              Non-Volatile Memory combines persistence with near-DRAM latency. Persistent
              data structures eliminate recovery overhead while maintaining byte-addressability
              and persistence guarantees.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Considerations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Time Complexity</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">Structure</th>
                  <th className="px-4 py-2 text-left text-gray-700">Lookup</th>
                  <th className="px-4 py-2 text-left text-gray-700">Insert</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="px-4 py-2">B+ Tree</td>
                  <td className="px-4 py-2">O(log n)</td>
                  <td className="px-4 py-2">O(log n)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Hash</td>
                  <td className="px-4 py-2">O(1) avg</td>
                  <td className="px-4 py-2">O(1) avg</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Bitmap</td>
                  <td className="px-4 py-2">O(1)</td>
                  <td className="px-4 py-2">O(n)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Bloom</td>
                  <td className="px-4 py-2">O(k)</td>
                  <td className="px-4 py-2">O(k)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Use Case Selection</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-2">•</span>
                <span><strong>B+ Tree:</strong> General-purpose, range queries, sorted data</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-green-600 mr-2">•</span>
                <span><strong>Hash:</strong> Point lookups, unique keys, no range queries</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-orange-600 mr-2">•</span>
                <span><strong>Bitmap:</strong> Low cardinality, set operations, data warehouses</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Bloom:</strong> Membership testing, cache filtering, deduplication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
