export const BTREE_CODE = `#include <bits/stdc++.h>
using namespace std;

// Fixed and enhanced B-Tree index builder
// - Bug fix: correct splitChild (save middle key/row before resizing)
// - Supports choosing index column of type int or string
// - Prints node pages after building
// - Simple search prompt after build

// ========================= B-TREE IMPLEMENTATION =========================

template<typename Key, typename Row>
class BTreeNode {
public:
    bool leaf;
    vector<Key> keys;
    vector<Row> rows;        // full row stored here
    vector<BTreeNode*> children;
    int t;
    int id;

    BTreeNode(int _t, bool _leaf, int _id) : t(_t), leaf(_leaf), id(_id) {}

    ~BTreeNode() {
        for (auto c : children) delete c;
    }

    void collect_nodes_bfs(vector<BTreeNode*>& out) {
        queue<BTreeNode*> q;
        q.push(this);
        while (!q.empty()) {
            auto n = q.front(); q.pop();
            out.push_back(n);
            if (!n->leaf) for (auto c : n->children) q.push(c);
        }
    }

    BTreeNode* search(const Key& k, int &idx) {
        int i = 0;
        while (i < (int)keys.size() && keys[i] < k) i++;
        if (i < (int)keys.size() && keys[i] == k) { idx = i; return this; }
        if (leaf) return nullptr;
        return children[i]->search(k, idx);
    }

    void splitChild(int i, BTreeNode* y, function<int()> newID) {
        // y is full (2*t-1 keys). Create z which will hold t-1 keys.
        BTreeNode* z = new BTreeNode(y->t, y->leaf, newID());

        // Save middle key and row BEFORE resizing y
        Key middleKey = y->keys[t-1];
        Row middleRow = y->rows[t-1];

        // copy last (t-1) keys and rows of y to z
        for (int j = 0; j < t-1; j++) {
            z->keys.push_back(y->keys[j + t]);
            z->rows.push_back(y->rows[j + t]);
        }
        // copy children if not leaf
        if (!y->leaf) {
            for (int j = 0; j < t; j++) {
                z->children.push_back(y->children[j + t]);
            }
        }

        // reduce y
        y->keys.resize(t-1);
        y->rows.resize(t-1);
        if (!y->leaf) y->children.resize(t);

        // insert new child z into children of this node
        children.insert(children.begin() + i + 1, z);
        // move middle key of y up to this node
        keys.insert(keys.begin() + i, middleKey);
        rows.insert(rows.begin() + i, middleRow);
    }

    void insertNonFull(const Key& k, const Row& r, function<int()> newID) {
        int i = (int)keys.size() - 1;
        if (leaf) {
            keys.push_back(Key()); rows.push_back(Row());
            while (i >= 0 && keys[i] > k) {
                keys[i+1] = keys[i]; rows[i+1] = rows[i]; i--;
            }
            keys[i+1] = k; rows[i+1] = r;
        } else {
            while (i >= 0 && keys[i] > k) i--;
            i++;
            if ((int)children[i]->keys.size() == 2*t - 1) {
                splitChild(i, children[i], newID);
                if (keys[i] < k) i++;
            }
            children[i]->insertNonFull(k, r, newID);
        }
    }
};


template<typename Key, typename Row>
class BTree {
public:
    BTreeNode<Key,Row>* root = nullptr;
    int t;
    int nextID = 1;

    BTree(int _t) : t(_t) { if (t < 2) throw runtime_error("minimum degree t must be >= 2"); }
    int newID() { return nextID++; }

    void insert(const Key& k, const Row& r) {
        if (!root) {
            root = new BTreeNode<Key,Row>(t, true, newID());
            root->keys.push_back(k);
            root->rows.push_back(r);
            return;
        }
        if ((int)root->keys.size() == 2*t - 1) {
            BTreeNode<Key,Row>* s = new BTreeNode<Key,Row>(t, false, newID());
            s->children.push_back(root);
            s->splitChild(0, root, [this]{return newID();});
            int i = (s->keys[0] < k) ? 1 : 0;
            s->children[i]->insertNonFull(k, r, [this]{return newID();});
            root = s;
        } else root->insertNonFull(k, r, [this]{return newID();});
    }

    void printNodes() {
        vector<BTreeNode<Key,Row>*> nodes;
        if (!root) { cout << "EMPTY TREE\\n"; return; }
        root->collect_nodes_bfs(nodes);

        cout << "\\n===== B-TREE NODES =====\\n";
        cout << "Total nodes: " << nodes.size() << "\\n";
        for (auto n : nodes) {
            cout << "NodeID=" << n->id << " | leaf=" << n->leaf << " | keys=" << n->keys.size() << "\\n";
            for (int i = 0; i < (int)n->keys.size(); i++) {
                cout << "  Key: " << n->keys[i] << " | Row: ";
                for (auto &v : n->rows[i]) cout << v << " ";
                cout << "\\n";
            }
            if (!n->leaf) {
                cout << " Children: ";
                for (auto c : n->children) cout << c->id << " ";
                cout << "\\n";
            }
            cout << "----------------------\\n";
        }
    }

    bool search(const Key& k, Row &outRow) {
        if (!root) return false;
        int idx = -1;
        auto node = root->search(k, idx);
        if (node) { outRow = node->rows[idx]; return true; }
        return false;
    }
};

// ========================= MAIN PROGRAM =========================
int main() {

    int columns;
    cout << "Enter number of columns: ";
    if (!(cin >> columns) || columns <= 0) { cerr << "Invalid column count\\n"; return 1; }

    vector<string> types(columns);
    cout << "Enter datatype for each column (int/string):\\n";
    for (int i = 0; i < columns; i++) cin >> types[i];

    int rows;
    cout << "Enter number of rows: ";
    if (!(cin >> rows) || rows < 0) { cerr << "Invalid row count\\n"; return 1; }

    vector<vector<string>> table(rows, vector<string>(columns));
    cout << "Enter rows (space separated, one row per line preferred):\\n";
    for (int r = 0; r < rows; r++){
        for (int c = 0; c < columns; c++) cin >> table[r][c];
    }

    int indexColumn;
    cout << "Enter column index to build B-Tree (0-based): ";
    cin >> indexColumn;
    if (indexColumn < 0 || indexColumn >= columns) { cerr << "Invalid index column\\n"; return 1; }

    int t;
    cout << "Enter B-Tree order (minimum degree t >= 2): ";
    cin >> t;
    if (t < 2) { cerr << "t must be >= 2\\n"; return 1; }

    // Build according to column datatype (int or string)
    string dtype = types[indexColumn];
    if (dtype == "int") {
        BTree<int, vector<string>> bt(t);
        for (auto &row : table) {
            int key = 0;
            try { key = stoi(row[indexColumn]); }
            catch (...) { cerr << "Failed to parse int key: " << row[indexColumn] << "\\n"; return 1; }
            bt.insert(key, row);
        }
        bt.printNodes();

        cout << "\\nSearch using index (type int). Enter key (or 'q' to quit): ";
        while (true) {
            string s; if (!(cin >> s)) break;
            if (s == "q") break;
            int k; try { k = stoi(s); } catch(...) { cout << "invalid int\\n"; continue; }
            vector<string> out;
            if (bt.search(k, out)) {
                cout << "Found row: "; for (auto &v : out) cout << v << " "; cout << "\\n";
            } else cout << "Not found\\n";
        }
    } else {
        // default to string indexing
        BTree<string, vector<string>> bt(t);
        for (auto &row : table) bt.insert(row[indexColumn], row);
        bt.printNodes();

        cout << "\\nSearch using index (type string). Enter key (or 'q' to quit): ";
        while (true) {
            string k; if (!(cin >> k)) break;
            if (k == "q") break;
            vector<string> out;
            if (bt.search(k, out)) {
                cout << "Found row: "; for (auto &v : out) cout << v << " "; cout << "\\n";
            } else cout << "Not found\\n";
        }
    }

    return 0;
}`;

