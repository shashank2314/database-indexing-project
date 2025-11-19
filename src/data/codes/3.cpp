#include <bits/stdc++.h>
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
        cout << "===== BITMAP INDEX =====\n";
        cout << "Rows: " << rows << "\n";
        for (int i = 0; i < (int)keys.size(); i++) {
            cout << "Key: " << keys[i] << "\n";
            cout << "Bitmap: ";
            for (auto b : bitmap[i]) cout << (int)b;
            cout << "\nRows: ";
            bool any=false;
            for (int r=0;r<rows;r++)
                if (bitmap[i][r]) { if(any) cout<<", "; cout<<r; any=true; }
            if (!any) cout << "(none)";
            cout << "\n-------------------------\n";
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
    cout << "Enter column index for bitmap indexing: ";
    cin >> colIndex;

    BitmapIndex bi;
    bi.build(table, colIndex);
    bi.print();

    return 0;
}
