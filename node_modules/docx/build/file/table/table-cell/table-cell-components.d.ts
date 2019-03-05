import { BorderStyle } from "../../../file/styles";
import { IXmlableObject, XmlComponent } from "../../../file/xml-components";
export declare class TableCellBorders extends XmlComponent {
    constructor();
    prepForXml(): IXmlableObject | undefined;
    addTopBorder(style: BorderStyle, size: number, color: string): TableCellBorders;
    addStartBorder(style: BorderStyle, size: number, color: string): TableCellBorders;
    addBottomBorder(style: BorderStyle, size: number, color: string): TableCellBorders;
    addEndBorder(style: BorderStyle, size: number, color: string): TableCellBorders;
}
export declare class GridSpan extends XmlComponent {
    constructor(value: number);
}
export declare enum VMergeType {
    CONTINUE = "continue",
    RESTART = "restart"
}
export declare class VMerge extends XmlComponent {
    constructor(value: VMergeType);
}
export declare enum VerticalAlign {
    BOTTOM = "bottom",
    CENTER = "center",
    TOP = "top"
}
export declare class VAlign extends XmlComponent {
    constructor(value: VerticalAlign);
}
export declare enum WidthType {
    AUTO = "auto",
    DXA = "dxa",
    NIL = "nil",
    PERCENTAGE = "pct"
}
export declare class TableCellWidth extends XmlComponent {
    constructor(value: string | number, type: WidthType);
}
export interface ITableCellShadingAttributesProperties {
    readonly fill?: string;
    readonly color?: string;
    readonly val?: string;
}
export declare class TableCellShading extends XmlComponent {
    constructor(attrs: ITableCellShadingAttributesProperties);
}
