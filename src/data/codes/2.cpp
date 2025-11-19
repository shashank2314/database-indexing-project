#include <bits/stdc++.h>
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
        cout << "========== B+ TREE NODES ==========" << endl;
        if (!root) { cout << "EMPTY TREE\n"; return; }
        queue<BPlusTreeNode<Key,Row>*> q;
        q.push(root);
        vector<BPlusTreeNode<Key,Row>*> seen;

        while (!q.empty()) {
            auto n = q.front(); q.pop();
            seen.push_back(n);
            if (!n->leaf) for (auto c : n->children) q.push(c);
        }

        for (auto n : seen) {
            cout << "NodeID=" << n->id << " | leaf=" << n->leaf << "\n";
            cout << " Keys: ";
            for (auto &k : n->keys) cout << k << " ";
            cout << "\n";
            if (n->leaf) {
                for (int i = 0; i < (int)n->keys.size(); i++) {
                    cout << "   (" << n->keys[i] << ") -> Row: ";
                    for (auto &v : n->rows[i]) cout << v << " ";
                    cout << "\n";
                }
                if (n->next) cout << " NEXT LEAF -> NodeID=" << n->next->id << "\n";
            } else {
                cout << " Children: ";
                for (auto c : n->children) cout << c->id << " ";
                cout << "\n";
            }
            cout << "----------------------------------------\n";
        }
    }
};

// ========================= MAIN PROGRAM =========================
int main() {


    int columns;
    cout << "Enter number of columns: ";
    cin >> columns;

    vector<string> types(columns);
    cout << "Enter datatype for each column (int/string):\n";
    for (int i = 0; i < columns; i++) cin >> types[i];

    int rows;
    cout << "Enter number of rows: ";
    cin >> rows;

    vector<vector<string>> table(rows, vector<string>(columns));
    cout << "Enter rows (space separated):\n";
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
}