export const BITMAP_CODE = `#include <bits/stdc++.h>
using namespace std;

struct BitmapIndex {
    vector<string> keys;
    unordered_map<string, int> key_id;
    vector<vector<uint8_t>> bitmap;
    int rows = 0;

    void build(const vector<vector<string>>& table, int col) {
        rows = table.size();
        for (int r = 0; r < rows; r++) {
            string k = table[r][col];
            if (!key_id.count(k)) {
                key_id[k] = keys.size();
                keys.push_back(k);
                bitmap.push_back(vector<uint8_t>(rows, 0));
            }
            bitmap[key_id[k]][r] = 1;
        }
    }

    void print() {
        cout << "===== BITMAP INDEX =====\\n";
        cout << "Rows: " << rows << "\\n";
        for (int i = 0; i < (int)keys.size(); i++) {
            cout << "Key: " << keys[i] << "\\n";
            cout << "Bitmap: ";
            for (auto b : bitmap[i]) cout << (int)b;
            cout << "\\nRows: ";
            bool any=false;
            for (int r=0;r<rows;r++)
                if (bitmap[i][r]) { if(any) cout<<", "; cout<<r; any=true; }
            if (!any) cout << "(none)";
            cout << "\\n-------------------------\\n";
        }
    }
};

int main() {
    int cols, rows;
    cout << "Enter number of columns: ";
    cin >> cols;

    vector<string> types(cols);
    cout << "Enter datatype for each column (int/string):\\n";
    for (int i = 0; i < cols; i++) cin >> types[i];

    cout << "Enter number of rows: ";
    cin >> rows;

    vector<vector<string>> table(rows, vector<string>(cols));
    cout << "Enter rows:\\n";
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            cin >> table[r][c];

    int colIndex;
    cout << "Enter column index for bitmap indexing: ";
    cin >> colIndex;

    BitmapIndex bi;
    bi.build(table, colIndex);
    bi.print();

    return 0;
}`;

