import { Paragraph } from "../../../file/paragraph";
import { IXmlableObject, XmlComponent } from "../../../file/xml-components";
import { Table } from "../table";
import { TableCellProperties } from "./table-cell-properties";
export declare class TableCell extends XmlComponent {
    private readonly properties;
    constructor();
    addContent(content: Paragraph | Table): TableCell;
    prepForXml(): IXmlableObject | undefined;
    createParagraph(text?: string): Paragraph;
    readonly CellProperties: TableCellProperties;
}
