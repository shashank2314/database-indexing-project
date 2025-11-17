import { BookOpen, ExternalLink } from 'lucide-react';

export default function References() {
  const references = {
    books: [
      {
        title: "Database System Concepts",
        authors: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
        edition: "7th Edition",
        publisher: "McGraw-Hill Education",
        year: "2019",
        description: "Comprehensive textbook covering fundamental and advanced database concepts including indexing structures."
      },
      {
        title: "Readings in Database Systems (The Red Book)",
        authors: "Joseph M. Hellerstein, Michael Stonebraker (Editors)",
        edition: "5th Edition",
        publisher: "MIT Press",
        year: "2015",
        description: "Collection of seminal papers in database systems, including influential work on indexing and storage."
      },
      {
        title: "Database Internals",
        authors: "Alex Petrov",
        publisher: "O'Reilly Media",
        year: "2019",
        description: "Deep dive into storage engines, indexing structures, and distributed database architectures."
      },
      {
        title: "Designing Data-Intensive Applications",
        authors: "Martin Kleppmann",
        publisher: "O'Reilly Media",
        year: "2017",
        description: "Modern perspective on data systems including discussion of LSM-Trees and indexing trade-offs."
      }
    ],
    papers: [
      {
        title: "The Ubiquitous B-Tree",
        authors: "Douglas Comer",
        venue: "ACM Computing Surveys",
        year: "1979",
        description: "Classic survey paper on B-Tree variants and their applications in database systems."
      },
      {
        title: "The Log-Structured Merge-Tree (LSM-Tree)",
        authors: "Patrick O'Neil, Edward Cheng, Dieter Gawlick, Elizabeth O'Neil",
        venue: "Acta Informatica",
        year: "1996",
        description: "Original paper introducing LSM-Trees, now fundamental to modern NoSQL databases."
      },
      {
        title: "Cache-Oblivious B-Trees",
        authors: "Michael A. Bender, Erik D. Demaine, Martin Farach-Colton",
        venue: "FOCS",
        year: "2000",
        description: "Theoretical foundation for cache-efficient tree structures."
      },
      {
        title: "The Case for Learned Index Structures",
        authors: "Tim Kraska, Alex Beutel, Ed H. Chi, Jeffrey Dean, Neoklis Polyzotis",
        venue: "SIGMOD",
        year: "2018",
        description: "Groundbreaking work proposing machine learning models as index replacements."
      },
      {
        title: "ALEX: An Updatable Adaptive Learned Index",
        authors: "Jialin Ding, Umar Farooq Minhas, Jia Yu, Chi Wang, Jaeyoung Do, Yinan Li, Hantian Zhang, Badrish Chandramouli, Johannes Gehrke, Donald Kossmann, David Lomet, Tim Kraska",
        venue: "SIGMOD",
        year: "2020",
        description: "Extends learned indexes to support dynamic workloads with insertions and deletions."
      },
      {
        title: "Masstree: A Cache-Friendly Mashup of Tries and B-Trees",
        authors: "Yandong Mao, Eddie Kohler, Robert Morris",
        venue: "EuroSys",
        year: "2012",
        description: "High-performance in-memory index combining trie and B+ Tree structures."
      },
      {
        title: "SILT: A Memory-Efficient, High-Performance Key-Value Store",
        authors: "Hyeontaek Lim, Bin Fan, David G. Andersen, Michael Kaminsky",
        venue: "SOSP",
        year: "2011",
        description: "Flash-optimized key-value store with minimal memory footprint."
      },
      {
        title: "FPTree: A Hybrid SCM-DRAM Persistent and Concurrent B-Tree",
        authors: "Ismail Oukid, Johan Lasperas, Anisoara Nica, Thomas Willhalm, Wolfgang Lehner",
        venue: "SIGMOD",
        year: "2016",
        description: "B+ Tree variant optimized for non-volatile memory."
      },
      {
        title: "wB+-Tree: A Write-Optimized B+-Tree for Persistent Memory",
        authors: "Jihye Seo, Wook-Hee Kim, Woongki Baek, Beomseok Nam, Sam H. Noh",
        venue: "VLDB",
        year: "2016",
        description: "Reduces NVM write overhead through unsorted leaf nodes."
      },
      {
        title: "RocksDB: Evolution of Development Priorities in a Key-Value Store",
        authors: "Siying Dong, Andrew Kryczka, Yanqin Jin, Michael Stumm",
        venue: "ACM Transactions on Storage",
        year: "2021",
        description: "Production experience with LSM-Trees in Facebook's RocksDB."
      }
    ],
    conferences: [
      {
        name: "SIGMOD (ACM Conference on Management of Data)",
        description: "Premier venue for database research including indexing innovations",
        url: "https://sigmod.org/"
      },
      {
        name: "VLDB (International Conference on Very Large Data Bases)",
        description: "Major conference covering large-scale data management and indexing",
        url: "https://vldb.org/"
      },
      {
        name: "ICDE (International Conference on Data Engineering)",
        description: "IEEE conference focusing on data engineering and storage systems",
        url: "https://www.computer.org/conferences/icde"
      },
      {
        name: "FAST (USENIX Conference on File and Storage Technologies)",
        description: "Storage systems conference covering flash and NVM indexing",
        url: "https://www.usenix.org/conferences/byname/146"
      }
    ],
    systems: [
      {
        name: "RocksDB",
        description: "Embeddable persistent key-value store based on LSM-Tree",
        url: "https://rocksdb.org/",
        organization: "Meta (Facebook)"
      },
      {
        name: "PostgreSQL",
        description: "Advanced open-source relational database with B-Tree and other index types",
        url: "https://www.postgresql.org/",
        organization: "PostgreSQL Global Development Group"
      },
      {
        name: "MySQL (InnoDB)",
        description: "World's most popular open-source database, uses B+ Tree primary index",
        url: "https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html",
        organization: "Oracle"
      },
      {
        name: "Apache Cassandra",
        description: "Distributed NoSQL database using LSM-Tree storage engine",
        url: "https://cassandra.apache.org/",
        organization: "Apache Software Foundation"
      },
      {
        name: "Redis",
        description: "In-memory data structure store with hash-based indexing",
        url: "https://redis.io/",
        organization: "Redis Ltd"
      }
    ],
    hardware: [
      {
        name: "Intel Optane DC Persistent Memory",
        description: "Non-volatile memory technology combining speed and persistence",
        url: "https://www.intel.com/content/www/us/en/products/memory-storage/optane-dc-persistent-memory.html"
      },
      {
        name: "NVM Express (NVMe)",
        description: "Interface specification for accessing non-volatile storage over PCIe",
        url: "https://nvmexpress.org/"
      },
      {
        name: "SNIA Persistent Memory Programming",
        description: "Resources and specifications for persistent memory programming",
        url: "https://www.snia.org/pm"
      }
    ],
    online: [
      {
        title: "Database of Databases",
        description: "Comprehensive catalog of database systems with technical details",
        url: "https://dbdb.io/"
      },
      {
        title: "CMU Database Systems Course",
        description: "Video lectures and materials covering indexing and storage (Andy Pavlo)",
        url: "https://15445.courses.cs.cmu.edu/"
      },
      {
        title: "Learned Index Structures GitHub",
        description: "Implementation and resources for learned indexes research",
        url: "https://github.com/learnedsystems"
      }
    ]
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">9. References</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          This section provides a comprehensive list of academic and technical references that informed this
          research project. These resources span foundational textbooks, seminal research papers, conference
          proceedings, database system documentation, and hardware specifications.
        </p>

        <div className="space-y-12">
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-gray-900">Academic Textbooks</h2>
            </div>

            <div className="space-y-4">
              {references.books.map((book, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Authors:</strong> {book.authors}
                  </p>
                  {book.edition && (
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Edition:</strong> {book.edition}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Publisher:</strong> {book.publisher}, {book.year}
                  </p>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{book.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Research Papers</h2>

            <div className="space-y-4">
              {references.papers.map((paper, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{paper.title}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Authors:</strong> {paper.authors}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Published in:</strong> {paper.venue}, {paper.year}
                  </p>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{paper.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Note on Accessing Research Papers</h3>
              <p className="text-sm text-gray-800">
                Many of these papers are available through university library systems, ACM Digital Library,
                IEEE Xplore, or directly from author websites. Some may be behind paywalls, but preprint
                versions are often available on arXiv.org or author homepages.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Major Conferences</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {references.conferences.map((conf, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{conf.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{conf.description}</p>
                  <a
                    href={conf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Visit website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Database Systems Documentation</h2>

            <div className="space-y-4">
              {references.systems.map((system, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{system.organization}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{system.description}</p>
                  <a
                    href={system.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Hardware Documentation</h2>

            <div className="space-y-4">
              {references.hardware.map((hw, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{hw.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{hw.description}</p>
                  <a
                    href={hw.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Learn more</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Online Resources</h2>

            <div className="space-y-4">
              {references.online.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Visit resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Additional Reading</h2>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Exploration Paths</h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Beginners:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Start with "Database System Concepts" chapters on indexing</li>
                    <li>• Watch CMU Database Systems course lectures on storage and indexing</li>
                    <li>• Experiment with PostgreSQL and examine query plans</li>
                    <li>• Read RocksDB documentation and tuning guides</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Advanced Study:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Deep dive into recent SIGMOD/VLDB papers on learned indexes</li>
                    <li>• Study NVM programming guides and persistent memory semantics</li>
                    <li>• Explore RocksDB source code to understand LSM-Tree implementation</li>
                    <li>• Implement simple index structures to understand trade-offs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Practitioners:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• "Designing Data-Intensive Applications" for real-world context</li>
                    <li>• Database vendor documentation for production systems</li>
                    <li>• Performance tuning guides and benchmarking methodologies</li>
                    <li>• Case studies from companies like Google, Facebook, Amazon</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Citation Recommendation</h3>
            <p className="leading-relaxed mb-4">
              If you use this research project as a reference, please cite the key papers and systems that
              influenced your work. The database research community values proper attribution and builds
              on a foundation of shared knowledge.
            </p>
            <p className="text-sm text-blue-100">
              For the most up-to-date references, regularly check recent proceedings from SIGMOD, VLDB,
              and ICDE conferences. The field of database indexing continues to evolve rapidly with new
              innovations appearing frequently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
