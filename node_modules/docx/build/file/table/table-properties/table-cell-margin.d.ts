import { IXmlableObject, XmlComponent } from "../../../file/xml-components";
import { WidthType } from "../table-cell";
export declare class TableCellMargin extends XmlComponent {
    constructor();
    prepForXml(): IXmlableObject | undefined;
    addTopMargin(value: number, type?: WidthType): void;
    addLeftMargin(value: number, type?: WidthType): void;
    addBottomMargin(value: number, type?: WidthType): void;
    addRightMargin(value: number, type?: WidthType): void;
}
