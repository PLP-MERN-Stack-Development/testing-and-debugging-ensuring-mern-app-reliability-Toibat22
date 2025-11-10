import { render, screen } from "@testing-library/react";
import BugItem from "../../components/BugItem.jsx";

describe("BugItem Component", () => {
  const bug = {
    title: "Test Bug",
    description: "Bug details",
    category: "UI",
    status: "Open",
  };

  it("renders bug details", () => {
    render(<BugItem bug={bug} />);
    expect(screen.getByText(/test bug/i)).toBeInTheDocument();
    expect(screen.getByText(/bug details/i)).toBeInTheDocument();
    expect(screen.getByText(/ui/i)).toBeInTheDocument(); // matches actual category
    expect(screen.getByText(/open/i)).toBeInTheDocument();
  });
});
