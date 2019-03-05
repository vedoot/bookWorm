import { Element as XmlElement } from "xml-js";
import { IXmlableObject, XmlComponent } from ".";
export declare function convertToXmlComponent(element: XmlElement): ImportedXmlComponent | string | undefined;
export declare class ImportedXmlComponent extends XmlComponent {
    static fromXmlString(importedContent: string): ImportedXmlComponent;
    private readonly _attr;
    constructor(rootKey: string, _attr?: any);
    prepForXml(): IXmlableObject | undefined;
    push(xmlComponent: XmlComponent | string): void;
}
export declare class ImportedRootElementAttributes extends XmlComponent {
    private readonly _attr;
    constructor(_attr: any);
    prepForXml(): IXmlableObject;
}
