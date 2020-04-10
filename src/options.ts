import { Chunk } from "./Chunk";

interface Options {
  code: Chunk;
  custom: CustomOptions;
}

interface CustomOptions {
  [propName: string]: string;
}

// export const options: Options = (() => {
//   return { defaultEngines: null };
// })();

// const defaultOptions = {
//   render: {
//     echo: true,
//     eval: true,
//     include: true,
//     message: true,
//     warning: true,
//   },
//   engines: {
//     javascript: "node",
//     python: "python",
//     r: "Rscript",
//     typescript: "ts-node",
//   },
//   commands: {
//     node: "node -e",
//     rustc: "",
//   },
// };
