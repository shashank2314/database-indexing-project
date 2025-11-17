// export interface IndexPerformance {
//   name: string;
//   constructionTime: number;
//   searchTime: number;
//   memoryUsage: number;
// }

// export class BPlusTree {
//   private data: number[] = [];

//   insert(key: number): void {
//     this.data.push(key);
//     this.data.sort((a, b) => a - b);
//   }

//   search(key: number): boolean {
//     return this.data.includes(key);
//   }

//   getData(): number[] {
//     return [...this.data];
//   }

//   getMemoryUsage(): number {
//     return this.data.length * 8;
//   }
// }

// export class HashIndex {
//   private index: Map<number, number> = new Map();
//   private bucketSize = 100;

//   insert(key: number): void {
//     const hashKey = this.hash(key);
//     this.index.set(hashKey, key);
//   }

//   search(key: number): number | undefined {
//     const hashKey = this.hash(key);
//     return this.index.get(hashKey);
//   }

//   private hash(key: number): number {
//     return key % this.bucketSize;
//   }

//   getIndex(): Map<number, number> {
//     return new Map(this.index);
//   }

//   getMemoryUsage(): number {
//     return this.index.size * 16;
//   }
// }

// export class BitmapIndex {
//   private bitmap: number[] = [];
//   private maxValue = 0;

//   insert(values: number[]): void {
//     this.maxValue = Math.max(...values);
//     this.bitmap = new Array(this.maxValue + 1).fill(0);
//     values.forEach(val => {
//       if (val >= 0 && val <= this.maxValue) {
//         this.bitmap[val] = 1;
//       }
//     });
//   }

//   search(key: number): boolean {
//     return key >= 0 && key < this.bitmap.length && this.bitmap[key] === 1;
//   }

//   getBitmap(): number[] {
//     return [...this.bitmap];
//   }

//   getMemoryUsage(): number {
//     return this.bitmap.length * 4;
//   }
// }

// export class BloomFilter {
//   private bits: boolean[];
//   private size: number;

//   constructor(size = 100) {
//     this.size = size;
//     this.bits = new Array(size).fill(false);
//   }

//   add(value: number): void {
//     const indices = this.getHashes(value);
//     indices.forEach(i => {
//       this.bits[i] = true;
//     });
//   }

//   check(value: number): boolean {
//     const indices = this.getHashes(value);
//     return indices.every(i => this.bits[i]);
//   }

//   private getHashes(value: number): number[] {
//     const hash1 = this.simpleHash(value, 1) % this.size;
//     const hash2 = this.simpleHash(value, 2) % this.size;
//     const hash3 = this.simpleHash(value, 3) % this.size;
//     return [hash1, hash2, hash3];
//   }

//   private simpleHash(value: number, seed: number): number {
//     let hash = seed;
//     const str = value.toString();
//     for (let i = 0; i < str.length; i++) {
//       hash = ((hash << 5) - hash) + str.charCodeAt(i);
//       hash = hash & hash;
//     }
//     return Math.abs(hash);
//   }

//   getBits(): boolean[] {
//     return [...this.bits];
//   }

//   getMemoryUsage(): number {
//     return this.size;
//   }
// }

// export function measurePerformance(
//   name: string,
//   operation: () => void,
//   memoryUsage: number
// ): IndexPerformance {
//   const startTime = performance.now();
//   operation();
//   const endTime = performance.now();

//   return {
//     name,
//     constructionTime: endTime - startTime,
//     searchTime: 0,
//     memoryUsage,
//   };
// }

// export function parseInput(input: string): number[] {
//   try {
//     const cleaned = input.trim().replace(/^\[|\]$/g, '');
//     const numbers = cleaned.split(',').map(s => {
//       const num = parseInt(s.trim());
//       if (isNaN(num)) throw new Error('Invalid number');
//       return num;
//     });
//     return numbers;
//   } catch {
//     return [];
//   }
// }


export interface IndexPerformance {
  name: string;
  constructionTime: number;
  searchTime: number;
  memoryUsage: number;
}

/* ----------------- B+ Tree ----------------- */
export class BPlusTree {
  private data: number[] = [];

  insert(key: number): void {
    this.data.push(key);
    this.data.sort((a, b) => a - b);
  }

  search(key: number): boolean {
    return this.data.includes(key);
  }

  getData(): number[] {
    return [...this.data];
  }

  getMemoryUsage(): number {
    return this.data.length * 8;
  }
}

/* ----------------- B-Tree ----------------- */
export class BTree {
  private order: number;
  private root: BTreeNode;

  constructor(order = 3) {
    this.order = order;
    this.root = new BTreeNode(true);
  }

  insert(key: number): void {
    const root = this.root;
    if (root.keys.length === 2 * this.order - 1) {
      // Root is full, need to split
      const newRoot = new BTreeNode(false);
      newRoot.children.push(root);
      this.splitChild(newRoot, 0);
      this.insertNonFull(newRoot, key);
      this.root = newRoot;
    } else {
      this.insertNonFull(root, key);
    }
  }

