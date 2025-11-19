#include <bits/stdc++.h>
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
        cout << "\n===== HASH INDEX =====\n";

        if (hashChoice == 1) cout << "Hash Function: Mod Hash\n";
        else if (hashChoice == 2) cout << "Hash Function: Polynomial Hash\n";
        else cout << "Hash Function: Strong SplitMix64\n";

        cout << "Total Buckets: " << bucketCount << "\n\n";

        for (int i = 0; i < bucketCount; i++) {
            cout << "Bucket[" << i << "] Key: " << key_restore[i] << "\n";
            cout << "Rows: ";
            for (int r : bucket[i]) cout << r << " ";
            cout << "\n-----------------------\n";
        }
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
    cout << "Enter column index for hash indexing: ";
    cin >> colIndex;

    int buckets;
    cout << "Enter number of buckets: ";
    cin >> buckets;

    cout << "\nChoose Hash Function:\n";
    cout << "1. Mod Hash\n";
    cout << "2. Polynomial Rolling Hash\n";
    cout << "3. Strong 64-bit SplitMix Hash\n";
    cout << "Enter choice (1/2/3): ";
    int hashChoice;
    cin >> hashChoice;

    HashIndex hi(buckets, hashChoice);
    hi.build(table, colIndex);
    hi.print();

    return 0;
}
