import { BorderStyle } from "../../../../../file/styles";
import { IXmlableObject, XmlComponent } from "../../../../../file/xml-components";
export declare enum PageBorderDisplay {
    ALL_PAGES = "allPages",
    FIRST_PAGE = "firstPage",
    NOT_FIRST_PAGE = "notFirstPage"
}
export declare enum PageBorderOffsetFrom {
    PAGE = "page",
    TEXT = "text"
}
export declare enum PageBorderZOrder {
    BACK = "back",
    FRONT = "front"
}
export interface IPageBorderAttributes {
    readonly display?: PageBorderDisplay;
    readonly offsetFrom?: PageBorderOffsetFrom;
    readonly zOrder?: PageBorderZOrder;
}
export interface IPageBorderConfiguration {
    readonly style?: BorderStyle;
    readonly size?: number;
    readonly color?: string;
    readonly space?: number;
}
export interface IPageBordersOptions {
    readonly pageBorders?: IPageBorderAttributes;
    readonly pageBorderTop?: IPageBorderConfiguration;
    readonly pageBorderRight?: IPageBorderConfiguration;
    readonly pageBorderBottom?: IPageBorderConfiguration;
    readonly pageBorderLeft?: IPageBorderConfiguration;
}
export declare class PageBorders extends XmlComponent {
    constructor(options?: IPageBordersOptions);
    prepForXml(): IXmlableObject | undefined;
}
