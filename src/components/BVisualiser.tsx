import React, { useState, useEffect } from "react";

interface TreeNode {
  id: string;
  keys: number[];
  children: TreeNode[];
  x?: number;
  y?: number;
}

interface BTreeVisualizerProps {
  data: number[];
  defaultOrder?: number;
}

export function BVisualizer({ data, defaultOrder = 3 }: BTreeVisualizerProps) {
  const [order, setOrder] = useState(defaultOrder);
  const [tree, setTree] = useState<TreeNode | null>(null);

  // ✅ Basic B-Tree insertion algorithm (no key repetition)
  class BTree {
    order: number;
    root: TreeNode;

    constructor(order: number) {
      this.order = order;
      this.root = this.createNode();
    }

    createNode(): TreeNode {
      return { id: Math.random().toString(36).slice(2), keys: [], children: [] };
    }

    insert(key: number) {
      const root = this.root;
      if (root.keys.length === 2 * this.order - 1) {
        const newRoot = this.createNode();
        newRoot.children.push(root);
        this.splitChild(newRoot, 0);
        this.insertNonFull(newRoot, key);
        this.root = newRoot;
      } else {
        this.insertNonFull(root, key);
      }
    }

    insertNonFull(node: TreeNode, key: number) {
      let i = node.keys.length - 1;

      if (node.children.length === 0) {
        node.keys.push(key);
        node.keys.sort((a, b) => a - b);
      } else {
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

    splitChild(parent: TreeNode, i: number) {
      const order = this.order;
      const node = parent.children[i];
      const newNode = this.createNode();

      // Middle key moves up
      const middle = node.keys[order - 1];
      newNode.keys = node.keys.splice(order, order - 1);
      node.keys.splice(order - 1, 1);

      if (node.children.length > 0) {
        newNode.children = node.children.splice(order, order);
      }

      parent.keys.splice(i, 0, middle);
      parent.children.splice(i + 1, 0, newNode);
    }
  }

  // Build actual B-Tree structure
  useEffect(() => {
    if (!data || data.length === 0) return;

    const btree = new BTree(order);
    data.forEach((val) => btree.insert(val));
    setTree(btree.root);
  }, [data, order]);

  // --- Layout ---
  const layoutTree = (node: TreeNode, depth = 0, offsetX = 0): number => {
    const nodeWidth = node.keys.length * 50 + 20;
    const gapX = 60;
    const gapY = 120;

    if (node.children.length === 0) {
      node.x = offsetX;
      node.y = depth * gapY;
      return nodeWidth;
    }

    let totalWidth = 0;
    let childX = offsetX;

    for (const child of node.children) {
      const w = layoutTree(child, depth + 1, childX);
      childX += w + gapX;
      totalWidth += w + gapX;
    }

    totalWidth -= gapX;
    node.x = offsetX + totalWidth / 2 - nodeWidth / 2;
    node.y = depth * gapY;
    return totalWidth;
  };

  const totalWidth = tree ? layoutTree(tree) : 0;

  const renderNode = (node: TreeNode) => {
    const nodeX = node.x ?? 0;
    const nodeY = node.y ?? 0;

    return (
      <g key={node.id}>
        <rect
          x={nodeX}
          y={nodeY}
          width={node.keys.length * 50 + 20}
          height={40}
          rx={8}
          fill="#16A34A"
        />
        <text
          x={nodeX + 10}
          y={nodeY + 25}
          fill="white"
          fontSize="16"
          fontFamily="monospace"
        >
          {node.keys.join(", ")}
        </text>

        {node.children.map((child) => (
          <line
            key={`${node.id}-${child.id}`}
            x1={nodeX + (node.keys.length * 50 + 20) / 2}
            y1={nodeY + 40}
            x2={(child.x ?? 0) + (child.keys.length * 50 + 20) / 2}
            y2={child.y ?? 0}
            stroke="#9CA3AF"
            strokeWidth={2}
          />
        ))}

        {node.children.map((child) => renderNode(child))}
      </g>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border w-full border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          B-Tree Structure (Order: {order})
        </h3>

        <div className="flex items-center gap-2">
          <label htmlFor="order" className="text-sm text-gray-600">
            Tree Order:
          </label>
          <input
            id="order"
            type="number"
            min={2}
            max={10}
            value={order}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") return;
              const newOrder = Number(val);
              if (!isNaN(newOrder) && newOrder >= 2 && newOrder <= 10) {
                setOrder(newOrder);
              }
            }}
            className="border border-gray-300 rounded-md px-2 py-1 w-16 text-center focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto w-full max-h-[500px] border rounded-lg">
        <svg width={totalWidth + 200} height="500" className="min-w-full">
          {tree && renderNode(tree)}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Sorted order: {data.sort((a, b) => a - b).join(" → ")}</p>
      </div>
    </div>
  );
}
