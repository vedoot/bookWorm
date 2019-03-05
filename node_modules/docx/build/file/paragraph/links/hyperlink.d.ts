import { XmlComponent } from "../../../file/xml-components";
export declare class Hyperlink extends XmlComponent {
    readonly linkId: number;
    constructor(text: string, relationshipsCount: number, anchor?: string);
}
