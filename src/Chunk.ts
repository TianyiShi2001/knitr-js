export interface Chunk {
  code: string;
  position: [number, number];
  label: string;
  execution: ExecutionOptions;
  render: RenderOptions;
  custom?: CustomOptions;
}

export interface ExecutionOptions {
  language: string;
  engine: string;
  command: string;
}

export interface RenderOptions {
  echo: boolean;
  eval: boolean;
  include: boolean;
  message: boolean;
  warning: boolean;
}

export interface CustomOptions {
  [propName: string]: string;
}

export const defaultRenderOptions: RenderOptions = {
  echo: options.true,
  eval: true,
  include: true,
  message: true,
  warning: true,
};

export class Chunk {
  /**
   * Instantiates a Chunk object with default values.
   */
  constructor() {
    return {
      code: undefined,
      position: undefined,
      label: undefined,
      execution: {
        language: undefined,
        engine: undefined,
        command: undefined,
      },
      render: {
        echo: true,
        eval: true,
        include: true,
        message: true,
        warning: true,
      },
    };
  }
}
