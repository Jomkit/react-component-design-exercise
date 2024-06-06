import { render } from "@testing-library/react";
import Cell from "../Cell";

// Smoke test
it("should render without crashing", () => {
    render(<Cell />);
})

// Snapshot test
it("matches snapshot", () => {
    let mockFunc = jest.fn();
    const { asFragment } = render(<Cell flipCellsAroundMe={()=>mockFunc()} isLit={true} />);
    expect(asFragment()).toMatchSnapshot();
})

it("should render with Cell-lit class if isLit=true", () => {
    const { container } = render(<Cell isLit={true} />);
    expect(container.querySelector(".Cell-lit")).toBeInTheDocument();
})

it("should render without Cell-lit class if no isLit", () => {
    const { container } = render(<Cell />);
    expect(container.querySelector(".Cell-lit")).not.toBeInTheDocument();
})