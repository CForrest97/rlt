import React from "react";
import { screen } from "@testing-library/react";

import Homepage from "../../src/pages";
import { render } from "../helpers/testUtils";

test("should pass", () => {
  render(<Homepage />);

  expect(screen.getByText("Hello world")).toBeInTheDocument();
});