export const HASH_CODE = `#include <bits/stdc++.h>
using namespace std;

// --------------------- STRONG 64-bit SplitMix ---------------------
uint64_t splitmix64(uint64_t x) {
    x += 0x9e3779b97f4a7c15ULL;
    x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
    x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
    return x ^ (x >> 31);
}

// --------------------- HASH FUNCTIONS ---------------------
uint64_t modHash(const string& s, int bucketCount) {
    long long sum = 0;
    for (char c : s) sum += (c);
    return sum % bucketCount;
}

uint64_t polyHash(const string& s, int bucketCount) {
    long long h = 0, base = 131;
    for (char c : s) {
        h = (h * base + c) % bucketCount;
    }
    return h;
}

uint64_t strongHash(const string& s, int bucketCount) {
    uint64_t x = hash<string>{}(s);
    return splitmix64(x) % bucketCount;
}

// --------------------- HASH INDEX ---------------------
struct HashIndex {
    int bucketCount;
    int hashChoice;

    vector<vector<int>> bucket;
    vector<string> key_restore;

    HashIndex(int B, int H) : bucketCount(B), hashChoice(H) {
        bucket.resize(bucketCount);
        key_restore.resize(bucketCount);
    }

    uint64_t computeHash(const string& s) {
        if (hashChoice == 1) return modHash(s, bucketCount);
        if (hashChoice == 2) return polyHash(s, bucketCount);
        return strongHash(s, bucketCount); // default
    }

    void build(const vector<vector<string>>& table, int col) {
        for (int r = 0; r < table.size(); r++) {
            string key = table[r][col];
            uint64_t hv = computeHash(key);

            bucket[hv].push_back(r);
            key_restore[hv] = key;
        }
    }

    void print() {
        cout << "\\n===== HASH INDEX =====\\n";

        if (hashChoice == 1) cout << "Hash Function: Mod Hash\\n";
        else if (hashChoice == 2) cout << "Hash Function: Polynomial Hash\\n";
        else cout << "Hash Function: Strong SplitMix64\\n";

        cout << "Total Buckets: " << bucketCount << "\\n\\n";

        for (int i = 0; i < bucketCount; i++) {
            cout << "Bucket[" << i << "] Key: " << key_restore[i] << "\\n";
            cout << "Rows: ";
            for (int r : bucket[i]) cout << r << " ";
            cout << "\\n-----------------------\\n";
        }
    }
};

int main() {
    int cols, rows;
    cout << "Enter number of columns: ";
    cin >> cols;

    vector<string> types(cols);
    cout << "Enter datatype for each column (int/string):\\n";
    for (int i = 0; i < cols; i++) cin >> types[i];

    cout << "Enter number of rows: ";
    cin >> rows;

    vector<vector<string>> table(rows, vector<string>(cols));
    cout << "Enter rows:\\n";
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            cin >> table[r][c];

    int colIndex;
    cout << "Enter column index for hash indexing: ";
    cin >> colIndex;

    int buckets;
    cout << "Enter number of buckets: ";
    cin >> buckets;

    cout << "\\nChoose Hash Function:\\n";
    cout << "1. Mod Hash\\n";
    cout << "2. Polynomial Rolling Hash\\n";
    cout << "3. Strong 64-bit SplitMix Hash\\n";
    cout << "Enter choice (1/2/3): ";
    int hashChoice;
    cin >> hashChoice;

    HashIndex hi(buckets, hashChoice);
    hi.build(table, colIndex);
    hi.print();

    return 0;
}`;

