import { buildTree as buildTreeImpl } from './treeBuilder';

type IndexType = 'btree' | 'bplus' | 'bitmap' | 'hash';

class BitmapIndex {
  keys: string[] = [];
  keyId: Map<string, number> = new Map();
  bitmap: number[][] = [];
  rows = 0;

  build(table: string[][], col: number) {
    this.rows = table.length;
    for (let r = 0; r < table.length; r++) {
      const k = table[r][col];
      if (!this.keyId.has(k)) {
        this.keyId.set(k, this.keys.length);
        this.keys.push(k);
        this.bitmap.push(new Array(this.rows).fill(0));
      }
      this.bitmap[this.keyId.get(k)!][r] = 1;
    }
  }

  print(): string {
    let output = '===== BITMAP INDEX =====\n';
    output += `Rows: ${this.rows}\n`;
    for (let i = 0; i < this.keys.length; i++) {
      output += `Key: ${this.keys[i]}\n`;
      output += 'Bitmap: ';
      for (const b of this.bitmap[i]) output += b;
      output += '\nRows: ';
      const rowIndices: number[] = [];
      for (let r = 0; r < this.rows; r++) {
        if (this.bitmap[i][r]) rowIndices.push(r);
      }
      if (rowIndices.length === 0) {
        output += '(none)';
      } else {
        output += rowIndices.join(', ');
      }
      output += '\n-------------------------\n';
    }
    return output;
  }
}

function modHash(s: string, bucketCount: number): number {
  let sum = 0;
  for (const c of s) sum += c.charCodeAt(0);
  return sum % bucketCount;
}

function polyHash(s: string, bucketCount: number): number {
  let h = 0;
  const base = 131;
  for (const c of s) {
    h = (h * base + c.charCodeAt(0)) % bucketCount;
  }
  return h;
}

function splitmix64(x: number): number {
  x = (x + 0x9e3779b97f4a7c15) | 0;
  x = ((x ^ (x >>> 30)) * 0xbf58476d1ce4e5b9) | 0;
  x = ((x ^ (x >>> 27)) * 0x94d049bb133111eb) | 0;
  return ((x ^ (x >>> 31)) >>> 0) % 0x100000000;
}

function strongHash(s: string, bucketCount: number): number {
  let hash = 0;
  for (const c of s) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
  return Math.abs(splitmix64(hash)) % bucketCount;
}

class HashIndex {
  bucketCount: number;
  hashChoice: number;
  bucket: number[][] = [];
  keyRestore: string[] = [];

  constructor(B: number, H: number) {
    this.bucketCount = B;
    this.hashChoice = H;
    this.bucket = Array(B).fill(null).map(() => []);
    this.keyRestore = Array(B).fill('');
  }

  computeHash(s: string): number {
    if (this.hashChoice === 1) return modHash(s, this.bucketCount);
    if (this.hashChoice === 2) return polyHash(s, this.bucketCount);
    return strongHash(s, this.bucketCount);
  }

  build(table: string[][], col: number) {
    for (let r = 0; r < table.length; r++) {
      const key = table[r][col];
      const hv = this.computeHash(key);
      this.bucket[hv].push(r);
      this.keyRestore[hv] = key;
    }
  }

  print(): string {
    let output = '\n===== HASH INDEX =====\n';

    if (this.hashChoice === 1) output += 'Hash Function: Mod Hash\n';
    else if (this.hashChoice === 2) output += 'Hash Function: Polynomial Hash\n';
    else output += 'Hash Function: Strong SplitMix64\n';

    output += `Total Buckets: ${this.bucketCount}\n\n`;

    for (let i = 0; i < this.bucketCount; i++) {
      output += `Bucket[${i}] Key: ${this.keyRestore[i]}\n`;
      output += 'Rows: ';
      for (const r of this.bucket[i]) output += r + ' ';
      output += '\n-----------------------\n';
    }
    return output;
  }
}

export function buildIndex(
  indexType: IndexType,
  columns: number,
  types: string[],
  rowCount: number,
  data: string,
  indexColumn: number,
  order: number,
  buckets: number,
  hashFunc: number
): string {
  const rows = data
    .trim()
    .split('\n')
    .map(line => line.trim().split(/\s+/));

  if (indexType === 'bitmap') {
    const bi = new BitmapIndex();
    bi.build(rows, indexColumn);
    return bi.print();
  }

  if (indexType === 'hash') {
    const hi = new HashIndex(buckets, hashFunc);
    hi.build(rows, indexColumn);
    return hi.print();
  }

  return buildTreeImpl(indexType, columns, types, rowCount, data, indexColumn, order);
}
