import { FooterWrapper } from "../../../../file/footer-wrapper";
import { HeaderWrapper } from "../../../../file/header-wrapper";
import { XmlComponent } from "../../../../file/xml-components";
import { IColumnsAttributes } from "./columns/columns-attributes";
import { IDocGridAttributesProperties } from "./doc-grid/doc-grid-attributes";
import { IPageBordersOptions } from "./page-border";
import { IPageMarginAttributes } from "./page-margin/page-margin-attributes";
import { IPageNumberTypeAttributes } from "./page-number";
import { IPageSizeAttributes } from "./page-size/page-size-attributes";
export interface IHeaderFooterGroup<T> {
    readonly default?: T;
    readonly first?: T;
    readonly even?: T;
}
interface IHeadersOptions {
    readonly headers?: IHeaderFooterGroup<HeaderWrapper>;
}
interface IFootersOptions {
    readonly footers?: IHeaderFooterGroup<FooterWrapper>;
}
interface ITitlePageOptions {
    readonly titlePage?: boolean;
}
export declare type SectionPropertiesOptions = IPageSizeAttributes & IPageMarginAttributes & IColumnsAttributes & IDocGridAttributesProperties & IHeadersOptions & IFootersOptions & IPageNumberTypeAttributes & IPageBordersOptions & ITitlePageOptions;
export declare class SectionProperties extends XmlComponent {
    private readonly options;
    constructor(options?: SectionPropertiesOptions);
    private addHeaders;
    private addFooters;
    readonly Options: SectionPropertiesOptions;
}
export {};
