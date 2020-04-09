import { getOptions } from "./options";
import { Chunk } from "./Chunk";

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
