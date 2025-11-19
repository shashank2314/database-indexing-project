type TreeType = 'btree' | 'bplus';

interface BTreeNode {
  id: number;
  leaf: boolean;
  keys: (number | string)[];
  rows: string[][];
  children: BTreeNode[];
}

interface BPlusTreeNode {
  id: number;
  leaf: boolean;
  keys: (number | string)[];
  rows: string[][];
  children: BPlusTreeNode[];
  next: BPlusTreeNode | null;
}

class BTree {
  root: BTreeNode | null = null;
  t: number;
  nextID = 1;

  constructor(t: number) {
    this.t = t;
  }

  insert(key: number | string, row: string[]) {
    if (!this.root) {
      this.root = { id: this.nextID++, leaf: true, keys: [key], rows: [row], children: [] };
      return;
    }
    if (this.root.keys.length === 2 * this.t - 1) {
      const newRoot: BTreeNode = { id: this.nextID++, leaf: false, keys: [], rows: [], children: [this.root] };
      this.splitChild(newRoot, 0, this.root);
      this.root = newRoot;
    }
    this.insertNonFull(this.root, key, row);
  }

  splitChild(parent: BTreeNode, idx: number, child: BTreeNode) {
    const z: BTreeNode = { id: this.nextID++, leaf: child.leaf, keys: [], rows: [], children: [] };
    const mid = this.t - 1;

    const middleKey = child.keys[mid];
    const middleRow = child.rows[mid];

    z.keys = child.keys.slice(this.t);
    z.rows = child.rows.slice(this.t);
    if (!child.leaf) z.children = child.children.slice(this.t);

    child.keys = child.keys.slice(0, mid);
    child.rows = child.rows.slice(0, mid);
    if (!child.leaf) child.children = child.children.slice(0, this.t);

    parent.children.splice(idx + 1, 0, z);
    parent.keys.splice(idx, 0, middleKey);
    parent.rows.splice(idx, 0, middleRow);
  }

  insertNonFull(node: BTreeNode, key: number | string, row: string[]) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      node.keys.push(key);
      node.rows.push(row);
      while (i >= 0 && node.keys[i] > key) {
        node.keys[i + 1] = node.keys[i];
        node.rows[i + 1] = node.rows[i];
        i--;
      }
      node.keys[i + 1] = key;
      node.rows[i + 1] = row;
    } else {
      while (i >= 0 && node.keys[i] > key) i--;
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i, node.children[i]);
        if (node.keys[i] < key) i++;
      }
      this.insertNonFull(node.children[i], key, row);
    }
  }

  printNodes(): string {
    if (!this.root) return 'EMPTY TREE\n';
    const nodes: BTreeNode[] = [];
    const queue = [this.root];
    while (queue.length > 0) {
      const n = queue.shift()!;
      nodes.push(n);
      if (!n.leaf) queue.push(...n.children);
    }

    let output = '\n===== B-TREE NODES =====\n';
    output += `Total nodes: ${nodes.length}\n`;
    for (const n of nodes) {
      output += `NodeID=${n.id} | leaf=${n.leaf} | keys=${n.keys.length}\n`;
      for (let i = 0; i < n.keys.length; i++) {
        output += `  Key: ${n.keys[i]} | Row: ${n.rows[i].join(' ')}\n`;
      }
      if (!n.leaf) {
        output += ` Children: ${n.children.map(c => c.id).join(' ')}\n`;
      }
      output += '----------------------\n';
    }
    return output;
  }
}

class BPlusTree {
  root: BPlusTreeNode | null = null;
  t: number;
  nextID = 1;

  constructor(t: number) {
    this.t = t;
  }

  insert(key: number | string, row: string[]) {
    if (!this.root) {
      this.root = { id: this.nextID++, leaf: true, keys: [key], rows: [row], children: [], next: null };
      return;
    }
    if (this.root.keys.length === 2 * this.t - 1) {
      const newRoot: BPlusTreeNode = { id: this.nextID++, leaf: false, keys: [], rows: [], children: [this.root], next: null };
      this.splitChild(newRoot, 0, this.root);
      this.root = newRoot;
    }
    this.insertNonFull(this.root, key, row);
  }

