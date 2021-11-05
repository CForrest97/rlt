import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

const customRenderer = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, options);

export { customRenderer as render };
