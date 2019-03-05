import { XmlComponent } from "../../file/xml-components";
import { Border } from "./formatting/border";
export declare class ParagraphProperties extends XmlComponent {
    readonly paragraphBorder: Border;
    constructor();
    createBorder(): void;
    push(item: XmlComponent): void;
}
