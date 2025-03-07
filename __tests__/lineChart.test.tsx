import { render, screen, waitFor } from "@testing-library/react";
import LineChart, { defaultOptions } from "@/components/LineChart"; // Import your LineChart component
import { prices } from "@/app/data/prices";
import { portfolios } from "@/app/data/portfolio";
import "@testing-library/jest-dom";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => <div data-testid="line-chart-mock" />),
}));

describe("LineChart", () => {
  it("renders the Line chart", async () => {
    render(<LineChart data={prices} portfolio={portfolios} />);

    await waitFor(() => {
      expect(screen.getByTestId("line-chart-mock")).toBeInTheDocument();
    });

    expect(defaultOptions.plugins?.title?.text).toBe(
      "Total Portfolio Value Over Time",
    );
  });
});
