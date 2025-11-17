import { Cpu, HardDrive, Zap, Hash, Grid3x3, Brain } from 'lucide-react';

export default function ModernIndexing() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">4. Modern and Hardware-Aware Indexing Techniques</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          Modern indexing techniques are designed to leverage the specific characteristics of contemporary hardware,
          including in-memory databases, solid-state drives (SSDs), and non-volatile memory (NVM). These structures
          optimize for different performance bottlenecks than their disk-based predecessors.
        </p>

        <div className="space-y-12">
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.1 In-Memory Tree Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                In-memory tree indexes are optimized for systems where all data resides in DRAM. With I/O no longer
                a bottleneck, these structures focus on CPU cache efficiency, reducing pointer indirection, and
                minimizing memory footprint.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Key Design Principles</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Cache Optimization:</strong> Node layouts designed to fit within CPU cache lines (64 bytes)</li>
                  <li><strong>Memory Alignment:</strong> Proper alignment to avoid cache line splits and false sharing</li>
                  <li><strong>Pointer Reduction:</strong> Minimize pointer chasing which causes cache misses</li>
                  <li><strong>SIMD Support:</strong> Enable vectorized operations for parallel key comparisons</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notable Structures</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">T-Trees</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    T-Trees combine the benefits of AVL trees and B-Trees for main-memory databases. Each node
                    contains multiple keys stored in a sorted array, reducing pointer overhead while maintaining
                    logarithmic height.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Characteristics:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Height-balanced binary tree structure</li>
                      <li>• Each node stores multiple sorted keys</li>
                      <li>• Lower space overhead than B-Trees</li>
                      <li>• Efficient for point and range queries</li>
                      <li>• Used in early in-memory databases like TimesTen</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">CSB+-Trees (Cache-Sensitive B+ Trees)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    CSB+-Trees reorganize B+ Tree nodes to improve CPU cache utilization by grouping child pointers
                    separately from keys, reducing node size and improving cache line utilization.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Key Optimizations:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Separates keys and child pointers for better cache locality</li>
                      <li>• Groups children of same parent contiguously in memory</li>
                      <li>• Reduces node size by ~50% compared to traditional B+ Trees</li>
                      <li>• Significantly fewer cache misses during traversal</li>
                      <li>• Better performance for read-intensive workloads</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Masstree</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Masstree is a high-performance concatenated trie of B+ Trees designed for multi-core systems.
                    It provides excellent scalability and supports both point and range queries efficiently.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Design Features:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Hybrid trie and B+ Tree structure</li>
                      <li>• Optimized for variable-length keys</li>
                      <li>• Lock-free read operations using versioning</li>
                      <li>• Excellent concurrent access performance</li>
                      <li>• Used in systems like MemC3 and Silo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Evaluation Metrics</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Latency (nanoseconds):</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Point lookup: 100-500 ns</li>
                      <li>• Insertion: 200-1000 ns</li>
                      <li>• Range scan: ~50 ns per key</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Throughput:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Single-thread: 2-10M ops/sec</li>
                      <li>• Multi-thread: 50-200M ops/sec</li>
                      <li>• Scales with core count</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <HardDrive className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.2 SSD-Based Tree Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                SSD-based indexes are designed to exploit SSD characteristics: no seek time, high read parallelism,
                asymmetric read/write performance, and limited write endurance. These structures prioritize sequential
                writes and minimize write amplification.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">SSD Characteristics</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>No Seek Time:</strong> Random reads nearly as fast as sequential reads</li>
                  <li><strong>Read Parallelism:</strong> Multiple simultaneous read operations supported</li>
                  <li><strong>Write Amplification:</strong> Small writes trigger larger internal operations</li>
                  <li><strong>Limited Endurance:</strong> Finite number of program/erase cycles per cell</li>
                  <li><strong>Sequential Write Preference:</strong> Better performance and longevity with sequential patterns</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">SSD-Optimized Structures</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-green-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">FD-Tree (Flash-Disk Tree)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    FD-Tree maintains a small B-Tree in memory and uses a series of increasingly large sorted runs
                    on flash storage, minimizing random writes while supporting efficient queries.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Design:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Small head tree in DRAM for writes</li>
                      <li>• Multiple levels of sorted runs on SSD</li>
                      <li>• Fractional cascading for efficient lookups</li>
                      <li>• Batch writes converted to sequential I/O</li>
                      <li>• Logarithmic number of levels</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">BFTL (B-Tree Flash Translation Layer)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    BFTL integrates B-Tree indexing with flash management, making index-aware decisions about
                    data placement and garbage collection at the flash translation layer level.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Innovations:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Integrates logical and physical indexing</li>
                      <li>• Reduces write amplification through cooperation</li>
                      <li>• Exploits knowledge of access patterns</li>
                      <li>• Optimizes garbage collection</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">LSM-Tree (Log-Structured Merge Tree)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    LSM-Tree is the most widely adopted write-optimized structure, using a multi-level architecture
                    that converts random writes into sequential I/O through background merge operations.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Architecture:</p>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3">
                      <li>• MemTable: In-memory buffer for recent writes</li>
                      <li>• L0-Ln: Progressively larger levels on disk</li>
                      <li>• Each level contains sorted files (SSTables)</li>
                      <li>• Background compaction merges levels</li>
                      <li>• Write-Ahead Log (WAL) for durability</li>
                    </ul>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Trade-offs:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Excellent write throughput (10-100x vs B-Tree)</li>
                      <li>• Read amplification: may check multiple levels</li>
                      <li>• Space amplification: obsolete data until compaction</li>
                      <li>• Bloom filters reduce read overhead</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Used extensively in:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">RocksDB</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">LevelDB</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Cassandra</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">HBase</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">ScyllaDB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Goals and Performance</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Primary Goals:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Convert random writes to sequential writes</li>
                    <li>• Minimize write amplification factor</li>
                    <li>• Extend SSD lifespan through reduced erase cycles</li>
                    <li>• Maintain acceptable read performance</li>
                  </ul>
                  <p className="mt-3"><strong>Typical Performance:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Write throughput: 100-500 MB/s</li>
                    <li>• Point query: 0.1-1 ms (with caching)</li>
                    <li>• Range scan: 200-500 MB/s</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.3 NVM-Based Tree Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Non-volatile memory (NVM) technologies like Intel Optane combine byte-addressability and persistence,
                creating new opportunities and challenges for index design. NVM-aware indexes must ensure crash
                consistency while exploiting near-DRAM performance.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">NVM Characteristics</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Byte-Addressable:</strong> Direct load/store access like DRAM</li>
                  <li><strong>Persistent:</strong> Data survives power failures</li>
                  <li><strong>Asymmetric Performance:</strong> Reads faster than writes (2-3x)</li>
                  <li><strong>Limited Write Endurance:</strong> Higher than SSD but still finite</li>
                  <li><strong>CPU Cache Integration:</strong> Cache persistence must be managed</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">NVM-Optimized Structures</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-orange-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">NV-Tree</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    NV-Tree adapts B+ Tree for NVM by using selective consistency, persisting only parts of the
                    tree structure that are critical for recovery while keeping volatile metadata for performance.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Key Techniques:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Selective persistence: only critical data flushed</li>
                      <li>• Volatile node metadata for performance</li>
                      <li>• Rebuild internal nodes on recovery</li>
                      <li>• Reduces write traffic to NVM</li>
                      <li>• Maintains leaf node consistency</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">FPTree (Fingerprinting Persistent Tree)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    FPTree is a hybrid B+ Tree with internal nodes in DRAM and leaf nodes in NVM, using
                    fingerprinting to reduce NVM access and lock-free techniques for concurrency.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Hybrid Design:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Internal nodes in volatile DRAM</li>
                      <li>• Leaf nodes in persistent NVM</li>
                      <li>• 1-byte fingerprints for fast filtering</li>
                      <li>• Lock-free leaf node operations</li>
                      <li>• Fast reconstruction of internal nodes</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">wB+-Tree (Write-Optimized B+ Tree)</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    wB+-Tree reduces NVM writes through unsorted leaf nodes and selective persistence, achieving
                    write performance close to DRAM-based trees while maintaining persistence.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Optimizations:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Unsorted leaf nodes reduce write overhead</li>
                      <li>• Bitmap tracks valid entries</li>
                      <li>• Logarithmic search within leaves</li>
                      <li>• Consolidation during splits/merges</li>
                      <li>• Minimal persistence overhead</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-100 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Crash Recovery and Durability</h3>
                <p className="text-gray-800 text-sm mb-3">
                  Ensuring crash consistency is critical for NVM indexes. Common approaches include:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Cache Line Flushes:</strong> Explicit clflush/clwb instructions to ensure persistence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Memory Fences:</strong> sfence to order persist operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Logging:</strong> Write-ahead or undo logging for atomicity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span><strong>Copy-on-Write:</strong> Never modify in-place before ensuring consistency</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Hash className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.4 In-Memory Hash Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                In-memory hash indexes provide O(1) point lookups with minimal overhead. Modern designs focus on
                cache efficiency, high load factors, and concurrent access.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Cuckoo Hashing</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Uses multiple hash functions and allows relocating keys to maintain high load factors and
                    constant-time worst-case lookups.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Two or more hash functions and tables</li>
                    <li>• Relocates keys on collision (cuckoo eviction)</li>
                    <li>• O(1) worst-case lookup</li>
                    <li>• High load factors (&gt;90%)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Hopscotch Hashing</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Combines open addressing with bounded neighborhood search for good cache locality and concurrent access.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Keys stored within fixed distance of hash location</li>
                    <li>• Bitmap tracks neighborhood occupancy</li>
                    <li>• Cache-friendly sequential probing</li>
                    <li>• Supports concurrent operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Hash className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.5 SSD-Based Hash Indexing</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              SSD hash indexes batch updates and use sequential writes to minimize write amplification while
              maintaining fast lookups.
            </p>

            <div className="border-l-4 border-green-500 pl-6 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">SILT (Small Index Large Table)</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Multi-level hash table optimized for flash storage with minimal memory footprint and high throughput.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Three-tier architecture: LogStore, HashStore, SortedStore</li>
                <li>• Memory-efficient design (&lt;1 byte/key)</li>
                <li>• Sequential writes for all updates</li>
                <li>• Millions of queries per second</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Hash className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.6 NVM-Based Hash Indexing</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Persistent hash tables for NVM focus on crash consistency and exploiting byte-addressability.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-6 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">PathHash</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Crash-consistent hash table using path-based probe sequence logging and efficient recovery mechanisms.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Level Hashing</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Two-level hash table minimizing NVM writes through intelligent placement and opportunistic sharing.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Grid3x3 className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.7 Bitmap Indexing (Advanced)</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Modern bitmap indexes leverage SIMD instructions and GPU acceleration for ultra-fast filtering on
              large datasets with proper compression.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-semibold text-gray-900">4.8 Approximate Indexing</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Approximate indexes sacrifice exact correctness for improved space efficiency and performance,
                suitable for applications tolerating bounded error rates.
              </p>

              <div className="bg-pink-50 border-l-4 border-pink-600 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl font-semibold text-pink-900 mb-3">Learned Indexes</h3>
                <p className="text-gray-800 mb-3">
                  Machine learning models replace traditional index structures by learning data distribution:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>ALEX:</strong> Adaptive learned index with inserts and updates</li>
                  <li><strong>PGM-Index:</strong> Piecewise geometric model for compact representation</li>
                  <li><strong>Benefits:</strong> Orders of magnitude smaller, competitive performance</li>
                  <li><strong>Limitations:</strong> Works best with sorted, stable data distributions</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Bloom Filters</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Probabilistic data structure for set membership testing with no false negatives but possible false positives.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Space-efficient: few bits per element</li>
                  <li>• Fast O(k) operations where k is hash count</li>
                  <li>• Widely used in LSM-Trees to skip empty levels</li>
                  <li>• Configurable false positive rate</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-100 p-6 rounded-lg border border-pink-200 mt-6">
                <h3 className="text-lg font-semibold text-pink-900 mb-3">Trade-offs</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Accuracy</p>
                    <p className="text-gray-700">Bounded error rates acceptable for specific applications</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Speed</p>
                    <p className="text-gray-700">Often faster due to simpler operations and smaller size</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Memory</p>
                    <p className="text-gray-700">Significant space savings enable larger working sets</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
