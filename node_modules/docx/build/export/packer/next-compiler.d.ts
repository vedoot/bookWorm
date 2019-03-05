import * as JSZip from "jszip";
import { File } from "../../file";
export declare class Compiler {
    private readonly formatter;
    constructor();
    compile(file: File): Promise<JSZip>;
    private xmlifyFile;
}
