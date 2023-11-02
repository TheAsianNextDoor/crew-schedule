// import { json, type RequestHandler } from '@sveltejs/kit';
// import { matrixMock } from '../../../../../../mock/matrix';
// import { getGoogleMatrix, type MatrixItem } from '../matrix/get-google-matrix';
// import { optimalMock } from '../../../../../../mock/optimal';
// import { christofidesSerdyukovApproximate } from './christofides';

// interface PostBody {
//   sites: [string, string][];
// }

// const buildAdjacencyMatrix = (matrix: MatrixItem[], matrixWidth: number) => {
//   const adjacencyMatrix: number[][] = [];

//   for (let i = 0; i < matrixWidth; i += 1) {
//     const offset = i * matrixWidth;
//     const edges: number[] = [];

//     for (let j = 0; j < matrixWidth; j += 1) {
//       const item = matrix[offset + j];
//       if (item.originIndex === item.destinationIndex) {
//         edges.push(0);
//       } else {
//         const numericValue = Number(item.staticDuration?.split('s')[0]);
//         edges.push(numericValue);
//       }
//     }

//     adjacencyMatrix[i] = edges;
//   }

//   return adjacencyMatrix;
// };

// // const buildGraph = (matrix: MatrixItem[], matrixWidth: number) => {
// //   const graph: Record<string, Record<string, number>> = {};

// //   for (let i = 0; i < matrixWidth; i += 1) {
// //     const offset = i * matrixWidth;
// //     const node = matrix[offset].originIndex;
// //     const edges: Record<string, number> = {};

// //     for (let i = 0; i < matrixWidth; i += 1) {
// //       const item = matrix[offset + i];
// //       if (item.originIndex === item.destinationIndex) {
// //         continue;
// //       }

// //       const numericValue = Number(item.staticDuration?.split('s')[0]);
// //       edges[item.destinationIndex] = numericValue;
// //     }

// //     graph[node] = edges;
// //   }

// //   return graph;
// // };

// export const POST: RequestHandler = async ({ request, fetch }) => {
//   const { sites } = (await request.json()) as PostBody;
//   // const graphWidth = sites.length;
//   const graphWidth = 5;

//   // const matrix = await getGoogleMatrix(fetch, sites, sites);
//   const matrix = optimalMock;
//   matrix.sort((a, b) => {
//     if (a.originIndex < b.originIndex || a.destinationIndex < b.destinationIndex) {
//       return -1;
//     }

//     return 1;
//   });
//   const adjacencyMatrix = buildAdjacencyMatrix(matrix, graphWidth);

//   const parent = christofidesSerdyukovApproximate(adjacencyMatrix);

//   // return json({ data });

//   return json({ data: matrixMock });

//   // return json({ data: { routes: routesData } });
// };
