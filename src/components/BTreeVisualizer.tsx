// interface BTreeVisualizerProps {
//   data: number[];
// }

// export function BTreeVisualizer({ data }: BTreeVisualizerProps) {
//   const nodeWidth = 80;
//   const nodeHeight = 40;
//   const levelGap = 80;

//   const buildTreeLevels = (sortedData: number[]) => {
//     const levels: number[][] = [];
//     let currentLevel = [...sortedData];

//     while (currentLevel.length > 0) {
//       levels.push(currentLevel.slice(0, 4));
//       currentLevel = currentLevel.slice(4);
//     }

//     return levels;
//   };

//   const levels = buildTreeLevels(data);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//       <h3 className="text-lg font-semibold mb-4 text-gray-800">B+ Tree Structure</h3>
//       <div className="overflow-x-auto">
//         <div className="min-w-max">
//           {levels.map((level, levelIndex) => (
//             <div key={levelIndex} className="flex justify-center items-center mb-8">
//               <div className="flex gap-4">
//                 {level.map((value, nodeIndex) => (
//                   <div
//                     key={nodeIndex}
//                     className="flex items-center justify-center bg-blue-500 text-white rounded"
//                     style={{
//                       width: `${nodeWidth}px`,
//                       height: `${nodeHeight}px`,
//                     }}
//                   >
//                     <span className="font-semibold">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-4 text-sm text-gray-600">
//         <p>Sorted order: {data.join(' → ')}</p>
//         <p className="mt-1">Nodes per level: {levels.map(l => l.length).join(', ')}</p>
//       </div>
//     </div>
//   );
// }

// import React from "react";

// interface TreeNode {
//     id: string;
//     keys: number[];
//     children?: TreeNode[];
//     x?: number;
//     y?: number;
// }

// interface BTreeVisualizerProps {
//     data: number[];
// }

// export function BTreeVisualizer({ data }: BTreeVisualizerProps) {
//     const sortedData = [...data].sort((a, b) => a - b);

//     // --- Step 1: Build mock hierarchical structure ---
//     const buildMockTree = (values: number[]): TreeNode => {
//         const chunk = (arr: number[], size: number) =>
//             arr.reduce(
//                 (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
//                 [] as number[][]
//             );

//         const leafNodes = chunk(values, 3).map((group, i) => ({
//             id: `leaf-${i}`,
//             keys: group,
//         }));

//         const internalNodes = chunk(
//             leafNodes.map((n) => Math.max(...n.keys)),
//             3
//         ).map((group, i) => ({
//             id: `internal-${i}`,
//             keys: group,
//             children: leafNodes.slice(i * 3, i * 3 + group.length),
//         }));

//         return {
//             id: "root",
//             keys: [Math.max(...internalNodes.flatMap((n) => n.keys))],
//             children: internalNodes,
//         };
//     };

//     const tree = buildMockTree(sortedData);

//     // --- Step 2: Compute coordinates recursively ---
//     const layoutTree = (node: TreeNode, depth = 0, offsetX = 0): number => {
//         const nodeWidth = node.keys.length * 50 + 20;
//         const nodeHeight = 50;
//         const gapX = 60;
//         const gapY = 120;

//         if (!node.children || node.children.length === 0) {
//             node.x = offsetX;
//             node.y = depth * gapY;
//             return nodeWidth;
//         }

//         let totalWidth = 0;
//         let childX = offsetX;

//         for (const child of node.children) {
//             const w = layoutTree(child, depth + 1, childX);
//             childX += w + gapX;
//             totalWidth += w + gapX;
//         }

//         totalWidth -= gapX; // remove last extra gap
//         node.x = offsetX + totalWidth / 2 - nodeWidth / 2;
//         node.y = depth * gapY;

//         return totalWidth;
//     };

//     layoutTree(tree);
//     const totalWidth = layoutTree(tree);
//     // --- Step 3: Render recursively ---
//     const renderNode = (node: TreeNode) => {
//         const nodeX = node.x ?? 0;
//         const nodeY = node.y ?? 0;

//         return (
//             <g key={node.id}>
//                 {/* Node box */}
//                 <rect
//                     x={nodeX}
//                     y={nodeY}
//                     width={node.keys.length * 50 + 20}
//                     height={40}
//                     rx={8}
//                     fill="#3B82F6"
//                 />
//                 <text
//                     x={nodeX + 10}
//                     y={nodeY + 25}
//                     fill="white"
//                     fontSize="16"
//                     fontFamily="monospace"
//                 >
//                     {node.keys.join(", ")}
//                 </text>

