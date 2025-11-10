import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../../components/bugForm";

describe("BugForm Component", () => {
  it("renders the form correctly", () => {
    render(<BugForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add bug/i })).toBeInTheDocument();
  });

  it("calls onSubmit with correct data when submitted", () => {
    const handleSubmit = vi.fn();
    render(<BugForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Bug 1" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Bug description" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "UI" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "open" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add bug/i }));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Bug 1",
        description: "Bug description",
        category: "UI",
        status: "open",
      })
    );
  });
});
