export default function Fundamentals() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">2. Fundamentals of Database Indexing</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Concepts</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding database indexing requires familiarity with several fundamental concepts that form
              the foundation of all indexing techniques:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Key</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A key is the value or set of values used to identify and locate records in a database. Keys can
                  be simple (single attribute) or composite (multiple attributes). The choice of key affects both
                  the efficiency of lookups and the structure of the index.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Index</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  An index is a separate data structure that stores a sorted or organized representation of key
                  values along with pointers to the actual data records. It provides an efficient access path to
                  retrieve data without scanning the entire table.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Access Path</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  An access path is the route taken by the database system to locate and retrieve data. Indexes
                  provide alternative access paths that can be more efficient than sequential table scans for
                  specific query patterns.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Clustering</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Clustering refers to the physical ordering of data records on disk based on index key values.
                  Clustered storage improves performance for range queries by ensuring that related records are
                  stored contiguously, reducing I/O operations.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Density</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Index density refers to the proportion of data records that have corresponding index entries.
                  Dense indexes contain an entry for every record, while sparse indexes contain entries only for
                  specific records, typically in clustered storage scenarios.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Indexes</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Database indexes can be classified along several dimensions, each with distinct characteristics and
              use cases:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Primary vs. Secondary Index</h3>

                <div className="bg-blue-50 p-4 rounded-lg mb-3">
                  <h4 className="font-semibold text-blue-900 mb-2">Primary Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A primary index is built on the primary key of a table, which uniquely identifies each record.
                    The index determines the physical order of data storage.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Automatically created when primary key is defined</li>
                    <li>• Ensures uniqueness and fast lookups</li>
                    <li>• Only one primary index per table</li>
                    <li>• Typically clustered in most database systems</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Secondary Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A secondary index is built on non-primary key columns to improve query performance on those
                    attributes. Multiple secondary indexes can exist on a single table.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Created manually by database administrators</li>
                    <li>• Does not affect physical data ordering</li>
                    <li>• Can be unique or non-unique</li>
                    <li>• Incurs additional storage and maintenance overhead</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Clustered vs. Non-clustered</h3>

                <div className="bg-green-50 p-4 rounded-lg mb-3">
                  <h4 className="font-semibold text-green-900 mb-2">Clustered Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A clustered index determines the physical order of data in a table. The data rows are stored
                    in sorted order based on the index key.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Only one clustered index per table</li>
                    <li>• Excellent for range queries</li>
                    <li>• Leaf nodes contain actual data rows</li>
                    <li>• Insert/update operations may require data reorganization</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Non-clustered Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A non-clustered index maintains a separate structure from the data table. Index entries
                    contain pointers to the actual data rows.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Multiple non-clustered indexes allowed per table</li>
                    <li>• Requires additional lookup to retrieve data</li>
                    <li>• Leaf nodes contain pointers to data rows</li>
                    <li>• Less maintenance overhead for insertions</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Dense vs. Sparse</h3>

                <div className="bg-orange-50 p-4 rounded-lg mb-3">
                  <h4 className="font-semibold text-orange-900 mb-2">Dense Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A dense index contains an index entry for every record in the data file, regardless of
                    whether the file is sorted.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• One index entry per data record</li>
                    <li>• Faster lookups but higher storage cost</li>
                    <li>• Can be used with unsorted data files</li>
                    <li>• Common in non-clustered indexes</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Sparse Index</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    A sparse index contains index entries only for some records, typically one entry per data
                    block or page when data is sorted by the indexed attribute.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Fewer index entries than data records</li>
                    <li>• Lower storage overhead</li>
                    <li>• Requires sorted data file</li>
                    <li>• Common in clustered indexes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Evaluating indexing techniques requires understanding key performance metrics that characterize
              their behavior under different workloads:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-3 text-left font-semibold">Metric</th>
                    <th className="px-6 py-3 text-left font-semibold">Description</th>
                    <th className="px-6 py-3 text-left font-semibold">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Search Time</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Time required to locate a record or range of records</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Critical for query performance</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Insertion Cost</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Overhead of maintaining index during data insertions</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Affects write-heavy workloads</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Update Cost</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Cost of modifying index when indexed values change</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Important for dynamic datasets</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Deletion Cost</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Overhead of removing entries and reorganizing structure</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Relevant for maintenance operations</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Storage Overhead</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Additional space required beyond raw data storage</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Affects total cost of ownership</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Scalability</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Performance degradation as data volume increases</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Critical for long-term viability</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Concurrency</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Ability to handle multiple simultaneous operations</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Essential for multi-user systems</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Role in Query Optimization</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Indexes are the primary tool used by database query optimizers to improve query performance.
              The optimizer's role is to:
            </p>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 mb-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Analyze Query Predicates:</strong>
                    <span className="text-gray-700"> Identify which columns are used in WHERE clauses, JOIN conditions, and ORDER BY clauses</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Evaluate Available Indexes:</strong>
                    <span className="text-gray-700"> Determine which indexes can be used to satisfy query requirements</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Estimate Costs:</strong>
                    <span className="text-gray-700"> Calculate the estimated cost of different execution plans using statistics and cardinality estimates</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Select Optimal Plan:</strong>
                    <span className="text-gray-700"> Choose the execution plan with the lowest estimated cost</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Index Selection Strategies</h3>
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                The query optimizer employs various strategies to determine index usage:
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Index Scan:</strong> Traverse the index structure to find matching entries</li>
                <li><strong>Index Seek:</strong> Directly navigate to specific entries using key values</li>
                <li><strong>Index-Only Scan:</strong> Retrieve all required data from index without accessing table</li>
                <li><strong>Bitmap Index Scan:</strong> Create bitmap of matching rows from multiple index scans</li>
                <li><strong>Multi-Index Access:</strong> Combine results from multiple indexes using set operations</li>
              </ul>
            </div>
          </section>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Takeaways</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span>Understanding fundamental concepts is essential for choosing appropriate indexing strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span>Different index types serve different purposes and have distinct performance characteristics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span>Performance metrics help quantify trade-offs between read performance, write overhead, and storage</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span>Query optimizers rely heavily on indexes to generate efficient execution plans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