//                 {/* Connectors */}
//                 {node.children?.map((child) => (
//                     <line
//                         key={`${node.id}-${child.id}`}
//                         x1={(node.x ?? 0) + (node.keys.length * 50 + 20) / 2}
//                         y1={(node.y ?? 0) + 40}
//                         x2={(child.x ?? 0) + (child.keys.length * 50 + 20) / 2}
//                         y2={(child.y ?? 0)}
//                         stroke="#9CA3AF"
//                         strokeWidth={2}
//                     />
//                 ))}

//                 {/* Recursive render */}
//                 {node.children?.map((child) => renderNode(child))}
//             </g>
//         );
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-sm border w-full border-gray-200">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                 B+ Tree Structure (Hierarchical)
//             </h3>

//             <div className="overflow-x-scroll overflow-y-auto w-full max-h-[500px] border rounded-lg">
//                 <svg
//                     width={totalWidth + 200}   // Add a margin so nothing gets clipped
//                     height="500"
//                     className="min-w-full"
//                 >
//                     {renderNode(tree)}
//                 </svg>
//             </div>

//             <div className="mt-4 text-sm text-gray-600">
//                 <p>Sorted order: {sortedData.join(" → ")}</p>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";

interface TreeNode {
    id: string;
    keys: number[];
    children?: TreeNode[];
    x?: number;
    y?: number;
}

interface BTreeVisualizerProps {
    data: number[];
    defaultOrder?: number;
}

export function BTreeVisualizer({ data, defaultOrder = 3 }: BTreeVisualizerProps) {
    const [order, setOrder] = useState(defaultOrder);
    const sortedData = [...data].sort((a, b) => a - b);

    // --- Step 1: Build mock hierarchical structure ---
    const buildMockTree = (values: number[]): TreeNode => {
        const chunk = (arr: number[], size: number) =>
            arr.reduce(
                (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
                [] as number[][]
            );

        // Leaf nodes based on current order
        const leafNodes = chunk(values, order).map((group, i) => ({
            id: `leaf-${i}`,
            keys: group,
        }));

        // Build parent levels recursively
        const buildLevels = (nodes: TreeNode[]): TreeNode[] => {
            if (nodes.length <= order) return nodes;
            const parentNodes = chunk(
                nodes.map((n) => Math.max(...n.keys)),
                order
            ).map((group, i) => ({
                id: `internal-${i}`,
                keys: group,
                children: nodes.slice(i * order, i * order + group.length),
            }));
            return buildLevels(parentNodes);
        };

        const internalNodes = buildLevels(leafNodes);

        return {
            id: "root",
            keys: [Math.max(...internalNodes.flatMap((n) => n.keys))],
            children: internalNodes,
        };
    };

    const tree = buildMockTree(sortedData);

    // --- Step 2: Layout (calculate positions) ---
    const layoutTree = (node: TreeNode, depth = 0, offsetX = 0): number => {
        const nodeWidth = node.keys.length * 50 + 20;
        const gapX = 60;
        const gapY = 120;

        if (!node.children || node.children.length === 0) {
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

    const totalWidth = layoutTree(tree);

    // --- Step 3: Render nodes recursively ---
    const renderNode = (node: TreeNode) => {
        const nodeX = node.x ?? 0;
        const nodeY = node.y ?? 0;

        return (
            <g key={node.id}>
                {/* Node box */}
                <rect
                    x={nodeX}
                    y={nodeY}
                    width={node.keys.length * 50 + 20}
                    height={40}
                    rx={8}
                    fill="#3B82F6"
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

                {/* Connector lines */}
                {node.children?.map((child) => (
                    <line
                        key={`${node.id}-${child.id}`}
                        x1={(node.x ?? 0) + (node.keys.length * 50 + 20) / 2}
                        y1={(node.y ?? 0) + 40}
                        x2={(child.x ?? 0) + (child.keys.length * 50 + 20) / 2}
                        y2={(child.y ?? 0)}
                        stroke="#9CA3AF"
                        strokeWidth={2}
                    />
                ))}

                {node.children?.map((child) => renderNode(child))}
            </g>
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border w-full border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    B+ Tree Structure (Order: {order})
                </h3>

                {/* 🔹 Interactive input field for order */}
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
                            if (val === "") return; // ✅ If input empty, keep old order
                            const newOrder = Number(val);
                            if (!isNaN(newOrder) && newOrder >= 2 && newOrder <= 10) {
                                setOrder(newOrder);
                            }
                        }}
                        className="border border-gray-300 rounded-md px-2 py-1 w-16 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                </div>
            </div>

            {/* Scrollable visualization container */}
            <div className="overflow-x-scroll overflow-y-auto w-full max-h-[500px] border rounded-lg">
                <svg width={totalWidth + 200} height="500" className="min-w-full">
                    {renderNode(tree)}
                </svg>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>Sorted order: {sortedData.join(" → ")}</p>
            </div>
        </div>
    );
}
