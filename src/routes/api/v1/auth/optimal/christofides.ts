// import { Graph, alg, type Edge } from 'graphlib';
// import type { MatrixItem } from '../matrix/get-google-matrix';
// import blossom from 'edmonds-blossom';

// const populateGraph = (matrix: MatrixItem[]) => {
//   const graph = new Graph({ directed: false });

//   matrix.forEach(({ originIndex, destinationIndex, staticDuration }) => {
//     if (originIndex !== destinationIndex) {
//       graph.setEdge(originIndex.toString(), destinationIndex.toString(), staticDuration);
//     }
//   });

//   return graph;
// };

// const weightFunction = (graph: Graph) => (edge: Edge) => graph.edge(edge);
// const getPrimMST = (graph: Graph) => alg.prim(graph, weightFunction(graph));

// const getMinimumOddDegreeVertices = (graph: Graph) => {
//   // Implement a function to find vertices with odd degree.
//   const oddVertices = [];
//   const nodes = graph.nodes();
//   for (const node of nodes) {
//     const adjacentNodes = graph.neighbors(node);
//     if (adjacentNodes?.length % 2 !== 0) {
//       oddVertices.push(node);
//     }
//   }
//   return oddVertices;
// };

// const getMinimumWeightPerfectMatching = (adjacencyMatrix: number[][]) => blossom(adjacencyMatrix);

// const eulerianCircuit = (graph: Graph): string[] => {
//   const circuit: string[] = [];
//   const stack: string[] = [];
//   const visitedEdges: Set<string> = new Set();

//   const startNode = graph.nodes()[0];
//   stack.push(startNode);

//   while (stack.length > 0) {
//     const currentNode = stack[stack.length - 1];
//     const neighbors = graph.successors(currentNode) || [];

//     if (neighbors?.length > 0) {
//       const nextNode = neighbors[0];
//       const edge = graph.outEdges(currentNode, nextNode)?.[0];

//       stack.push(nextNode);
//       visitedEdges.add(edge.v);

//       graph.removeEdge(edge); // Remove the used edge
//     } else {
//       circuit.push(currentNode);
//       stack.pop();
//     }
//   }

//   return circuit;
// };

// export const christofides = (matrix: MatrixItem[]) => {
//   const graph = populateGraph(matrix);
//   const primMst = getPrimMST(graph);
//   const
// }