export const BPLUS_CODE = `#include <bits/stdc++.h>
using namespace std;

// ========================= B+ TREE IMPLEMENTATION =========================
// Leaf nodes contain ALL keys + full rows
// Internal nodes contain ONLY keys for routing
// All leaves linked with next pointer
// Order defined by minimum degree t (similar to B-tree)

// Forward declaration
template<typename Key, typename Row> class BPlusTreeNode;

template<typename Key, typename Row>
class BPlusTreeNode {
public:
    bool leaf;
    int t;
    vector<Key> keys;
    vector<Row> rows;                  // only used in leaf
    vector<BPlusTreeNode*> children;   // only used in internal node
    BPlusTreeNode* next = nullptr;     // leaf-chain
    int id;

    BPlusTreeNode(int _t, bool _leaf, int _id)
        : t(_t), leaf(_leaf), id(_id) {}
};


template<typename Key, typename Row>
class BPlusTree {
public:
    BPlusTreeNode<Key,Row>* root = nullptr;
    int t;
    int nextID = 1;
    BPlusTree(int _t) : t(_t) {}
    int newID() { return nextID++; }

    void insert(const Key& k, const Row& r) {
        if (!root) {
            root = new BPlusTreeNode<Key,Row>(t, true, newID());
            root->keys.push_back(k);
            root->rows.push_back(r);
            return;
        }
        if ((int)root->keys.size() == 2*t - 1) {
            auto s = new BPlusTreeNode<Key,Row>(t, false, newID());
            s->children.push_back(root);
            splitChild(s, 0, root);
            root = s;
        }
        insertNonFull(root, k, r);
    }

    void splitChild(BPlusTreeNode<Key,Row>* parent, int idx, BPlusTreeNode<Key,Row>* child) {
        // split leaf
        auto z = new BPlusTreeNode<Key,Row>(t, child->leaf, newID());
        int mid = t - 1;

        if (child->leaf) {
            for (int i = mid; i < 2*t-1; i++) {
                z->keys.push_back(child->keys[i]);
                z->rows.push_back(child->rows[i]);
            }
            child->keys.resize(mid);
            child->rows.resize(mid);

            z->next = child->next;
            child->next = z;

            parent->keys.insert(parent->keys.begin() + idx, z->keys[0]);
            parent->children.insert(parent->children.begin() + idx + 1, z);
            return;
        }
        // internal split
        auto z_internal = z;
        for (int i = mid+1; i < 2*t-1; i++) z_internal->keys.push_back(child->keys[i]);
        for (int i = mid+1; i < 2*t; i++) z_internal->children.push_back(child->children[i]);

        Key promote = child->keys[mid];

        child->keys.resize(mid);
        child->children.resize(mid+1);

        parent->keys.insert(parent->keys.begin() + idx, promote);
        parent->children.insert(parent->children.begin() + idx + 1, z_internal);
    }

    void insertNonFull(BPlusTreeNode<Key,Row>* node, const Key& k, const Row& r) {
        if (node->leaf) {
            int i = node->keys.size() - 1;
            node->keys.push_back(Key());
            node->rows.push_back(Row());
            while (i >= 0 && node->keys[i] > k) {
                node->keys[i+1] = node->keys[i];
                node->rows[i+1] = node->rows[i];
                i--;
            }
            node->keys[i+1] = k;
            node->rows[i+1] = r;
            return;
        }
        int i = node->keys.size() - 1;
        while (i >= 0 && node->keys[i] > k) i--;
        i++;

        if ((int)node->children[i]->keys.size() == 2*t - 1) {
            splitChild(node, i, node->children[i]);
            if (node->keys[i] < k) i++;
        }
        insertNonFull(node->children[i], k, r);
    }

    // PRINT TREE NODES
    void print() {
        cout << "========== B+ TREE NODES ===========" << endl;
        if (!root) { cout << "EMPTY TREE\\n"; return; }
        queue<BPlusTreeNode<Key,Row>*> q;
        q.push(root);
        vector<BPlusTreeNode<Key,Row>*> seen;

        while (!q.empty()) {
            auto n = q.front(); q.pop();
            seen.push_back(n);
            if (!n->leaf) for (auto c : n->children) q.push(c);
        }

        for (auto n : seen) {
            cout << "NodeID=" << n->id << " | leaf=" << n->leaf << "\\n";
            cout << " Keys: ";
            for (auto &k : n->keys) cout << k << " ";
            cout << "\\n";
            if (n->leaf) {
                for (int i = 0; i < (int)n->keys.size(); i++) {
                    cout << "   (" << n->keys[i] << ") -> Row: ";
                    for (auto &v : n->rows[i]) cout << v << " ";
                    cout << "\\n";
                }
                if (n->next) cout << " NEXT LEAF -> NodeID=" << n->next->id << "\\n";
            } else {
                cout << " Children: ";
                for (auto c : n->children) cout << c->id << " ";
                cout << "\\n";
            }
            cout << "----------------------------------------\\n";
        }
    }
};

// ========================= MAIN PROGRAM =========================
int main() {


    int columns;
    cout << "Enter number of columns: ";
    cin >> columns;

    vector<string> types(columns);
    cout << "Enter datatype for each column (int/string):\\n";
    for (int i = 0; i < columns; i++) cin >> types[i];

    int rows;
    cout << "Enter number of rows: ";
    cin >> rows;

    vector<vector<string>> table(rows, vector<string>(columns));
    cout << "Enter rows (space separated):\\n";
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < columns; c++) cin >> table[r][c];

    int indexColumn;
    cout << "Enter column index to build B+ Tree (0-based): ";
    cin >> indexColumn;

    int t;
    cout << "Enter B+ Tree order (minimum degree t >= 2): ";
    cin >> t;

    string dtype = types[indexColumn];

    if (dtype == "int") {
        BPlusTree<int, vector<string>> tree(t);
        for (auto &row : table) tree.insert(stoi(row[indexColumn]), row);
        tree.print();

    } else {
        BPlusTree<string, vector<string>> tree(t);
        for (auto &row : table) tree.insert(row[indexColumn], row);
        tree.print();
    }

    return 0;
}`;
