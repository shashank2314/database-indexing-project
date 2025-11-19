#include <bits/stdc++.h>
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
        if (!root) { cout << "EMPTY TREE\n"; return; }
        root->collect_nodes_bfs(nodes);

        cout << "\n===== B-TREE NODES =====\n";
        cout << "Total nodes: " << nodes.size() << "\n";
        for (auto n : nodes) {
            cout << "NodeID=" << n->id << " | leaf=" << n->leaf << " | keys=" << n->keys.size() << "\n";
            for (int i = 0; i < (int)n->keys.size(); i++) {
                cout << "  Key: " << n->keys[i] << " | Row: ";
                for (auto &v : n->rows[i]) cout << v << " ";
                cout << "\n";
            }
            if (!n->leaf) {
                cout << " Children: ";
                for (auto c : n->children) cout << c->id << " ";
                cout << "\n";
            }
            cout << "----------------------\n";
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
    if (!(cin >> columns) || columns <= 0) { cerr << "Invalid column count\n"; return 1; }

    vector<string> types(columns);
    cout << "Enter datatype for each column (int/string):\n";
    for (int i = 0; i < columns; i++) cin >> types[i];

    int rows;
    cout << "Enter number of rows: ";
    if (!(cin >> rows) || rows < 0) { cerr << "Invalid row count\n"; return 1; }

    vector<vector<string>> table(rows, vector<string>(columns));
    cout << "Enter rows (space separated, one row per line preferred):\n";
    for (int r = 0; r < rows; r++){
        for (int c = 0; c < columns; c++) cin >> table[r][c];
    }

    int indexColumn;
    cout << "Enter column index to build B-Tree (0-based): ";
    cin >> indexColumn;
    if (indexColumn < 0 || indexColumn >= columns) { cerr << "Invalid index column\n"; return 1; }

    int t;
    cout << "Enter B-Tree order (minimum degree t >= 2): ";
    cin >> t;
    if (t < 2) { cerr << "t must be >= 2\n"; return 1; }

    // Build according to column datatype (int or string)
    string dtype = types[indexColumn];
    if (dtype == "int") {
        BTree<int, vector<string>> bt(t);
        for (auto &row : table) {
            int key = 0;
            try { key = stoi(row[indexColumn]); }
            catch (...) { cerr << "Failed to parse int key: " << row[indexColumn] << "\n"; return 1; }
            bt.insert(key, row);
        }
        bt.printNodes();

        cout << "\nSearch using index (type int). Enter key (or 'q' to quit): ";
        while (true) {
            string s; if (!(cin >> s)) break;
            if (s == "q") break;
            int k; try { k = stoi(s); } catch(...) { cout << "invalid int\n"; continue; }
            vector<string> out;
            if (bt.search(k, out)) {
                cout << "Found row: "; for (auto &v : out) cout << v << " "; cout << "\n";
            } else cout << "Not found\n";
        }
    } else {
        // default to string indexing
        BTree<string, vector<string>> bt(t);
        for (auto &row : table) bt.insert(row[indexColumn], row);
        bt.printNodes();

        cout << "\nSearch using index (type string). Enter key (or 'q' to quit): ";
        while (true) {
            string k; if (!(cin >> k)) break;
            if (k == "q") break;
            vector<string> out;
            if (bt.search(k, out)) {
                cout << "Found row: "; for (auto &v : out) cout << v << " "; cout << "\n";
            } else cout << "Not found\n";
        }
    }

    return 0;
}
