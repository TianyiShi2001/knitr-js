import { options } from "./Options";
import { Chunk } from "./Chunk";
import { executeChunk } from "./exec";

export const ENGINE_ALIASES = {
  js: "javascript",
  ts: "typescript",
  rs: "rust",
  py: "python",
  "c++": "cpp",
  "*": "generic",
};

type Engine = (chunk: Chunk) => Result;

interface Result {
  output: string;
  error: string;
  message: string;
}

export function defaultEngine(language) {
  const defaultEngines = { bash: "bash", javascript: "node", rust: "rustc", r: "Rscript", python: "python" };
  let options = getOptions();
  return (options.defaultEngines && options.defaultEngines[language]) || defaultEngines[language];
}

const engine2language = {
  node: "javascript",
  cargo: "rust",
};

function eng_node(options) {
  let code = options.code;
}

let eng_cargo: Engine = (options) => {
  return {
    output: "hello",
    error: "world",
    message: "!!!",
  };
};

const mapEngines = {
  node: eng_node,
  cargo: eng_cargo,
};
