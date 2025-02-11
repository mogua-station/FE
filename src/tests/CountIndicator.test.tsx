import { render, screen } from "@testing-library/react";
import CountIndicator from "@/components/common/CountIndicator";
import "@testing-library/jest-dom";

describe("CountIndicator", () => {
  it("currentCount와 maxCount가 표시된다", () => {
    render(<CountIndicator currentCount={0} maxCount={3} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
