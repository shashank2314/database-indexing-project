export default function Introduction() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">1. Introduction</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Database Indexing?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Database indexing is a fundamental technique used to improve the speed of data retrieval operations
              on database tables. An index is a data structure that provides an efficient access path to locate
              records based on the values of one or more columns, similar to how a book's index helps readers
              quickly find specific topics without reading every page.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Without indexes, database systems would need to perform full table scans, examining every row to
              find matching records. This approach becomes prohibitively slow as data volumes grow, making
              indexes essential for any production database system.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Indexing is Essential</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-4 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                Modern applications demand sub-millisecond response times and the ability to handle millions
                of queries per second. Efficient indexing is the cornerstone of achieving these performance
                requirements while maintaining data integrity and consistency.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Indexing plays a critical role in:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700"><strong>Query Performance:</strong> Reducing query execution time from seconds to milliseconds</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700"><strong>Resource Efficiency:</strong> Minimizing CPU, memory, and I/O consumption</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700"><strong>Scalability:</strong> Enabling systems to handle growing data volumes without proportional performance degradation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700"><strong>Cost Optimization:</strong> Reducing infrastructure costs by improving resource utilization</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Evolution of Indexing Techniques</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The history of database indexing mirrors the evolution of storage technology and computing architectures:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1970s-1990s: Disk-Based Era</h3>
                <p className="text-gray-700 leading-relaxed">
                  Traditional indexing structures like B-Trees and B+ Trees were designed to minimize expensive
                  disk seeks on mechanical hard drives. These structures optimized for reducing the number of
                  disk I/O operations, as disk access was the primary performance bottleneck.
                </p>
              </div>

              <div className="border-l-4 border-blue-300 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2000s: SSD Revolution</h3>
                <p className="text-gray-700 leading-relaxed">
                  The advent of Solid-State Drives (SSDs) fundamentally changed storage characteristics. With no
                  mechanical moving parts, SSDs eliminated seek time but introduced new challenges like write
                  amplification and limited write endurance. This led to the development of SSD-aware indexing
                  structures that optimize for sequential writes and parallel I/O.
                </p>
              </div>

              <div className="border-l-4 border-green-300 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2010s: In-Memory Databases</h3>
                <p className="text-gray-700 leading-relaxed">
                  As DRAM became more affordable, in-memory databases emerged, eliminating I/O bottlenecks entirely.
                  New index structures focused on CPU cache optimization, reducing pointer chasing, and leveraging
                  SIMD instructions for parallel processing.
                </p>
              </div>

              <div className="border-l-4 border-orange-300 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2015-Present: Non-Volatile Memory (NVM)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Persistent memory technologies like Intel Optane combine the speed of DRAM with the persistence
                  of storage, creating new opportunities for index design. NVM-aware indexes must balance
                  performance with durability and crash consistency while managing unique characteristics like
                  byte-addressability and asymmetric read/write performance.
                </p>
              </div>

              <div className="border-l-4 border-purple-300 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emerging Trends: Learned Indexes</h3>
                <p className="text-gray-700 leading-relaxed">
                  Recent research explores using machine learning models to replace traditional index structures,
                  potentially offering better space efficiency and performance for specific data distributions.
                  These learned indexes represent a paradigm shift in how we think about data access.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Objectives</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This research project aims to provide a comprehensive analysis of database indexing techniques
              across different storage technologies and workload patterns. Our specific objectives include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">1. Comprehensive Study</h3>
                <p className="text-gray-700 text-sm">
                  Examine classical indexing techniques (B+ Trees, Hash Indexes, Bitmap Indexes) and modern
                  hardware-aware structures designed for SSD, NVM, and in-memory environments.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">2. Performance Evaluation</h3>
                <p className="text-gray-700 text-sm">
                  Develop a rigorous evaluation framework using metrics such as search latency, insertion time,
                  update cost, storage overhead, and scalability characteristics.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">3. Trade-off Analysis</h3>
                <p className="text-gray-700 text-sm">
                  Analyze the fundamental trade-offs between query performance, write efficiency, storage space,
                  and persistence guarantees across different indexing approaches.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">4. Practical Recommendations</h3>
                <p className="text-gray-700 text-sm">
                  Provide actionable guidance for selecting appropriate indexing strategies based on workload
                  characteristics, hardware platform, and application requirements.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Importance of Query Optimization</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Query optimization is the process of selecting the most efficient execution plan for a database query.
              Indexes are the primary tool that query optimizers use to reduce query execution time. The optimizer
              must choose:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">Which indexes to use for a given query</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">Whether to perform index scans or table scans</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">How to combine multiple indexes for complex queries</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span className="text-gray-700">When to use index-based joins versus hash joins or nested loops</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Understanding indexing techniques is essential for both database administrators who design schemas
              and developers who write queries, as poor index selection can degrade performance by orders of magnitude.
            </p>
          </section>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Scope</h3>
            <p className="text-gray-700 leading-relaxed">
              This project examines indexing techniques from multiple perspectives: theoretical foundations,
              implementation details, hardware interactions, and real-world performance characteristics. By
              understanding how different index structures leverage hardware capabilities and handle various
              workload patterns, we can make informed decisions about database system design and optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
