import { XmlComponent } from "../../../file/xml-components";
import { TableCell } from "../table-cell";
export declare class TableRow extends XmlComponent {
    private readonly cells;
    private readonly properties;
    constructor(cells: TableCell[]);
    getCell(ix: number): TableCell;
    addGridSpan(index: number, cellSpan: number): TableCell;
    mergeCells(startIndex: number, endIndex: number): TableCell;
}
