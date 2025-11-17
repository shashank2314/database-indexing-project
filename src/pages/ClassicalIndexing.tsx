import { GitBranch, Hash, Grid } from 'lucide-react';

export default function ClassicalIndexing() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">3. Classical Indexing Techniques</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          Classical indexing techniques were developed during the era of disk-based storage systems and have stood
          the test of time. These fundamental structures form the basis of most modern database systems and continue
          to be highly effective for a wide range of workloads.
        </p>

        <div className="space-y-12">
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <GitBranch className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-gray-900">3.1 B-Tree and B+ Tree Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                B-Trees and their variant B+ Trees are the most widely used indexing structures in database systems.
                Introduced by Rudolf Bayer and Edward McCreight in 1972, these balanced tree structures were
                specifically designed to work efficiently with block-oriented storage devices like hard disks.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Structure and Organization</h3>
                <p className="text-gray-800 mb-3">
                  B+ Trees organize data in a hierarchical structure with the following characteristics:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Root Node:</strong> The topmost node containing keys that guide searches</li>
                  <li><strong>Internal Nodes:</strong> Intermediate nodes containing keys and pointers to child nodes</li>
                  <li><strong>Leaf Nodes:</strong> Bottom-level nodes containing keys and pointers to actual data records</li>
                  <li><strong>Sequential Leaf Linkage:</strong> Leaf nodes are linked together for efficient range scans</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Node Organization</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Each node contains multiple keys (typically dozens to hundreds) and child pointers, optimized
                    to fit within a single disk page or cache line.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Keys stored in sorted order</li>
                    <li>• Node size typically 4KB-8KB</li>
                    <li>• High fan-out reduces tree height</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Fan-out and Height</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Fan-out refers to the number of children per node. Higher fan-out means shorter trees and
                    fewer disk accesses during searches.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Typical fan-out: 100-200</li>
                    <li>• Height rarely exceeds 3-4 levels</li>
                    <li>• Logarithmic search complexity</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Operations</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Search Operation</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Searching begins at the root and follows pointers down to the appropriate leaf node:
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-6">
                    <li>Start at root node and compare search key with node keys</li>
                    <li>Follow the appropriate child pointer based on key comparison</li>
                    <li>Repeat until reaching a leaf node</li>
                    <li>Search leaf node for the exact key</li>
                  </ol>
                  <p className="text-gray-600 text-sm mt-2"><strong>Time Complexity:</strong> O(log n) where n is the number of records</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Insert Operation</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Insertion maintains the balanced property of the tree:
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-6">
                    <li>Search for appropriate leaf node for new key</li>
                    <li>Insert key into leaf node in sorted order</li>
                    <li>If node overflows, split it into two nodes</li>
                    <li>Propagate split upward if parent also overflows</li>
                    <li>Create new root if root splits</li>
                  </ol>
                  <p className="text-gray-600 text-sm mt-2"><strong>Time Complexity:</strong> O(log n) plus potential split operations</p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Delete Operation</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Deletion may trigger node merging to maintain balance:
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-6">
                    <li>Search for key to delete</li>
                    <li>Remove key from leaf node</li>
                    <li>If node underflows, borrow from sibling or merge</li>
                    <li>Propagate changes upward through internal nodes</li>
                    <li>Adjust tree height if necessary</li>
                  </ol>
                  <p className="text-gray-600 text-sm mt-2"><strong>Time Complexity:</strong> O(log n) plus potential merge operations</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">B+ Tree Advantages in Modern Databases</h3>
                <p className="text-gray-800 mb-3">
                  B+ Trees have become the de facto standard in database systems like MySQL (InnoDB), PostgreSQL,
                  and Oracle due to several key advantages:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Excellent Range Query Performance:</strong> Sequential leaf linkage enables efficient scanning of key ranges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Balanced Structure:</strong> Guaranteed O(log n) performance for all operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>High Fan-out:</strong> Fewer levels mean fewer disk I/O operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Cache-Friendly:</strong> Node size matches disk page and CPU cache line sizes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Concurrency Support:</strong> Multiple strategies for concurrent access (latching, MVCC)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Used In:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">MySQL InnoDB</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">PostgreSQL</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Oracle</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">SQL Server</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">SQLite</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Hash className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-semibold text-gray-900">3.2 Hash-Based Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Hash-based indexing uses a hash function to map keys directly to storage locations, providing
                extremely fast point lookups. While hash indexes sacrifice range query capability, they excel
                at exact-match searches with O(1) average-case performance.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Hash Function Properties</h3>
                <p className="text-gray-800 mb-3">
                  An effective hash function for database indexing must exhibit:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Uniform Distribution:</strong> Keys should be evenly distributed across hash buckets</li>
                  <li><strong>Determinism:</strong> Same key always produces same hash value</li>
                  <li><strong>Low Collision Rate:</strong> Different keys should rarely map to same bucket</li>
                  <li><strong>Efficiency:</strong> Fast computation to avoid becoming a bottleneck</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Static vs. Dynamic Hashing</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Static Hashing</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Fixed number of hash buckets determined at creation time. Simple but limited scalability.
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-2">
                    <li>• Simple implementation</li>
                    <li>• Fast O(1) lookups</li>
                    <li>• Predictable performance</li>
                  </ul>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Disadvantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Performance degrades with growth</li>
                    <li>• Requires expensive reorganization</li>
                    <li>• Wasted space or overflow chains</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Dynamic Hashing</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Adapts structure as data grows or shrinks, maintaining performance without full reorganization.
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-2">
                    <li>• Grows incrementally</li>
                    <li>• Consistent performance</li>
                    <li>• No full reorganization needed</li>
                  </ul>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Disadvantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• More complex implementation</li>
                    <li>• Additional directory overhead</li>
                    <li>• Occasional bucket splits</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Linear and Extendible Hashing</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Linear Hashing</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Linear hashing grows the hash table incrementally by splitting buckets in linear order:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-2">
                    <li>• Uses family of hash functions with increasing range</li>
                    <li>• Splits buckets one at a time in round-robin fashion</li>
                    <li>• No directory structure required</li>
                    <li>• Load factor controls when to trigger splits</li>
                  </ul>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Best for:</strong> Applications where gradual growth is acceptable and directory overhead should be minimized
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Extendible Hashing</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Extendible hashing uses a directory that can double in size to accommodate growth:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-2">
                    <li>• Directory maps hash values to bucket pointers</li>
                    <li>• Directory doubles when all bits are used</li>
                    <li>• Only affected buckets split on overflow</li>
                    <li>• Multiple directory entries can point to same bucket</li>
                  </ul>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Best for:</strong> Scenarios requiring fast adaptation to growth with acceptable directory space overhead
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200 mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Performance Characteristics</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Strengths:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• O(1) average lookup time</li>
                      <li>• Excellent for equality searches</li>
                      <li>• Simple and fast implementation</li>
                      <li>• Low CPU overhead</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Weaknesses:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Cannot support range queries</li>
                      <li>• Poor performance for ORDER BY</li>
                      <li>• Collisions degrade performance</li>
                      <li>• Not cache-friendly for scans</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Used In:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">PostgreSQL Hash Index</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">MySQL MEMORY Tables</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Redis</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Memcached</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Grid className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-semibold text-gray-900">3.3 Bitmap Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Bitmap indexes represent the presence or absence of values using bit vectors, making them highly
                efficient for columns with low cardinality (few distinct values). They are particularly valuable
                in data warehousing and analytical workloads.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Structure and Representation</h3>
                <p className="text-gray-800 mb-3">
                  A bitmap index creates a separate bitmap (bit vector) for each distinct value in the indexed column:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Each bitmap has one bit per row in the table</li>
                  <li>Bit is set to 1 if row contains the corresponding value, 0 otherwise</li>
                  <li>Multiple bitmaps can be combined using bitwise operations (AND, OR, NOT)</li>
                  <li>Highly compressible using specialized algorithms</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ideal Use Cases</h3>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Low-Cardinality Attributes</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Bitmap indexes are most effective when the number of distinct values is small relative to
                  the number of rows. Common examples include:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-1">Gender: {'{M, F, Other}'}</p>
                    <p className="text-gray-600">3 distinct values</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-1">Status: {'{Active, Inactive, Pending}'}</p>
                    <p className="text-gray-600">3 distinct values</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-1">Country: {'{~200 countries}'}</p>
                    <p className="text-gray-600">Low relative to billions of rows</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-1">Product Category: {'{~50 categories}'}</p>
                    <p className="text-gray-600">Moderate cardinality</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compression Methods</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">WAH (Word-Aligned Hybrid) Compression</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    WAH compression encodes runs of consecutive 0s or 1s efficiently while maintaining word
                    alignment for fast bitwise operations. It achieves good compression ratios (often 10-100x)
                    while allowing direct operations on compressed data without full decompression.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Roaring Bitmap</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Roaring Bitmap is a modern compression format that adaptively chooses between different
                    representations (array, bitmap, or run-length encoding) based on data density. It provides
                    excellent compression with fast operations and has become the standard in many modern systems.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 mb-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Common in OLAP and Data Warehouses</h3>
                <p className="text-gray-800 mb-3">
                  Bitmap indexes are extensively used in analytical databases because:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Complex Queries:</strong> Efficient evaluation of queries with multiple predicates using bitwise operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Read-Optimized:</strong> Data warehouses are read-heavy with infrequent updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Dimension Tables:</strong> Star schema dimension tables often have low-cardinality attributes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Parallel Processing:</strong> Bitwise operations can be parallelized across multiple cores</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6">
                <h4 className="font-semibold text-yellow-900 mb-2">Limitations</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠</span>
                    <span><strong>High Update Cost:</strong> Updates require modifying multiple bitmaps, making them unsuitable for OLTP workloads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠</span>
                    <span><strong>Space Overhead:</strong> High-cardinality columns result in many sparse bitmaps, even with compression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠</span>
                    <span><strong>Locking Issues:</strong> Single bitmap covers all rows, creating concurrency bottlenecks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Used In:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Oracle Database</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Apache Druid</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">ClickHouse</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Elasticsearch</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Pilosa</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
