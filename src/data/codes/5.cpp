#include <bits/stdc++.h>
using namespace std;

// ------------------- Strong 64-bit hash -------------------
uint64_t splitmix64(uint64_t x) {
    x += 0x9e3779b97f4a7c15ULL;
    x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
    x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
    return x ^ (x >> 31);
}

uint64_t strongHash(const string& s) {
    return splitmix64(hash<string>{}(s));
}

// ------------------- Bloom Filter -------------------
struct BloomFilter {
    vector<uint8_t> bits;
    int m, k, inserted;

    BloomFilter(int m, int k) : m(m), k(k), inserted(0) {
        bits.assign((m + 7) / 8, 0);
    }

    void setBit(int pos) { bits[pos / 8] |= (1 << (pos % 8)); }
    bool getBit(int pos) const { return bits[pos / 8] & (1 << (pos % 8)); }

    // ---- Add a key using strong double-hashing ----
    void add(const string& s) {
        uint64_t h1 = strongHash(s);
        uint64_t h2 = strongHash(to_string(h1 + 789123));

        cout << "Adding key \"" << s << "\" uses bit positions: ";

        for (int i = 0; i < k; i++) {
            uint64_t hv = (h1 + i * h2) % m;
            setBit(hv);
            cout << hv << " ";
        }
        cout << "\n";

        inserted++;
    }

    bool query(const string& s) const {
        uint64_t h1 = strongHash(s);
        uint64_t h2 = strongHash(to_string(h1 + 789123));

        for (int i = 0; i < k; i++) {
            uint64_t hv = (h1 + i * h2) % m;
            if (!getBit(hv)) return false;
        }
        return true;
    }

    void print() {
        cout << "\n===== BLOOM FILTER (Improved) =====\n";
        cout << "Bit-array size (m): " << m << "\n";
        cout << "Hash functions (k): " << k << "\n";
        cout << "Inserted keys: " << inserted << "\n";

        double fp = pow(1 - exp(-1.0 * k * inserted / m), k);
        cout << "Estimated false-positive rate: " << fp << "\n";

        cout << "Bits (first 128): ";
        for (int i = 0; i < min(m, 128); i++)
            cout << (getBit(i) ? '1' : '0');
        cout << "\n-----------------------------------\n";
    }
};

int main() {
    int cols, rows;
    cout << "Enter number of columns: ";
    cin >> cols;

    vector<string> types(cols);
    cout << "Enter datatype for each column (int/string):\n";
    for (int i = 0; i < cols; i++) cin >> types[i];

    cout << "Enter number of rows: ";
    cin >> rows;

    vector<vector<string>> table(rows, vector<string>(cols));
    cout << "Enter rows:\n";
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            cin >> table[r][c];

    int colIndex;
    cout << "Enter column index for bloom filter: ";
    cin >> colIndex;

    int m, k;
    cout << "Enter Bloom filter size m: ";
    cin >> m;
    cout << "Enter number of hash functions k: ";
    cin >> k;

    BloomFilter bf(m, k);

    cout << "\n--- Building Bloom Filter ---\n";
    for (int r = 0; r < rows; r++)
        bf.add(table[r][colIndex]);

    bf.print();

    return 0;
}
