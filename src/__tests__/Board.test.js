import { render, fireEvent } from "@testing-library/react";
import Board from "../Board";

it('should match snapshot', () => {
    const { asFragment } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1.0} />);
    expect(asFragment()).toMatchSnapshot();
})

it('should match snapshot (win state)', () => {
    const { asFragment } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0.0} />);
    expect(asFragment()).toMatchSnapshot();
})

it('should handle clicks on cells', () => {
    const { container } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1.0} />);

    const cell = container.querySelector(".Cell-lit");
    expect(cell).toHaveClass("Cell-lit");

    fireEvent.click(cell);
    expect(cell).not.toHaveClass("Cell-lit");
})

it('should flip lit status of all cells around a clicked cell', () => {
    const { container, debug } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1.0} />);

    const allCells = container.querySelectorAll(".Cell");
    expect(allCells.length).toEqual(25);
    
    fireEvent.click(allCells[13]);
    
    const cellsLit = container.querySelectorAll(".Cell-lit");
    expect(cellsLit.length).toEqual(20);
})