  private insertNonFull(node: BTreeNode, key: number): void {
    let i = node.keys.length - 1;

    if (node.leaf) {
      // Insert key into sorted order in leaf
      node.keys.push(key);
      node.keys.sort((a, b) => a - b);
    } else {
      // Find child to insert into
      while (i >= 0 && key < node.keys[i]) i--;
      i++;
      const child = node.children[i];
      if (child.keys.length === 2 * this.order - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) i++;
      }
      this.insertNonFull(node.children[i], key);
    }
  }

  private splitChild(parent: BTreeNode, index: number): void {
    const fullChild = parent.children[index];
    const mid = this.order - 1;

    const newChild = new BTreeNode(fullChild.leaf);
    newChild.keys = fullChild.keys.splice(mid + 1);
    const midKey = fullChild.keys.pop()!;

    if (!fullChild.leaf) {
      newChild.children = fullChild.children.splice(this.order);
    }

    parent.keys.splice(index, 0, midKey);
    parent.children.splice(index + 1, 0, newChild);
  }

  search(key: number, node: BTreeNode = this.root): boolean {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) i++;

    if (i < node.keys.length && key === node.keys[i]) return true;
    if (node.leaf) return false;
    return this.search(key, node.children[i]);
  }

  getMemoryUsage(): number {
    const countNodes = (node: BTreeNode): number =>
      1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
    const totalNodes = countNodes(this.root);
    return totalNodes * this.order * 8;
  }

  getAllKeys(): number[] {
    const result: number[] = [];
    const traverse = (node: BTreeNode) => {
      node.keys.forEach((k) => result.push(k));
      node.children.forEach((child) => traverse(child));
    };
    traverse(this.root);
    return result.sort((a, b) => a - b);
  }
}

class BTreeNode {
  keys: number[] = [];
  children: BTreeNode[] = [];
  leaf: boolean;

  constructor(leaf: boolean) {
    this.leaf = leaf;
  }
}

/* ----------------- Hash Index ----------------- */
export class HashIndex {
  private index: Map<number, number> = new Map();
  private bucketSize = 100;

  insert(key: number): void {
    const hashKey = this.hash(key);
    this.index.set(hashKey, key);
  }

  search(key: number): number | undefined {
    const hashKey = this.hash(key);
    return this.index.get(hashKey);
  }

  private hash(key: number): number {
    return key % this.bucketSize;
  }

  getIndex(): Map<number, number> {
    return new Map(this.index);
  }

  getMemoryUsage(): number {
    return this.index.size * 16;
  }
}

/* ----------------- Bitmap Index ----------------- */
export class BitmapIndex {
  private bitmap: number[] = [];
  private maxValue = 0;

  insert(values: number[]): void {
    this.maxValue = Math.max(...values);
    this.bitmap = new Array(this.maxValue + 1).fill(0);
    values.forEach((val) => {
      if (val >= 0 && val <= this.maxValue) {
        this.bitmap[val] = 1;
      }
    });
  }

  search(key: number): boolean {
    return key >= 0 && key < this.bitmap.length && this.bitmap[key] === 1;
  }

  getBitmap(): number[] {
    return [...this.bitmap];
  }

  getMemoryUsage(): number {
    return this.bitmap.length * 4;
  }
}

/* ----------------- Bloom Filter ----------------- */
export class BloomFilter {
  private bits: boolean[];
  private size: number;

  constructor(size = 100) {
    this.size = size;
    this.bits = new Array(size).fill(false);
  }

  add(value: number): void {
    const indices = this.getHashes(value);
    indices.forEach((i) => {
      this.bits[i] = true;
    });
  }

  check(value: number): boolean {
    const indices = this.getHashes(value);
    return indices.every((i) => this.bits[i]);
  }

  private getHashes(value: number): number[] {
    const hash1 = this.simpleHash(value, 1) % this.size;
    const hash2 = this.simpleHash(value, 2) % this.size;
    const hash3 = this.simpleHash(value, 3) % this.size;
    return [hash1, hash2, hash3];
  }

  private simpleHash(value: number, seed: number): number {
    let hash = seed;
    const str = value.toString();
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  getBits(): boolean[] {
    return [...this.bits];
  }

  getMemoryUsage(): number {
    return this.size;
  }
}

/* ----------------- Utility Functions ----------------- */
export function measurePerformance(
  name: string,
  operation: () => void,
  memoryUsage: number
): IndexPerformance {
  const startTime = performance.now();
  operation();
  const endTime = performance.now();

  return {
    name,
    constructionTime: endTime - startTime,
    searchTime: 0,
    memoryUsage,
  };
}

export function parseInput(input: string): number[] {
  try {
    const cleaned = input.trim().replace(/^\[|\]$/g, "");
    const numbers = cleaned.split(",").map((s) => {
      const num = parseInt(s.trim());
      if (isNaN(num)) throw new Error("Invalid number");
      return num;
    });
    return numbers;
  } catch {
    return [];
  }
}