  splitChild(parent: BPlusTreeNode, idx: number, child: BPlusTreeNode) {
    const z: BPlusTreeNode = { id: this.nextID++, leaf: child.leaf, keys: [], rows: [], children: [], next: null };
    const mid = this.t - 1;

    if (child.leaf) {
      z.keys = child.keys.slice(mid);
      z.rows = child.rows.slice(mid);
      child.keys = child.keys.slice(0, mid);
      child.rows = child.rows.slice(0, mid);

      z.next = child.next;
      child.next = z;

      parent.keys.splice(idx, 0, z.keys[0]);
      parent.children.splice(idx + 1, 0, z);
    } else {
      const promote = child.keys[mid];
      z.keys = child.keys.slice(mid + 1);
      z.children = child.children.slice(mid + 1);
      child.keys = child.keys.slice(0, mid);
      child.children = child.children.slice(0, mid + 1);

      parent.keys.splice(idx, 0, promote);
      parent.children.splice(idx + 1, 0, z);
    }
  }

  insertNonFull(node: BPlusTreeNode, key: number | string, row: string[]) {
    if (node.leaf) {
      let i = node.keys.length - 1;
      node.keys.push(key);
      node.rows.push(row);
      while (i >= 0 && node.keys[i] > key) {
        node.keys[i + 1] = node.keys[i];
        node.rows[i + 1] = node.rows[i];
        i--;
      }
      node.keys[i + 1] = key;
      node.rows[i + 1] = row;
      return;
    }

    let i = node.keys.length - 1;
    while (i >= 0 && node.keys[i] > key) i--;
    i++;

    if (node.children[i].keys.length === 2 * this.t - 1) {
      this.splitChild(node, i, node.children[i]);
      if (node.keys[i] < key) i++;
    }
    this.insertNonFull(node.children[i], key, row);
  }

  printNodes(): string {
    if (!this.root) return 'EMPTY TREE\n';
    const nodes: BPlusTreeNode[] = [];
    const queue = [this.root];
    while (queue.length > 0) {
      const n = queue.shift()!;
      nodes.push(n);
      if (!n.leaf) queue.push(...n.children);
    }

    let output = '\n========== B+ TREE NODES ==========\n';
    for (const n of nodes) {
      output += `NodeID=${n.id} | leaf=${n.leaf}\n`;
      output += ` Keys: ${n.keys.join(' ')}\n`;
      if (n.leaf) {
        for (let i = 0; i < n.keys.length; i++) {
          output += `   (${n.keys[i]}) -> Row: ${n.rows[i].join(' ')}\n`;
        }
        if (n.next) output += ` NEXT LEAF -> NodeID=${n.next.id}\n`;
      } else {
        output += ` Children: ${n.children.map(c => c.id).join(' ')}\n`;
      }
      output += '----------------------------------------\n';
    }
    return output;
  }
}

export function buildTree(
  treeType: TreeType,
  columns: number,
  types: string[],
  rowCount: number,
  data: string,
  indexColumn: number,
  order: number
): string {
  const rows = data.trim().split('\n').map(line => line.trim().split(/\s+/));

  if (types[indexColumn] === 'int') {
    if (treeType === 'btree') {
      const tree = new BTree(order);
      for (const row of rows) {
        tree.insert(parseInt(row[indexColumn]), row);
      }
      return tree.printNodes();
    } else {
      const tree = new BPlusTree(order);
      for (const row of rows) {
        tree.insert(parseInt(row[indexColumn]), row);
      }
      return tree.printNodes();
    }
  } else {
    if (treeType === 'btree') {
      const tree = new BTree(order);
      for (const row of rows) {
        tree.insert(row[indexColumn], row);
      }
      return tree.printNodes();
    } else {
      const tree = new BPlusTree(order);
      for (const row of rows) {
        tree.insert(row[indexColumn], row);
      }
      return tree.printNodes();
    }
  }
}
